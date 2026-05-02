import { motion } from 'framer-motion';
import { timelineEvents } from '../data/timeline';
import { Calendar, Clock, Flag } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="animate-fade-in pb-20">
      <header className="mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-6"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">Election Cycle 2024-25</span>
        </motion.div>
        <h1 className="font-display text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          Key Milestones
        </h1>
        <p className="text-slate-500 font-body max-w-2xl mx-auto text-lg leading-relaxed">
          Critical dates from the announcement of the schedule to the swearing-in ceremony of the new government.
        </p>
      </header>

      <div className="relative max-w-3xl mx-auto">
        {/* Modern Vertical Path */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-blue-600 via-emerald-500 to-amber-500 rounded-full shadow-lg shadow-blue-500/20"
          />
        </div>

        <div className="space-y-24">
          {timelineEvents.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Event Bubble */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xl group cursor-help transition-all hover:scale-110">
                <div className="text-2xl">{event.icon}</div>
                <div className="absolute -inset-2 bg-blue-500/5 rounded-[1.5rem] scale-0 group-hover:scale-100 transition-transform -z-10" />
              </div>

              {/* Content Card */}
              <div className={`flex-1 glass p-8 rounded-3xl border border-slate-200/50 hover:shadow-2xl transition-all duration-500 ${
                i % 2 === 1 ? 'md:text-right' : 'md:text-left'
              }`}>
                <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                    {event.period}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                  {event.title}
                </h3>
                
                <p className="text-slate-500 font-body leading-relaxed text-sm md:text-base">
                  {event.description}
                </p>
                
                {i === timelineEvents.length - 1 && (
                  <div className={`mt-6 flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider ${i % 2 === 1 ? 'justify-end' : ''}`}>
                    <Flag className="w-4 h-4" />
                    Victory Proclaimed
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
