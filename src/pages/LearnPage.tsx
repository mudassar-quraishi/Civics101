import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';
import { topics } from '../data/topics';
import TopicHeader from '../components/learn/TopicHeader';
import InfoCards from '../components/learn/InfoCards';
import StepGuide from '../components/learn/StepGuide';
import QuizSection from '../components/learn/QuizSection';
import ActionRow from '../components/learn/ActionRow';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function LearnPage() {
  const currentTopicIndex = useAppStore((s) => s.currentTopicIndex);
  const topic = topics[currentTopicIndex];
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when topic changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // If inside a scrollable container in App.tsx, we need to handle that there or here.
    // For now, targeting the main scrollable area.
    const scrollContainer = document.querySelector('main');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentTopicIndex]);

  if (!topic) return null;

  return (
    <article className="pb-20" ref={containerRef}>
      <TopicHeader topic={topic} />
      
      {topic.keyFacts && <InfoCards keyFacts={topic.keyFacts} />}

      {topic.callout && (
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="my-24 relative"
        >
          <div className="glass p-12 md:p-20 rounded-[3rem] border border-slate-200/50 shadow-2xl shadow-blue-500/5 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-10 shadow-xl shadow-blue-500/20">
                <Quote className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="font-display text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                {topic.callout.title}
              </h2>
              
              <p className="font-body text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
                {topic.callout.body}
              </p>

              {topic.callout.quote && (
                <div className="relative inline-block py-4">
                  <div className="absolute left-0 top-0 w-8 h-1 bg-blue-600 rounded-full" />
                  <blockquote className="font-display text-2xl md:text-3xl font-bold italic text-slate-900 px-4">
                    "{topic.callout.quote}"
                  </blockquote>
                  <div className="absolute right-0 bottom-0 w-8 h-1 bg-blue-600 rounded-full" />
                </div>
              )}
              
              {topic.callout.attribution && (
                <cite className="block mt-8 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 not-italic">
                  — {topic.callout.attribution}
                </cite>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {topic.steps && <StepGuide steps={topic.steps} />}
      
      {topic.quiz && (
        <QuizSection quiz={topic.quiz} topicId={topic.id} />
      )}
      
      <ActionRow topicId={topic.id} topicIndex={currentTopicIndex} />
    </article>
  );
}
