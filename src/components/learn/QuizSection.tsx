import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import type { QuizQuestion } from '../../types/index';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

interface Props {
  quiz: QuizQuestion;
  topicId: string;
}

export default function QuizSection({ quiz, topicId }: Props) {
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const setQuizAnswer = useAppStore((s) => s.setQuizAnswer);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    quizAnswers[topicId] ?? null
  );
  const [isSubmitted, setIsSubmitted] = useState(quizAnswers[topicId] !== undefined);

  const isCorrect = selectedIndex === quiz.correctIndex;

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setQuizAnswer(topicId, selectedIndex);
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
  };

  return (
    <section className="mb-24" aria-label="Knowledge check">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-2xl shadow-blue-500/5 relative overflow-hidden"
      >
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-32 -mt-32 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Quick Quiz
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-10 leading-tight">
            {quiz.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {quiz.options.map((option, i) => {
              const isSelected = selectedIndex === i;
              const showCorrect = isSubmitted && i === quiz.correctIndex;
              const showWrong = isSubmitted && isSelected && !isCorrect;

              return (
                <motion.button
                  key={i}
                  whileHover={!isSubmitted ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                  onClick={() => !isSubmitted && setSelectedIndex(i)}
                  className={`
                    group relative flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300
                    ${showCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : showWrong
                      ? 'bg-rose-50 border-rose-500 text-rose-900'
                      : isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200'
                      : 'bg-white border-slate-200 hover:border-blue-300 text-slate-600'
                    }
                    ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${isSelected ? 'bg-white border-white' : 'border-slate-200 group-hover:border-blue-400'}
                    ${showCorrect ? 'bg-emerald-500 border-emerald-500' : ''}
                    ${showWrong ? 'bg-rose-500 border-rose-500' : ''}
                  `}>
                    {showCorrect ? <Check className="w-4 h-4 text-white" /> : 
                     showWrong ? <X className="w-4 h-4 text-white" /> :
                     isSelected ? <div className="w-2.5 h-2.5 rounded-full bg-slate-900" /> : null}
                  </div>
                  <span className="font-bold text-sm md:text-base">{option}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${
                    isCorrect 
                      ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' 
                      : 'bg-rose-50/50 border-rose-100 text-rose-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isCorrect ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                      {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">{isCorrect ? 'Outstanding!' : 'Not quite right'}</p>
                      <p className="text-sm leading-relaxed opacity-80">{quiz.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end">
              {!isSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={selectedIndex === null}
                  className={`
                    flex items-center gap-2 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl
                    ${selectedIndex !== null
                      ? 'bg-slate-900 text-white shadow-slate-300 hover:shadow-slate-400 cursor-pointer'
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    }
                  `}
                >
                  Submit Answer
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Another
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
