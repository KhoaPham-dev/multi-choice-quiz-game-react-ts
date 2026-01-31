import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsPage from './ResultsPage';
import React from 'react';

describe('ResultsPage', () => {
  const defaultProps = {
    finalScore: 3,
    totalQuestions: 5,
    onRestartGame: jest.fn(),
  };

  test('renders game over message and final score', () => {
    render(<ResultsPage {...defaultProps} />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.getByText(`Your Score: ${defaultProps.finalScore} out of ${defaultProps.totalQuestions}`)).toBeInTheDocument();
  });

  test('renders play again button', () => {
    render(<ResultsPage {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Play Again/i })).toBeInTheDocument();
  });

  test('calls onRestartGame when play again button is clicked', async () => {
    const handleRestartGame = jest.fn();
    render(<ResultsPage {...defaultProps} onRestartGame={handleRestartGame} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Play Again/i }));
    expect(handleRestartGame).toHaveBeenCalledTimes(1);
  });

  test('displays correct score for different values', () => {
    render(<ResultsPage finalScore={0} totalQuestions={5} onRestartGame={() => {}} />);
    expect(screen.getByText('Your Score: 0 out of 5')).toBeInTheDocument();

    render(<ResultsPage finalScore={5} totalQuestions={5} onRestartGame={() => {}} />);
    expect(screen.getByText('Your Score: 5 out of 5')).toBeInTheDocument();
  });
});
