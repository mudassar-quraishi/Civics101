import { useAppStore } from '../../store/appStore';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Search } from 'lucide-react';

const tabs = [
  { id: 'learn', label: 'Curriculum', labelHindi: 'पाठ्यक्रम', icon: BookOpen },
  { id: 'timeline', label: 'Key Dates', labelHindi: 'महत्वपूर्ण तिथियां', icon: Calendar },
  { id: 'glossary', label: 'Glossary', labelHindi: 'शब्दावली', icon: Search },
] as const;

export default function TabNavigation() {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const language = useAppStore((s) => s.language);
  const isHindi = language === 'hi';

  return (
    <nav className="bg-white border-b border-slate-200/50 px-8 flex-shrink-0 relative z-40">
      <div className="max-w-5xl mx-auto flex gap-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group relative py-5 flex items-center gap-2.5 text-sm font-bold transition-all duration-300 cursor-pointer
                ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}
              `}
            >
              <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              {isHindi ? tab.labelHindi : tab.label}
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full shadow-[0_-4px_12px_rgba(37,99,235,0.3)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
