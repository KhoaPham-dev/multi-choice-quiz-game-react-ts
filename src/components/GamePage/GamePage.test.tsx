import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamePage from './GamePage';
import { Question } from '../../types/quiz';
import React from 'react';

const mockQuestions: Question[] = [
  {
    id: '1',
    questionText: 'What is the capital of France?',
    choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: '2',
    questionText: 'Which planet is known as the Red Planet?',
    choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
];

describe('GamePage', () => {
  const defaultProps = {
    questions: mockQuestions,
    currentQuestionIndex: 0,
    score: 0,
    onAnswerSubmit: jest.fn(),
    onNextQuestion: jest.fn(),
    onGameEnd: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders current question and choices', () => {
    render(<GamePage {...defaultProps} />);
    expect(screen.getByText(mockQuestions[0].questionText)).toBeInTheDocument();
    mockQuestions[0].choices.forEach((choice) => {
      expect(screen.getByRole('button', { name: choice })).toBeInTheDocument();
    });
    expect(screen.getByText(/Score: 0 \/ 2/i)).toBeInTheDocument();
  });

  test('allows selecting an answer', async () => {
    render(<GamePage {...defaultProps} />);
    const user = userEvent.setup();
    const parisButton = screen.getByRole('button', { name: 'Paris' });
    await user.click(parisButton);
    expect(parisButton).toHaveClass('selected');
  });

  test('submits correct answer and shows feedback', async () => {
    render(<GamePage {...defaultProps} />);
    const user = userEvent.setup();

    const parisButton = screen.getByRole('button', { name: 'Paris' });
    await user.click(parisButton);

    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    await user.click(submitButton);

    expect(defaultProps.onAnswerSubmit).toHaveBeenCalledWith(true);
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    expect(parisButton).toHaveClass('correct');
  });

  test('submits incorrect answer and shows feedback', async () => {
    render(<GamePage {...defaultProps} />);
    const user = userEvent.setup();

    const berlinButton = screen.getByRole('button', { name: 'Berlin' });
    await user.click(berlinButton);

    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    await user.click(submitButton);

    expect(defaultProps.onAnswerSubmit).toHaveBeenCalledWith(false);
    expect(screen.getByText('Incorrect!')).toBeInTheDocument();
    expect(berlinButton).toHaveClass('incorrect');
    expect(screen.getByRole('button', { name: 'Paris' })).toHaveClass('correct'); // Correct answer highlighted
  });

  test('navigates to next question', async () => {
    render(<GamePage {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Paris' }));
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));

    const nextButton = screen.getByRole('button', { name: /Next Question/i });
    await user.click(nextButton);

    expect(defaultProps.onNextQuestion).toHaveBeenCalledTimes(1);
  });

  test('ends game after last question', async () => {
    render(<GamePage {...defaultProps} currentQuestionIndex={mockQuestions.length - 1} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Mars' }));
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));

    const nextButton = screen.getByRole('button', { name: /Next Question/i });
    await user.click(nextButton);

    expect(defaultProps.onGameEnd).toHaveBeenCalledWith(defaultProps.score);
  });

  test('submit button is disabled if no answer is selected', () => {
    render(<GamePage {...defaultProps} />);
    const submitButton = screen.getByRole('button', { name: /Submit Answer/i });
    expect(submitButton).toBeDisabled();
  });

  test('next question button is disabled until answer is submitted', () => {
    render(<GamePage {...defaultProps} />);
    const nextButton = screen.getByRole('button', { name: /Next Question/i });
    expect(nextButton).toBeDisabled();
  });

  test('feedback and next button appear after submission', async () => {
    render(<GamePage {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Paris' }));
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));

    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Next Question/i })).toBeEnabled();
    });
  });
});
