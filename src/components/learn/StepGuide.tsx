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

      <div className="relative pl-12 md:pl-20">
        {/* Modern Vertical Line - Moved to the left to avoid crossing content */}
        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full bg-gradient-to-b from-blue-600 to-emerald-500 rounded-full"
          />
        </div>

        <div className="space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-start gap-8 md:gap-12"
            >
              {/* Step Number Circle */}
              <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-300">
                <span className="text-xl md:text-2xl font-black">{step.number || i + 1}</span>
                {/* Connecting horizontal bit */}
                <div className="absolute top-1/2 left-full w-4 md:w-8 h-1 bg-slate-100" />
              </div>

              {/* Content Card */}
              <div className="flex-1 glass p-8 rounded-3xl border border-slate-200/50 hover:shadow-xl transition-all duration-500 text-left">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-body leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
                
                <div className="mt-6 flex justify-start">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <ArrowRight className="w-5 h-5" />
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
