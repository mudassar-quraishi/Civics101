import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import QuizSection from '../components/learn/QuizSection';
import { useAppStore } from '../store/appStore';
import type { QuizQuestion } from '../types';

const mockQuiz: QuizQuestion = {
  question: 'What is the minimum age to vote?',
  options: ['16', '18', '21', '25'],
  correctIndex: 1,
  explanation: 'The minimum age is 18.',
};

describe('QuizSection', () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it('renders the question and options', () => {
    render(<QuizSection quiz={mockQuiz} topicId="test-topic" />);
    
    expect(screen.getByText(mockQuiz.question)).toBeInTheDocument();
    mockQuiz.options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('allows selecting an option', () => {
    render(<QuizSection quiz={mockQuiz} topicId="test-topic" />);
    
    const option = screen.getByText('18');
    fireEvent.click(option);
    
    // Check if the button has selected styles (based on the class names in QuizSection)
    const button = option.closest('button');
    expect(button).toHaveClass('bg-slate-900');
  });

  it('shows explanation after submission', async () => {
    render(<QuizSection quiz={mockQuiz} topicId="test-topic" />);
    
    const option = screen.getByText('18');
    fireEvent.click(option);
    
    const submitButton = screen.getByText(/Submit Answer/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByText(mockQuiz.explanation)).toBeInTheDocument();
    expect(screen.getByText(/Outstanding!/i)).toBeInTheDocument();
  });

  it('shows wrong message for incorrect answer', () => {
    render(<QuizSection quiz={mockQuiz} topicId="test-topic" />);
    
    const option = screen.getByText('16');
    fireEvent.click(option);
    
    const submitButton = screen.getByText(/Submit Answer/i);
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/Not quite right/i)).toBeInTheDocument();
  });
});
