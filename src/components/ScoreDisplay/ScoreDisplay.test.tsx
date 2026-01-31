import { render, screen } from '@testing-library/react';
import ScoreDisplay from './ScoreDisplay';
import React from 'react';

describe('ScoreDisplay', () => {
  test('renders the current score and total questions', () => {
    const currentScore = 3;
    const totalQuestions = 5;
    render(<ScoreDisplay currentScore={currentScore} totalQuestions={totalQuestions} />);
    expect(screen.getByText(`Score: ${currentScore} / ${totalQuestions}`)).toBeInTheDocument();
  });

  test('renders with zero score correctly', () => {
    const currentScore = 0;
    const totalQuestions = 10;
    render(<ScoreDisplay currentScore={currentScore} totalQuestions={totalQuestions} />);
    expect(screen.getByText(`Score: ${currentScore} / ${totalQuestions}`)).toBeInTheDocument();
  });

  test('renders with full score correctly', () => {
    const currentScore = 7;
    const totalQuestions = 7;
    render(<ScoreDisplay currentScore={currentScore} totalQuestions={totalQuestions} />);
    expect(screen.getByText(`Score: ${currentScore} / ${totalQuestions}`)).toBeInTheDocument();
  });

  test('handles different numbers of questions', () => {
    render(<ScoreDisplay currentScore={1} totalQuestions={2} />);
    expect(screen.getByText('Score: 1 / 2')).toBeInTheDocument();

    render(<ScoreDisplay currentScore={5} totalQuestions={10} />);
    expect(screen.getByText('Score: 5 / 10')).toBeInTheDocument();
  });
});
