import { useAppStore } from '../../store/appStore';
import { topics } from '../../data/topics';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Props {
  topicId: string;
  topicIndex: number;
}

export default function ActionRow({ topicId, topicIndex }: Props) {
  const completedTopics = useAppStore((s) => s.completedTopics);
  const markComplete = useAppStore((s) => s.markComplete);
  const setCurrentTopic = useAppStore((s) => s.setCurrentTopic);
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';

  const isCompleted = completedTopics.includes(topicId);
  const isLast = topicIndex >= topics.length - 1;
  const hasPrevious = topicIndex > 0;

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="pt-16 mt-16 border-t border-slate-200/50 flex flex-col sm:flex-row justify-between items-center gap-8"
    >
      <div className="flex items-center gap-6">
        {/* Previous */}
        {hasPrevious && (
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTopic(topicIndex - 1)}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              {isHindi ? 'पीछे' : 'Back'}
            </span>
          </motion.button>
        )}

        {/* Mark as done */}
        <motion.button
          whileHover={!isCompleted ? { scale: 1.05, y: -2 } : {}}
          whileTap={!isCompleted ? { scale: 0.95 } : {}}
          onClick={() => markComplete(topicId)}
          disabled={isCompleted}
          className={`
            px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3
            ${isCompleted
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
              : 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 hover:bg-emerald-700 cursor-pointer'
            }
          `}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4" />
              {isHindi ? 'मॉड्यूल पूरा हुआ' : 'Module Complete'}
            </>
          ) : (
            isHindi ? 'मॉड्यूल पूरा करें' : 'Complete Module'
          )}
        </motion.button>
      </div>

      {/* Next */}
      {!isLast && (
        <motion.button
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentTopic(topicIndex + 1)}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 cursor-pointer"
        >
          {isHindi ? 'अगला अध्याय' : 'Next Chapter'}
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}
    </motion.footer>
  );
}
