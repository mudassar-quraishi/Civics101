import { motion } from 'framer-motion';
import { Landmark, Languages } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export default function Header() {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);

  return (
    <header className="h-20 glass sticky top-0 z-50 flex items-center justify-between px-8 border-b border-slate-200/50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4"
      >
        <div className="relative group">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500"
          >
            <Landmark className="w-6 h-6 text-white" />
          </motion.div>
          {/* Tricolor Dot indicators */}
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <div className="w-2 h-2 rounded-full bg-white border border-slate-100" />
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-2xl font-bold font-display tracking-tight text-slate-900 leading-none">
            Civics<span className="text-blue-600 italic">101</span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mt-1">
            {language === 'en' ? 'Democratic Education' : 'लोकतांत्रिक शिक्षा'}
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all cursor-pointer group"
        >
          <Languages className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-900">
            {language === 'en' ? 'हिन्दी' : 'English'}
          </span>
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden md:flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200/50"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            {language === 'en' ? 'India Edition' : 'भारत संस्करण'}
          </span>
        </motion.div>
      </div>
    </header>
  );
}
