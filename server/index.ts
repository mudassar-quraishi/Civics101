import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ===== Topic system prompts =====
const TOPIC_PROMPTS: Record<string, string> = {
  'voter-registration': 'You are a neutral, civic-education assistant helping first-time voters in India. The user is learning about voter registration. Answer factually, concisely, and encourage civic participation. Reference official sources like nvsp.in and the Election Commission of India. Keep answers under 3 sentences.',
  'types-of-elections': 'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about types of elections in India (Lok Sabha, Vidhan Sabha, local body). Be factual, balanced across all parties, and concise (under 3 sentences).',
  'election-day': 'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about Election Day procedures in India. Be factual, practical, and concise (under 3 sentences). Reference EVMs, VVPAT, and official ECI procedures.',
  'vote-counting': 'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about vote counting in India. Be factual, reassuring about election integrity, and concise (under 3 sentences). Reference EVMs, VVPAT, and ECI procedures.',
  'government-formation': 'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about government formation in India. Explain factually, avoid political bias, and keep answers under 3 sentences.',
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
  // ... more entries from api/chat.ts can be added or kept minimal
};

// ===== Topic filter =====
const BLOCKED_PATTERNS = [
  /\b(bjp|congress|aap|tmc|sp|bsp|ncp|shiv\s*sena|jdu|rjd|dmk|aiadmk|cpim?|ysrcp|brs|trs)\b/i,
  /\bwho\s+(should|to)\s+vote\s+for\b/i,
  /\bbest\s+(party|candidate|leader)\b/i,
  /\b(modi|rahul|kejriwal|mamata|yogi|stalin|jagan)\b/i,
];

const NEUTRAL_REDIRECT = "I can help with election processes and how voting works in India, but I stay neutral on parties, candidates, and political positions. Try asking about voter registration, EVMs, how the Lok Sabha works, or what NOTA means!";

function isBlocked(message: string): boolean {
  return BLOCKED_PATTERNS.some((p) => p.test(message));
}

function searchKB(topicId: string, message: string): string | null {
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
    const historyMessages = (history || []).slice(-6).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: historyMessages,
      systemInstruction: TOPIC_PROMPTS[topicId],
    });

    const result = await chat.sendMessage(message);
    res.json({ response: result.response.text(), source: 'ai' });
  } catch (err: any) {
    console.error('Gemini error:', err.message);
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
