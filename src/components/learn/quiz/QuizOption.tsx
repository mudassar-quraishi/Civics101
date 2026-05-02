import { Check, X } from 'lucide-react';

interface Props {
  text: string;
  isSelected: boolean;
  isCorrect: boolean | null;
  showResult: boolean;
  onClick: () => void;
}

export default function QuizOption({ text, isSelected, isCorrect, showResult, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={showResult}
      className={`
        group relative flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300
        ${showResult
          ? isCorrect
            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
            : isSelected
              ? 'bg-rose-50 border-rose-500 text-rose-900'
              : 'bg-white border-slate-200 text-slate-400 opacity-50'
          : isSelected
            ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200'
            : 'bg-white border-slate-200 hover:border-blue-300 text-slate-600 hover:bg-slate-50'
        }
        ${!showResult ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <div className={`
        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
        ${isSelected 
          ? showResult ? 'bg-white border-white' : 'bg-white border-white'
          : 'border-slate-200 group-hover:border-blue-400'
        }
        ${showResult && isCorrect ? 'bg-emerald-500 border-emerald-500' : ''}
        ${showResult && isSelected && !isCorrect ? 'bg-rose-500 border-rose-500' : ''}
      `}>
        {showResult && isCorrect && <Check className="w-4 h-4 text-white" />}
        {showResult && isSelected && !isCorrect && <X className="w-4 h-4 text-white" />}
        {!showResult && isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
      </div>
      <span className="font-bold text-sm md:text-base">{text}</span>
    </button>
  );
}
