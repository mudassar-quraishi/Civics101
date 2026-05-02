import { motion } from 'framer-motion';
import { Check, XCircle, RotateCcw } from 'lucide-react';

interface Props {
  isCorrect: boolean;
  explanation: string;
  onReset: () => void;
}

export default function QuizFeedback({ isCorrect, explanation, onReset }: Props) {
  return (
    <div className="flex flex-col gap-6">
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
          <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-emerald-100' : 'bg-rose-100'
          }`}>
            {isCorrect ? <Check className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>
          <div>
            <p className="font-bold text-lg mb-1">
              {isCorrect ? 'Outstanding!' : 'Not quite right'}
            </p>
            <p className="text-sm leading-relaxed opacity-80">
              {explanation}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all shadow-lg cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Try Another
        </button>
      </div>
    </div>
  );
}
