import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/appStore';

describe('appStore', () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it('should initialize with default values', () => {
    const state = useAppStore.getState();
    expect(state.completedTopics).toEqual([]);
    expect(state.currentTopicIndex).toBe(0);
    expect(state.language).toBe('en');
  });

  it('should mark a topic as complete', () => {
    const topicId = 'voter-registration';
    useAppStore.getState().markComplete(topicId);
    
    expect(useAppStore.getState().completedTopics).toContain(topicId);
  });

  it('should not duplicate completed topics', () => {
    const topicId = 'voter-registration';
    useAppStore.getState().markComplete(topicId);
    useAppStore.getState().markComplete(topicId);
    
    expect(useAppStore.getState().completedTopics).toHaveLength(1);
  });

  it('should update current topic index', () => {
    useAppStore.getState().setCurrentTopic(2);
    expect(useAppStore.getState().currentTopicIndex).toBe(2);
  });

  it('should update language', () => {
    useAppStore.getState().setLanguage('hi');
    expect(useAppStore.getState().language).toBe('hi');
  });

  it('should reset progress', () => {
    useAppStore.getState().markComplete('t1');
    useAppStore.getState().setCurrentTopic(5);
    useAppStore.getState().resetProgress();

    const state = useAppStore.getState();
    expect(state.completedTopics).toHaveLength(0);
    expect(state.currentTopicIndex).toBe(0);
  });
});
