import { useState, useRef, useEffect, useMemo } from 'react';
import { useAppStore } from '../../store/appStore';
import { topics } from '../../data/topics';
import type { Message } from '../../types/index';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, X, MessageCircle, Info } from 'lucide-react';

const EMPTY_MESSAGES: Message[] = [];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const currentTopicIndex = useAppStore((s) => s.currentTopicIndex);
  const topic = topics[currentTopicIndex];
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';
  
  const chatHistories = useAppStore((s) => s.chatHistories);
  const chatHistory = useMemo(() => chatHistories[topic?.id] || EMPTY_MESSAGES, [chatHistories, topic?.id]);
  const addMessage = useAppStore((s) => s.addMessage);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isLoading, isOpen]);

  if (!topic) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    addMessage(topic.id, { role: 'user', content: trimmed, timestamp: Date.now() });
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: topic.id, message: trimmed, history: chatHistory.slice(-6) }),
      });
      if (!res.ok) throw new Error('Failed to fetch');
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
        content: "I'm temporarily unavailable. Please check official ECI resources.",
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const suggestedQuestions = [
    topic.id === 'voter-registration' && 'How do I register?',
    topic.id === 'types-of-elections' && "What is Lok Sabha?",
    topic.id === 'election-day' && 'What ID do I need?',
  ].filter(Boolean) as string[];

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl z-[1000] cursor-pointer group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
              <MessageCircle className="w-7 h-7" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-900 group-hover:animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[380px] h-[520px] max-h-[70vh] glass rounded-[2rem] shadow-2xl z-[1000] flex flex-col overflow-hidden border border-slate-200/50"
          >
            {/* Header */}
            <div className="bg-slate-900 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    {isHindi ? 'नागरिक सहायक' : 'Civic Assistant'}
                  </h3>
                  <p className="text-blue-300 text-[10px] uppercase font-bold tracking-wider">
                    {isHindi ? 'विशेषज्ञ मोड' : 'Expert Mode'}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/20">
              {chatHistory.length === 0 && (
                <div className="text-center py-6">
                  <Info className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-[11px] mb-4">
                    {isHindi 
                      ? `${topic.hindiTitle || topic.title} के बारे में कुछ भी पूछें`
                      : `Ask anything about ${topic.title}`}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedQuestions.map((q, i) => (
                      <button 
                        key={i} 
                        onClick={() => setInput(q)}
                        className="text-[9px] font-bold bg-white border border-slate-200 px-2.5 py-1.5 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                    }
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-1.5 p-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="p-5 bg-white border-t border-slate-100">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isHindi ? 'एक प्रश्न पूछें...' : 'Type a question...'}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
