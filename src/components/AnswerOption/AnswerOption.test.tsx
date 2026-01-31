import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnswerOption from './AnswerOption';
import React from 'react';

describe('AnswerOption', () => {
  const defaultProps = {
    answer: 'Test Answer',
    isSelected: false,
    isCorrect: false,
    isSubmitted: false,
    onSelect: jest.fn(),
  };

  test('renders the answer text', () => {
    render(<AnswerOption {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Test Answer' })).toBeInTheDocument();
  });

  test('calls onSelect when clicked and not submitted', async () => {
    const handleSelect = jest.fn();
    render(<AnswerOption {...defaultProps} onSelect={handleSelect} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Test Answer' }));
    expect(handleSelect).toHaveBeenCalledWith('Test Answer');
  });

  test('does not call onSelect when clicked and submitted', async () => {
    const handleSelect = jest.fn();
    render(<AnswerOption {...defaultProps} isSubmitted={true} onSelect={handleSelect} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Test Answer' }));
    expect(handleSelect).not.toHaveBeenCalled();
  });

  test('applies selected class when isSelected is true and not submitted', () => {
    render(<AnswerOption {...defaultProps} isSelected={true} />);
    expect(screen.getByRole('button', { name: 'Test Answer' })).toHaveClass('selected');
  });

  test('applies correct class when isSubmitted and isCorrect are true', () => {
    render(<AnswerOption {...defaultProps} isSubmitted={true} isCorrect={true} />);
    expect(screen.getByRole('button', { name: 'Test Answer' })).toHaveClass('correct');
  });

  test('applies incorrect class when isSubmitted and isSelected are true, but not correct', () => {
    render(<AnswerOption {...defaultProps} isSubmitted={true} isSelected={true} isCorrect={false} />);
    expect(screen.getByRole('button', { name: 'Test Answer' })).toHaveClass('incorrect');
  });

  test('button is disabled when isSubmitted is true', () => {
    render(<AnswerOption {...defaultProps} isSubmitted={true} />);
    expect(screen.getByRole('button', { name: 'Test Answer' })).toBeDisabled();
  });

  test('button is not disabled when isSubmitted is false', () => {
    render(<AnswerOption {...defaultProps} isSubmitted={false} />);
    expect(screen.getByRole('button', { name: 'Test Answer' })).not.toBeDisabled();
  });
});
