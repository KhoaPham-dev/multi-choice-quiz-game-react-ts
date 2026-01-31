import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationButtons from './NavigationButtons';
import React from 'react';

describe('NavigationButtons', () => {
  const defaultProps = {
    onSubmit: jest.fn(),
    onNext: jest.fn(),
    canSubmit: false,
    canProceed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders submit and next buttons', () => {
    render(<NavigationButtons {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Submit Answer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeInTheDocument();
  });

  test('submit button is enabled when canSubmit is true', () => {
    render(<NavigationButtons {...defaultProps} canSubmit={true} />);
    expect(screen.getByRole('button', { name: /Submit Answer/i })).toBeEnabled();
  });

  test('submit button is disabled when canSubmit is false', () => {
    render(<NavigationButtons {...defaultProps} canSubmit={false} />);
    expect(screen.getByRole('button', { name: /Submit Answer/i })).toBeDisabled();
  });

  test('next button is enabled when canProceed is true', () => {
    render(<NavigationButtons {...defaultProps} canProceed={true} />);
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeEnabled();
  });

  test('next button is disabled when canProceed is false', () => {
    render(<NavigationButtons {...defaultProps} canProceed={false} />);
    expect(screen.getByRole('button', { name: /Next Question/i })).toBeDisabled();
  });

  test('calls onSubmit when submit button is clicked and enabled', async () => {
    const handleSubmit = jest.fn();
    render(<NavigationButtons {...defaultProps} canSubmit={true} onSubmit={handleSubmit} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('calls onNext when next button is clicked and enabled', async () => {
    const handleNext = jest.fn();
    render(<NavigationButtons {...defaultProps} canProceed={true} onNext={handleNext} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Next Question/i }));
    expect(handleNext).toHaveBeenCalledTimes(1);
  });

  test('does not call onSubmit when submit button is clicked and disabled', async () => {
    const handleSubmit = jest.fn();
    render(<NavigationButtons {...defaultProps} canSubmit={false} onSubmit={handleSubmit} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Submit Answer/i }));
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('does not call onNext when next button is clicked and disabled', async () => {
    const handleNext = jest.fn();
    render(<NavigationButtons {...defaultProps} canProceed={false} onNext={handleNext} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Next Question/i }));
    expect(handleNext).not.toHaveBeenCalled();
  });
});
