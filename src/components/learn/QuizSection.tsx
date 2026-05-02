import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import type { QuizQuestion } from '../../types/index';
import QuizOption from './quiz/QuizOption';
import QuizFeedback from './quiz/QuizFeedback';

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
    if (selectedIndex !== null) {
      setIsSubmitted(true);
      setQuizAnswer(topicId, selectedIndex);
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
  };

  return (
    <section className="mb-24" aria-label="Knowledge Check">
      <div className="glass p-8 md:p-16 rounded-[3rem] border border-slate-200/50 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">
              Knowledge Check
            </span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-10 leading-tight">
            {quiz.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {quiz.options.map((option, i) => (
              <QuizOption
                key={i}
                text={option}
                isSelected={selectedIndex === i}
                isCorrect={i === quiz.correctIndex}
                showResult={isSubmitted}
                onClick={() => setSelectedIndex(i)}
              />
            ))}
          </div>

          {!isSubmitted ? (
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={selectedIndex === null}
                className={`
                  px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl
                  ${selectedIndex !== null
                    ? 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-blue-500/20 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }
                `}
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <QuizFeedback
              isCorrect={isCorrect}
              explanation={quiz.explanation}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </section>
  );
}
