import { motion } from 'framer-motion';
import type { Topic } from '../../types/index';
import { useAppStore } from '../../store/appStore';

interface Props {
  topic: Topic;
}

export default function TopicHeader({ topic }: Props) {
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';

  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 relative"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-100">
          {isHindi ? topic.labelHindi : topic.label}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
      </div>

      <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 mb-6">
        {isHindi && topic.hindiTitle ? topic.hindiTitle : topic.title}
      </h1>

      {topic.hindiTitle && !isHindi && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl md:text-3xl font-medium text-slate-400 italic"
        >
          {topic.hindiTitle}
        </motion.p>
      )}

      {isHindi && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl md:text-3xl font-medium text-slate-400 italic"
        >
          {topic.title}
        </motion.p>
      )}
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-2 bg-blue-600 rounded-full mt-8 shadow-lg shadow-blue-500/20"
      />
    </motion.header>
  );
}
