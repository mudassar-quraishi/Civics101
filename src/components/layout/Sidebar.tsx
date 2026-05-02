import { useAppStore } from '../../store/appStore';
import { topics } from '../../data/topics';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const completedTopics = useAppStore((s) => s.completedTopics);
  const currentTopicIndex = useAppStore((s) => s.currentTopicIndex);
  const setCurrentTopic = useAppStore((s) => s.setCurrentTopic);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';

  const progress = topics.length > 0
    ? Math.round((completedTopics.length / topics.length) * 100)
    : 0;

  return (
    <aside 
      className="w-80 h-full glass border-r border-slate-200/50 flex flex-col p-8 overflow-y-auto"
      aria-label="Module Navigation"
    >
      <div className="mb-10" aria-label="Course Progress">
        <div className="flex justify-between items-end mb-3">
          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            {isHindi ? 'प्रगति' : 'Progress'}
          </span>
          <span className="text-sm font-bold text-slate-900" aria-live="polite">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-2" aria-label="Learning Modules">
        {topics.map((topic, index) => {
          const isCompleted = completedTopics.includes(topic.id);
          const isActive = index === currentTopicIndex;

          return (
            <motion.button
              key={topic.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`${isHindi ? 'विषय' : 'Module'} ${index + 1}: ${isHindi && topic.hindiTitle ? topic.hindiTitle : topic.title}${isCompleted ? (isHindi ? ', पूर्ण' : ', completed') : ''}${isActive ? (isHindi ? ', सक्रिय' : ', active') : ''}`}
              aria-current={isActive ? 'step' : undefined}
              onClick={() => {
                setCurrentTopic(index);
                setActiveTab('learn');
              }}
              className={`
                w-full group relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300
                ${isActive
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'hover:bg-slate-100/50 text-slate-600'
                }
              `}
            >
              <div className={`
                flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors
                ${isActive ? 'bg-white/10' : isCompleted ? 'bg-emerald-50' : 'bg-slate-100'}
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {index + 1}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {isHindi && topic.hindiTitle ? topic.hindiTitle : topic.title}
                </p>
                <p className={`text-[10px] font-medium mt-0.5 ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
                  {isHindi ? topic.labelHindi : topic.label}
                </p>
              </div>

              {isActive && (
                <motion.div layoutId="active-indicator">
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-slate-200/50">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-medium leading-relaxed text-slate-400">
            {isHindi 
              ? 'स्रोत: भारत निर्वाचन आयोग (ECI) का आधिकारिक डेटा।'
              : 'Source: Election Commission of India (ECI) official data.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
