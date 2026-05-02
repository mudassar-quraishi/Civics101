import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Security: Helmet for secure headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com", "https://region1.google-analytics.com", "https://*.run.app"],
      imgSrc: ["'self'", "data:", "https://www.google-analytics.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'self'", "https://www.google.com"],
    },
  },
}));

// Security: Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use('/api/', limiter);

app.use(cors());
app.use(express.json());

// ===== Topic system prompts =====
const BASE_PROMPT = "You are 'Civics101 Assistant', a highly empathetic, neutral, and expert civic-education assistant for first-time voters in India. Your goal is to demystify the election process using simple, clear, and encouraging language. Always remain non-partisan and avoid expressing any political opinions or preferences. If a user asks for a recommendation on who to vote for, gently redirect them to research candidates using official sources like myneta.info. Keep your responses concise (max 3 sentences) and highly practical.";

const TOPIC_PROMPTS: Record<string, string> = {
  'voter-registration': `${BASE_PROMPT} Focus specifically on voter registration procedures, Form 6, NVSP portal, and EPIC card issuance.`,
  'types-of-elections': `${BASE_PROMPT} Focus on explaining the different levels of government (National, State, Local) and the role of MPs, MLAs, and local councilors.`,
  'election-day': `${BASE_PROMPT} Focus on the practicalities of polling day: finding the booth, valid IDs, EVM usage, VVPAT verification, and the NOTA option.`,
  'vote-counting': `${BASE_PROMPT} Focus on the transparency and security of the counting process, strongrooms, and the declaration of results.`,
  'government-formation': `${BASE_PROMPT} Focus on the constitutional process of forming a government, the 'magic number' (majority), and the role of the President.`,
};

// ===== Knowledge base (inline for simplicity) =====
const KB: Record<string, { q: string; a: string }[]> = {
  'voter-registration': [
    { q: 'how do i register to vote', a: 'Visit nvsp.in or download the Voter Helpline App. Fill out Form 6 with your details, upload a photo, and submit supporting documents (Aadhaar, birth certificate, or marksheet for age proof, plus address proof). Your BLO may visit for verification before your EPIC card is issued.' },
    { q: 'what documents do i need', a: 'You need proof of age (Aadhaar card, birth certificate, or Class 10 marksheet) and proof of address (Aadhaar, utility bill, bank passbook, or ration card). A passport-sized photograph is also required for the EPIC card.' },
    { q: 'what is epic card', a: 'EPIC stands for Electors Photo Identity Card. It is the official voter ID card issued by the Election Commission of India, containing your name, photo, constituency, and unique voter ID number. You can also get an e-EPIC (digital version) through the Voter Helpline App.' },
    { q: 'what is form 6', a: 'Form 6 is the application form for new voter registration in India. You can fill it online at nvsp.in or get a physical copy from your local ERO (Electoral Registration Officer) office.' },
  ],
  'types-of-elections': [
    { q: 'what is lok sabha', a: 'The Lok Sabha (House of the People) is the lower house of India\'s Parliament with 543 elected members. Each member represents one parliamentary constituency. The party or coalition with a majority (272+ seats) forms the central government and its leader becomes Prime Minister.' },
    { q: 'what is vidhan sabha', a: 'Vidhan Sabha is the State Legislative Assembly. Voters elect MLAs (Members of Legislative Assembly) who form the state government. The party or coalition with majority seats chooses the Chief Minister.' },
  ],
};

// ===== Topic filter =====
/**
 * Patterns that trigger a neutrality redirection.
 */
const BLOCKED_PATTERNS = [
  /\b(bjp|congress|aap|tmc|sp|bsp|ncp|shiv\s*sena|jdu|rjd|dmk|aiadmk|cpim?|ysrcp|brs|trs)\b/i,
  /\bwho\s+.*vote\s+for\b/i,
  /\bbest\s+(party|candidate|leader)\b/i,
  /\b(modi|rahul|kejriwal|mamata|yogi|stalin|jagan)\b/i,
];

/**
 * Redirect message when a blocked pattern is hit.
 */
const NEUTRAL_REDIRECT = "I can help with election processes and how voting works in India, but I stay neutral on parties, candidates, and political positions. Try asking about voter registration, EVMs, how the Lok Sabha works, or what NOTA means!";

/**
 * Checks if a message contains blocked political content.
 * @param message The user's input message.
 * @returns True if the message should be blocked.
 */
export function isBlocked(message: string): boolean {
  return BLOCKED_PATTERNS.some((p) => p.test(message));
}

/**
 * Searches the local knowledge base for a direct answer.
 * @param topicId The current module ID.
 * @param message The user's input message.
 * @returns The answer if found, otherwise null.
 */
export function searchKB(topicId: string, message: string): string | null {
  const entries = KB[topicId];
  if (!entries) return null;
  const lower = message.toLowerCase();
  for (const entry of entries) {
    const qWords = entry.q.split(/\s+/).filter((w) => w.length > 3);
    const matchCount = qWords.filter((w) => lower.includes(w)).length;
    if (matchCount >= qWords.length * 0.5 && matchCount >= 2) return entry.a;
  }
  return null;
}

// ===== API Routes =====
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.post('/api/chat', async (req, res) => {
  const { topicId, message, history } = req.body || {};

  if (!topicId || !message) return res.status(400).json({ error: 'topicId and message are required' });
  if (isBlocked(message)) return res.json({ response: NEUTRAL_REDIRECT, source: 'filter' });

  const kbAnswer = searchKB(topicId, message);
  if (kbAnswer) return res.json({ response: kbAnswer, source: 'kb' });

  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return res.json({ response: "AI assistance is currently unavailable.", source: 'fallback' });

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    interface HistoryItem {
      role: string;
      content: string;
    }
    const historyMessages = (history || []).slice(-6).map((m: HistoryItem) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: historyMessages,
      systemInstruction: TOPIC_PROMPTS[topicId],
    });

    const result = await chat.sendMessage(message);
    res.json({ response: result.response.text(), source: 'ai' });
  } catch (err: unknown) {
    console.error('Gemini error:', err instanceof Error ? err.message : String(err));
    res.json({ response: "I'm having trouble connecting to the AI service.", source: 'error' });
  }
});

// ===== Serve Frontend =====
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
