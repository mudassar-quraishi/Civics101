import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ===== Topic system prompts =====
const TOPIC_PROMPTS: Record<string, string> = {
  'voter-registration':
    'You are a neutral, civic-education assistant helping first-time voters in India. The user is learning about voter registration. Answer factually, concisely, and encourage civic participation. Reference official sources like nvsp.in and the Election Commission of India. Keep answers under 3 sentences.',
  'types-of-elections':
    'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about types of elections in India (Lok Sabha, Vidhan Sabha, local body). Be factual, balanced across all parties, and concise (under 3 sentences).',
  'election-day':
    'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about Election Day procedures in India. Be factual, practical, and concise (under 3 sentences). Reference EVMs, VVPAT, and official ECI procedures.',
  'vote-counting':
    'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about vote counting in India. Be factual, reassuring about election integrity, and concise (under 3 sentences). Reference EVMs, VVPAT, and ECI procedures.',
  'government-formation':
    'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about government formation in India. Explain factually, avoid political bias, and keep answers under 3 sentences.',
};

// ===== Knowledge base (inline for serverless simplicity) =====
const KB: Record<string, { q: string; a: string }[]> = {
  'voter-registration': [
    { q: 'how do i register to vote', a: 'Visit nvsp.in or download the Voter Helpline App. Fill out Form 6 with your details, upload a photo, and submit supporting documents (Aadhaar, birth certificate, or marksheet for age proof, plus address proof). Your BLO may visit for verification before your EPIC card is issued.' },
    { q: 'what documents do i need', a: 'You need proof of age (Aadhaar card, birth certificate, or Class 10 marksheet) and proof of address (Aadhaar, utility bill, bank passbook, or ration card). A passport-sized photograph is also required for the EPIC card.' },
    { q: 'what is epic card', a: 'EPIC stands for Electors Photo Identity Card. It is the official voter ID card issued by the Election Commission of India, containing your name, photo, constituency, and unique voter ID number. You can also get an e-EPIC (digital version) through the Voter Helpline App.' },
    { q: 'what is form 6', a: 'Form 6 is the application form for new voter registration in India. You can fill it online at nvsp.in or get a physical copy from your local ERO (Electoral Registration Officer) office.' },
    { q: 'what is the minimum age to vote', a: 'The minimum age to vote in India is 18 years. You must have turned 18 by the qualifying date set by the Election Commission for the specific election.' },
    { q: 'what is blo', a: 'BLO stands for Booth Level Officer. They are Election Commission officials responsible for maintaining the voter list at each polling booth. A BLO may visit your home to verify your identity during the registration process.' },
    { q: 'how to check if i am registered', a: 'You can check your voter registration status at electoralsearch.eci.gov.in by entering your name, age, and constituency details, or by searching with your EPIC number.' },
  ],
  'types-of-elections': [
    { q: 'what is lok sabha', a: 'The Lok Sabha (House of the People) is the lower house of India\'s Parliament with 543 elected members. Each member represents one parliamentary constituency. The party or coalition with a majority (272+ seats) forms the central government and its leader becomes Prime Minister.' },
    { q: 'what is vidhan sabha', a: 'Vidhan Sabha is the State Legislative Assembly. Voters elect MLAs (Members of Legislative Assembly) who form the state government. The party or coalition with majority seats chooses the Chief Minister.' },
    { q: 'difference between lok sabha and rajya sabha', a: 'Lok Sabha (543 members) is directly elected by citizens and chooses the PM. Rajya Sabha (245 members) is indirectly elected by state MLAs and represents states\' interests. You vote directly only for Lok Sabha and Vidhan Sabha members.' },
    { q: 'how often are elections held', a: 'Lok Sabha elections are held every 5 years. State Vidhan Sabha elections are also every 5 years but on their own schedule. Local body elections (panchayat, municipal) vary by state, typically every 5 years.' },
    { q: 'what is a constituency', a: 'A constituency is a geographic area that elects one representative. India has 543 Lok Sabha (parliamentary) constituencies and thousands of Vidhan Sabha (assembly) constituencies. You can find your constituency at eci.gov.in.' },
  ],
  'election-day': [
    { q: 'what id do i need to vote', a: 'Your EPIC (voter ID card) is preferred, but the Election Commission accepts 12 alternative photo IDs including Aadhaar card, passport, driving license, PAN card, MNREGA job card, and service ID cards of government employees.' },
    { q: 'what is evm', a: 'EVM stands for Electronic Voting Machine. It\'s a standalone electronic device used to record votes in Indian elections. EVMs are not connected to the internet, run on battery, and each machine can record up to 2,000 votes.' },
    { q: 'what is vvpat', a: 'VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to the EVM that prints a small paper slip showing the candidate\'s name and party symbol after you vote. The slip is visible for 7 seconds so you can verify your vote, then drops into a sealed box.' },
    { q: 'what is nota', a: 'NOTA stands for None of the Above. It\'s an option on every EVM that allows you to formally reject all candidates. Introduced by the Supreme Court in 2013, it lets you exercise your right to vote while expressing dissatisfaction with all options.' },
    { q: 'what happens if i press the wrong button', a: 'Once a button is pressed on the EVM, the vote is recorded and cannot be changed. That\'s why the VVPAT slip is shown for 7 seconds — to let you verify. If there\'s a genuine machine malfunction, inform the presiding officer immediately.' },
    { q: 'what time do polls open', a: 'Polling hours are typically 7:00 AM to 6:00 PM, though they may vary by region. Anyone standing in the queue at closing time MUST be allowed to vote — you cannot be turned away.' },
  ],
  'vote-counting': [
    { q: 'are evms tamper proof', a: 'EVMs are standalone devices with no internet, WiFi, or Bluetooth connectivity. They use one-time programmable chips that cannot be reprogrammed. Additionally, VVPAT paper trails from 5 randomly selected booths per constituency are cross-verified against EVM totals as an additional safeguard.' },
    { q: 'how long does counting take', a: 'Counting typically happens 2-3 days after the final phase of polling. The entire process for a constituency usually takes one full day, with results coming in round by round. National results for Lok Sabha elections are usually clear by evening of counting day.' },
    { q: 'what happens on counting day', a: 'On counting day, the Returning Officer supervises the opening of sealed EVMs. Counting happens in rounds — each round covers machines from a cluster of booths. Postal ballots are counted first. Candidates and their agents can observe the entire process.' },
    { q: 'what is a recount', a: 'A candidate can request a recount if the margin of victory is very narrow. The Returning Officer may order a recount if there are valid concerns about counting accuracy. The process involves re-tabulating EVM results under supervision.' },
  ],
  'government-formation': [
    { q: 'what is a hung parliament', a: 'A hung parliament occurs when no single party or pre-election coalition wins 272+ Lok Sabha seats (simple majority). In this case, the President invites the leader of the largest party or post-election coalition to form the government and prove majority through a floor test.' },
    { q: 'what is a floor test', a: 'A floor test is a vote of confidence in the Lok Sabha. The Prime Minister must prove that they have the support of a majority of members (272+). If the PM fails the floor test, the government falls and alternatives are explored.' },
    { q: 'how is the prime minister chosen', a: 'The PM is not directly elected by citizens. After Lok Sabha results, the President invites the leader of the majority party or coalition to form the government. This leader becomes PM after taking the oath of office at Rashtrapati Bhavan.' },
    { q: 'what is coalition government', a: 'A coalition government is formed when no single party wins a majority. Multiple parties come together post-election to form an alliance with 272+ seats. The leader of the largest party in the coalition typically becomes PM.' },
  ],
};

