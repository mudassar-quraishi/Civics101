import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Message } from '../types';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      completedTopics: [],
      currentTopicIndex: 0,
      chatHistories: {},
      quizAnswers: {},
      activeTab: 'learn',
      language: 'en',

      markComplete: (topicId: string) =>
        set((state) => ({
          completedTopics: state.completedTopics.includes(topicId)
            ? state.completedTopics
            : [...state.completedTopics, topicId],
        })),

      setCurrentTopic: (index: number) =>
        set({ currentTopicIndex: index }),

      addMessage: (topicId: string, msg: Message) =>
        set((state) => ({
          chatHistories: {
            ...state.chatHistories,
            [topicId]: [...(state.chatHistories[topicId] || []), msg],
          },
        })),

      setQuizAnswer: (topicId: string, answerIndex: number) =>
        set((state) => ({
          quizAnswers: {
            ...state.quizAnswers,
            [topicId]: answerIndex,
          },
        })),

      setActiveTab: (tab) => set({ activeTab: tab }),
      setLanguage: (lang) => set({ language: lang }),

      resetProgress: () =>
        set({
          completedTopics: [],
          currentTopicIndex: 0,
          chatHistories: {},
          quizAnswers: {},
        }),
    }),
    {
      name: 'civics101-progress',
      partialize: (state) => ({
        completedTopics: state.completedTopics,
        currentTopicIndex: state.currentTopicIndex,
        chatHistories: state.chatHistories,
        quizAnswers: state.quizAnswers,
        language: state.language,
      }),
    }
  )
);
