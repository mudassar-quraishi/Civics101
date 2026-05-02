import { useEffect, useRef } from 'react';
import { useAppStore } from './store/appStore';
import { topics } from './data/topics';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import Sidebar from './components/layout/Sidebar';
import LearnPage from './pages/LearnPage';
import TimelinePage from './pages/TimelinePage';
import GlossaryPage from './pages/GlossaryPage';
import FloatingChat from './components/learn/FloatingChat';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const activeTab = useAppStore((s) => s.activeTab);
  const currentTopicIndex = useAppStore((s) => s.currentTopicIndex);
  const mainRef = useRef<HTMLElement>(null);

  // Global scroll to top on tab or topic change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, currentTopicIndex]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <a href="#main-content" className="skip-link">Skip to Content</a>
      <Header />
      <TabNavigation />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Modern Glass Sidebar */}
        <AnimatePresence mode="wait">
          {activeTab === 'learn' && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
              className="hidden lg:block z-20"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content with page transitions */}
        <main id="main-content" ref={mainRef} className="flex-1 overflow-y-auto relative z-10">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 pb-32 lg:pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {activeTab === 'learn' && <LearnPage />}
                {activeTab === 'timeline' && <TimelinePage />}
                {activeTab === 'glossary' && <GlossaryPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile module nav */}
      {activeTab === 'learn' && <MobileModuleNav />}

      {/* Global Floating AI Chat */}
      <FloatingChat />
    </div>
  );
}

function MobileModuleNav() {
  const currentTopicIndex = useAppStore((s) => s.currentTopicIndex);
  const setCurrentTopic = useAppStore((s) => s.setCurrentTopic);
  const completedTopics = useAppStore((s) => s.completedTopics);

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-slate-200/50 px-4 py-4 flex gap-3 overflow-x-auto z-40"
    >
      {topics.map((topic, i) => {
        const isActive = i === currentTopicIndex;
        const isCompleted = completedTopics.includes(topic.id);
        return (
          <button
            key={topic.id}
            onClick={() => setCurrentTopic(i)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300
              ${isActive
                ? 'bg-slate-900 text-white shadow-lg scale-105'
                : isCompleted
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-white text-slate-500 border border-slate-100'
              }
            `}
          >
            <span className="mr-1.5">{topic.icon}</span>
            {topic.title}
          </button>
        );
      })}
    </motion.div>
  );
}

export default App;