// ===== Topic filter — blocks partisan questions =====
const BLOCKED_PATTERNS = [
  /\b(bjp|congress|aap|tmc|sp|bsp|ncp|shiv\s*sena|jdu|rjd|dmk|aiadmk|cpim?|ysrcp|brs|trs)\b/i,
  /\bwho\s+(should|to)\s+vote\s+for\b/i,
  /\bbest\s+(party|candidate|leader)\b/i,
  /\b(modi|rahul|kejriwal|mamata|yogi|stalin|jagan)\b/i,
  /\b(hindu|muslim|christian|sikh)\s+(vote|party|candidate)\b/i,
  /\b(reservation|caste\s+based|mandir|masjid)\s+(policy|politics)\b/i,
];

const NEUTRAL_REDIRECT =
  "I can help with election processes and how voting works in India, but I stay neutral on parties, candidates, and political positions. Try asking about voter registration, EVMs, how the Lok Sabha works, or what NOTA means!";

function isBlocked(message: string): boolean {
  return BLOCKED_PATTERNS.some((p) => p.test(message));
}

// ===== Simple KB search =====
function searchKB(topicId: string, message: string): string | null {
  const entries = KB[topicId];
  if (!entries) return null;

  const lower = message.toLowerCase();
  // Exact-ish match: check if user message contains key terms from KB question
  for (const entry of entries) {
    const qWords = entry.q.split(/\s+/).filter((w) => w.length > 3);
    const matchCount = qWords.filter((w) => lower.includes(w)).length;
    if (matchCount >= qWords.length * 0.5 && matchCount >= 2) {
      return entry.a;
    }
  }
  return null;
}

