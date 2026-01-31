import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionCard from './QuestionCard';
import { Question } from '../../types/quiz';
import React from 'react';

const mockQuestion: Question = {
  id: '1',
  questionText: 'What is the capital of France?',
  choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
  correctAnswer: 'Paris',
};

describe('QuestionCard', () => {
  const defaultProps = {
    question: mockQuestion,
    onAnswerSelect: jest.fn(),
    selectedAnswer: null,
    showFeedback: false,
    isSubmitted: false,
    correctAnswer: mockQuestion.correctAnswer,
  };

  test('renders question text and all choices', () => {
    render(<QuestionCard {...defaultProps} />);
    expect(screen.getByText(mockQuestion.questionText)).toBeInTheDocument();
    mockQuestion.choices.forEach((choice) => {
      expect(screen.getByRole('button', { name: choice })).toBeInTheDocument();
    });
  });

  test('calls onAnswerSelect when an answer is clicked', async () => {
    const handleAnswerSelect = jest.fn();
    render(<QuestionCard {...defaultProps} onAnswerSelect={handleAnswerSelect} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Paris' }));
    expect(handleAnswerSelect).toHaveBeenCalledWith('Paris');
  });

  test('highlights selected answer', async () => {
    render(<QuestionCard {...defaultProps} selectedAnswer="Madrid" />);
    expect(screen.getByRole('button', { name: 'Madrid' })).toHaveClass('selected');
    expect(screen.getByRole('button', { name: 'Paris' })).not.toHaveClass('selected');
  });

  test('shows correct/incorrect feedback after submission', () => {
    render(
      <QuestionCard
        {...defaultProps}
        selectedAnswer="Berlin"
        showFeedback={true}
        isSubmitted={true}
      />
    );
    expect(screen.getByRole('button', { name: 'Berlin' })).toHaveClass('incorrect');
    expect(screen.getByRole('button', { name: 'Paris' })).toHaveClass('correct');
  });

  test('does not show feedback before submission', () => {
    render(
      <QuestionCard
        {...defaultProps}
        selectedAnswer="Berlin"
        showFeedback={false}
        isSubmitted={false}
      />
    );
    expect(screen.getByRole('button', { name: 'Berlin' })).not.toHaveClass('incorrect');
    expect(screen.getByRole('button', { name: 'Paris' })).not.toHaveClass('correct');
  });
});
