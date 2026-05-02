import { motion } from 'framer-motion';
import type { Step } from '../../types/index';
import { ArrowRight } from 'lucide-react';

interface Props {
  steps: Step[];
}

export default function StepGuide({ steps }: Props) {
  return (
    <section className="mb-24" aria-label="Step-by-step guide">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <div className="w-12 h-1 bg-blue-600 rounded-full" />
        <h2 className="font-display text-4xl font-bold tracking-tight text-slate-900">
          The Process
        </h2>
      </motion.div>

      <div className="relative pl-8 md:pl-0">
        {/* Modern Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full hidden md:block">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-blue-600 to-emerald-500 rounded-full"
          />
        </div>

        <div className="space-y-16 md:space-y-32">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number Circle */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 text-white shadow-2xl shadow-slate-300">
                <span className="text-xl md:text-2xl font-black">{step.number || i + 1}</span>
                {/* Connecting horizontal bit for desktop */}
                <div className={`absolute top-1/2 w-8 h-1 bg-slate-100 hidden md:block ${
                  i % 2 === 1 ? 'right-full' : 'left-full'
                }`} />
              </div>

              {/* Content Card */}
              <div className={`flex-1 glass p-8 rounded-3xl border border-slate-200/50 hover:shadow-xl transition-all duration-500 ${
                i % 2 === 1 ? 'md:text-right' : 'md:text-left'
              }`}>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-body leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
                
                <div className={`mt-6 flex ${i % 2 === 1 ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <ArrowRight className={`w-5 h-5 transition-transform ${i % 2 === 1 ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