// ===== In-memory cache (per serverless instance) =====
const cache = new Map<string, { response: string; expiry: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getCached(key: string): string | null {
  const entry = cache.get(key);
  if (entry && entry.expiry > Date.now()) return entry.response;
  if (entry) cache.delete(key);
  return null;
}

function setCache(key: string, response: string) {
  cache.set(key, { response, expiry: Date.now() + CACHE_TTL });
}

// ===== Rate limiting (in-memory, per instance) =====
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  let entry = rateLimits.get(sessionId);
  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + RATE_WINDOW };
    rateLimits.set(sessionId, entry);
  }
  entry.count++;
  return entry.count <= RATE_LIMIT;
}

// ===== Handler =====
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topicId, message, history } = req.body || {};

  if (!topicId || !message) {
    return res.status(400).json({ error: 'topicId and message are required' });
  }

  if (typeof message !== 'string' || message.length > 500) {
    return res.status(400).json({ error: 'Message must be under 500 characters' });
  }

  if (!TOPIC_PROMPTS[topicId]) {
    return res.status(400).json({ error: 'Invalid topicId' });
  }

  // Rate limit (use IP as session for serverless)
  const sessionId =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'anonymous';

  if (!checkRateLimit(sessionId)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. You can send up to 20 questions per hour.',
    });
  }

  // Topic filter
  if (isBlocked(message)) {
    return res.status(200).json({ response: NEUTRAL_REDIRECT, source: 'filter' });
  }

  // 1. Check cache
  const cacheKey = `${topicId}:${message.toLowerCase().trim()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.status(200).json({ response: cached, source: 'cache' });
  }

  // 2. Check KB
  const kbAnswer = searchKB(topicId, message);
  if (kbAnswer) {
    setCache(cacheKey, kbAnswer);
    return res.status(200).json({ response: kbAnswer, source: 'kb' });
  }

  // 3. AI fallback (Gemini)
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      response:
        "AI assistance is currently unavailable. Please check the key facts and step-by-step guide above — they cover most common questions about this topic!",
      source: 'fallback',
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Build conversation history for context
    const historyMessages = (history || []).slice(-6).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: historyMessages,
      systemInstruction: TOPIC_PROMPTS[topicId],
    });

    const result = await chat.sendMessage(message);
    const responseText =
      result.response.text() ||
      "I wasn't able to generate a response. Please try rephrasing your question.";

    setCache(cacheKey, responseText);
    return res.status(200).json({ response: responseText, source: 'ai' });
  } catch (err: any) {
    console.error('Gemini API error:', err.message);
    return res.status(200).json({
      response:
        "I'm having trouble connecting to the AI service right now. Please try again in a moment, or check the learning content above.",
      source: 'error',
    });
  }
}
