export interface KeyFact {
  icon: string;
  title: string;
  description: string;
  label?: string;
  meta?: string[];
  details?: string;
  seatsByState?: Array<{ state: string; seats: number }>;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Callout {
  title: string;
  body: string;
  quote?: string;
  attribution?: string;
}

export interface Topic {
  id: string;
  label: string;
  labelHindi: string;
  hindiTitle?: string;
  title: string;
  description: string;
  icon: string;
  keyFacts: KeyFact[];
  steps: Step[];
  quiz: QuizQuestion;
  callout?: Callout;
  aiSystemPrompt: string;
}

export interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  icon: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: 'cache' | 'kb' | 'ai';
  timestamp: number;
}

// Alias for consistent naming across components
export type Quiz = QuizQuestion;

export interface AppState {
  completedTopics: string[];
  currentTopicIndex: number;
  chatHistories: Record<string, Message[]>;
  quizAnswers: Record<string, number>;
  activeTab: 'learn' | 'timeline' | 'glossary';
  language: 'en' | 'hi';
  markComplete: (topicId: string) => void;
  setCurrentTopic: (index: number) => void;
  addMessage: (topicId: string, msg: Message) => void;
  setQuizAnswer: (topicId: string, answerIndex: number) => void;
  setActiveTab: (tab: 'learn' | 'timeline' | 'glossary') => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  resetProgress: () => void;
}
