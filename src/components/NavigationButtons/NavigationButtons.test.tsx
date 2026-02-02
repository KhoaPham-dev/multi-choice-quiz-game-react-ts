import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationButtons from './NavigationButtons';

describe('NavigationButtons', () => {
  const mockOnSubmit = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders both buttons', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={false}
        canProceed={false}
      />
    );
    expect(screen.getByRole('button', { name: /submit answer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument();
  });

  it('applies "submit-answer-button" class when canSubmit is true', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={true}
        canProceed={false}
      />
    );
    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).toHaveClass('submit-answer-button');
  });

  it('does not apply "submit-answer-button" class when canSubmit is false', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={false}
        canProceed={false}
      />
    );
    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).not.toHaveClass('submit-answer-button');
  });

  it('disables submit button when canSubmit is false', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={false}
        canProceed={false}
      />
    );
    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when canSubmit is true', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={true}
        canProceed={false}
      />
    );
    const submitButton = screen.getByRole('button', { name: /submit answer/i });
    expect(submitButton).toBeEnabled();
  });

  it('disables next button when canProceed is false', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={false}
        canProceed={false}
      />
    );
    const nextButton = screen.getByRole('button', { name: /next question/i });
    expect(nextButton).toBeDisabled();
  });

  it('enables next button when canProceed is true', () => {
    render(
      <NavigationButtons
        onSubmit={mockOnSubmit}
        onNext={mockOnNext}
        canSubmit={false}
        canProceed={true}
      />
    );
    const nextButton = screen.getByRole('button', { name: /next question/i });
    expect(nextButton).toBeEnabled();
  });
});
