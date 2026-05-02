import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { KeyFact } from '../../types/index';
import { ChevronRight, X, LayoutGrid } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

interface Props {
  keyFacts: KeyFact[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 // Faster stagger for performance
    }
  }
};

const item = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring' as const, damping: 25, stiffness: 300 } }
};

export default function InfoCards({ keyFacts }: Props) {
  const [selectedFact, setSelectedFact] = useState<KeyFact | null>(null);
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';

  return (
    <>
      <motion.section 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
      >
        {keyFacts.map((fact, i) => (
          <motion.article
            key={i}
            variants={item}
            whileHover={{ y: -4, scale: 1.01 }} // Subtle movement for performance
            onClick={() => fact.details && setSelectedFact(fact)}
            className={`
              group relative bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm transition-all duration-300
              ${fact.details ? 'cursor-pointer hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5' : ''}
              will-change-transform
            `}
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-50 transition-colors duration-300 shadow-inner">
                  {fact.icon}
                </div>
                <div className="flex gap-2">
                  {fact.details && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-wider rounded-md">
                      {isHindi ? 'विवरण देखें' : 'Click for Details'}
                    </span>
                  )}
                  {fact.label && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider rounded-md">
                      {fact.label}
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {fact.title}
              </h3>
              
              <p className="font-body text-slate-600 leading-relaxed text-sm flex-1">
                {fact.description}
              </p>

              {fact.meta && (
                <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                  {fact.meta.map((m, j) => (
                    <span key={j} className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-semibold uppercase tracking-tighter rounded-md">
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Detailed Modal Overlay using Portal */}
      {createPortal(
        <AnimatePresence>
          {selectedFact && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 sm:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFact(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              
              <motion.div
                key="modal-content"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
                className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col items-stretch will-change-transform"
              >
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-2xl shadow-xl">
                        {selectedFact.icon}
                      </div>
                      <div>
                        <h2 className="font-display text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                          {selectedFact.title}
                        </h2>
                        <div className="flex gap-2 mt-2">
                          {selectedFact.meta?.map((m, j) => (
                            <span key={j} className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedFact(null)}
                      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">
                        {isHindi ? 'अवलोकन' : 'Overview'}
                      </h4>
                      <p className="font-body text-slate-600 text-base leading-relaxed">
                        {selectedFact.details || selectedFact.description}
                      </p>
                    </div>

                    {selectedFact.seatsByState && (
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                          <LayoutGrid className="w-4 h-4 text-slate-400" />
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {isHindi ? 'राज्यवार सीटें' : 'State-wise Seats'}
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {selectedFact.seatsByState.map((item, j) => (
                            <div key={j} className="flex justify-between items-center group">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {item.state}
                              </span>
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 bg-slate-200 rounded-full w-20 overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((item.seats / 80) * 100, 100)}%` }} 
                                    className="h-full bg-blue-600 rounded-full"
                                  />
                                </div>
                                <span className="text-xs font-black text-slate-900 w-6 text-right">{item.seats}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-6 text-[9px] font-medium text-slate-400 italic">
                          {isHindi 
                            ? '*सीटों की संख्या जनसंख्या के आधार पर भिन्न होती है।' 
                            : '*Seat counts vary by state based on population.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-10 py-6 bg-slate-900 flex justify-between items-center mt-auto">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                    {isHindi ? 'संसदीय शिक्षा' : 'Parliamentary Education'}
                  </span>
                  <button 
                    onClick={() => setSelectedFact(null)}
                    className="bg-white text-slate-900 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-lg"
                  >
                    {isHindi ? 'समझ गया' : 'Got it'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
