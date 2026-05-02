import { useState } from 'react';
import { glossaryTerms } from '../data/glossary';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookText, HelpCircle } from 'lucide-react';

export default function GlossaryPage() {
  const [search, setSearch] = useState('');

  const filteredTerms = glossaryTerms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in pb-20">
      <header className="mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 mb-6"
        >
          <BookText className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Democratic Lexicon</span>
        </motion.div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
          Glossary
        </h1>
        
        {/* Modern Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search for terms (e.g. EVM, Constituency...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[2rem] pl-16 pr-14 py-6 shadow-xl shadow-slate-200/40 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all text-slate-900 font-medium placeholder:text-slate-400"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredTerms.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredTerms.map((item, i) => (
                <motion.article
                  key={item.term}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass p-8 rounded-3xl border border-slate-200/50 hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-black text-sm">{item.term[0]}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">
                      {item.term}
                    </h3>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed font-body">
                    {item.definition}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200"
            >
              <HelpCircle className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-bold text-xl uppercase tracking-widest">No terms found</p>
              <button 
                onClick={() => setSearch('')}
                className="mt-6 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
