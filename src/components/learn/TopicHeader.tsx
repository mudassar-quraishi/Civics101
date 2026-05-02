import { motion } from 'framer-motion';
import type { Topic } from '../../types/index';
import { useAppStore } from '../../store/appStore';
import { useTTS } from '../../hooks/useTTS';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  topic: Topic;
}

export default function TopicHeader({ topic }: Props) {
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';
  const { speak, stop, isPlaying } = useTTS();

  const handleListen = () => {
    if (isPlaying) {
      stop();
    } else {
      const textToRead = isHindi 
        ? `${topic.hindiTitle || topic.title}. ${topic.description}`
        : `${topic.title}. ${topic.description}`;
      speak(textToRead, language);
    }
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 relative"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-amber-100">
            {isHindi ? topic.labelHindi : topic.label}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleListen}
          className={`
            ml-4 flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
            ${isPlaying 
              ? 'bg-rose-50 text-rose-600 border border-rose-100 shadow-lg shadow-rose-500/10' 
              : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-500/10'
            }
          `}
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              {isHindi ? 'रुकें' : 'Stop Listening'}
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              {isHindi ? 'सुनें' : 'Listen to Module'}
            </>
          )}
        </motion.button>
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
