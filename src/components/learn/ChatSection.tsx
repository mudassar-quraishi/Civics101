import { useState, useRef, useEffect, useMemo } from 'react';
import { useAppStore } from '../../store/appStore';
import type { Topic, Message } from '../../types/index';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Info } from 'lucide-react';

const EMPTY_MESSAGES: Message[] = [];

interface Props {
  topic: Topic;
}

export default function ChatSection({ topic }: Props) {
  const chatHistories = useAppStore((s) => s.chatHistories);
  const chatHistory = useMemo(() => chatHistories[topic.id] || EMPTY_MESSAGES, [chatHistories, topic.id]);
  const addMessage = useAppStore((s) => s.addMessage);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    if (trimmed.length > 500) {
      setError('Message too long — keep it under 500 characters.');
      return;
    }

    setError(null);
    addMessage(topic.id, { role: 'user', content: trimmed, timestamp: Date.now() });
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: topic.id, message: trimmed, history: chatHistory.slice(-6) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong');
      }
      const data = await res.json();
      addMessage(topic.id, {
        role: 'assistant',
        content: data.response,
        source: data.source,
        timestamp: Date.now(),
      });
    } catch {
      addMessage(topic.id, {
        role: 'assistant',
        content: "I'm experiencing high traffic. Please check the official ECI resources or the key facts above.",
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const suggestedQuestions = [
    topic.id === 'voter-registration' && 'How do I register online?',
    topic.id === 'voter-registration' && 'What documents do I need?',
    topic.id === 'types-of-elections' && "What's the difference between Lok Sabha and Rajya Sabha?",
    topic.id === 'types-of-elections' && 'How often are elections held?',
    topic.id === 'election-day' && 'What ID do I need to vote?',
    topic.id === 'election-day' && 'What happens if I press the wrong button?',
    topic.id === 'vote-counting' && 'Are EVMs tamper-proof?',
    topic.id === 'vote-counting' && 'How long does counting take?',
    topic.id === 'government-formation' && 'What is a hung parliament?',
    topic.id === 'government-formation' && 'What is a floor test?',
  ].filter(Boolean) as string[];

  return (
    <section className="mb-24" aria-label="Interactive AI Chat">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-[2.5rem] overflow-hidden flex flex-col border border-slate-200/50 shadow-2xl shadow-slate-200/40"
      >
        {/* Chat Header */}
        <div className="bg-slate-900 px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">Civic AI Assistant</h3>
              <p className="text-blue-300 text-[10px] font-semibold tracking-wider uppercase">Online • Scoped to Facts</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">ECI Verified Data</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 min-h-[300px] max-h-[500px] overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50/30">
          {chatHistory.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                <Info className="w-10 h-10 text-slate-300" />
              </div>
              <h4 className="text-slate-900 font-bold text-xl mb-3">Ask anything about {topic.title}</h4>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                Our AI is trained on constitutional data and ECI guidelines. Try one of these questions:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput(q)}
                    className="bg-white px-6 py-2.5 rounded-2xl text-xs font-bold text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all cursor-pointer"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {chatHistory.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {msg.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                    {msg.source && (
                      <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className={`
                    p-6 rounded-[2rem] text-sm md:text-base leading-relaxed shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-200'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }
                  `}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-slate-200 p-6 rounded-[2rem] rounded-tl-none">
                <div className="flex gap-2">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="flex gap-4 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              maxLength={500}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-3xl px-8 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none font-medium text-slate-900 transition-all placeholder:text-slate-400"
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              whileHover={input.trim() ? { scale: 1.05 } : {}}
              whileTap={input.trim() ? { scale: 0.95 } : {}}
              disabled={!input.trim() || isLoading}
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg
                ${input.trim() && !isLoading
                  ? 'bg-blue-600 text-white shadow-blue-500/20 hover:bg-blue-700 cursor-pointer'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                }
              `}
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-500 font-bold mt-3 ml-2"
            >
              {error}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
