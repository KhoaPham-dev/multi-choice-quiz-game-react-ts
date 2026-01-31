import { render, screen } from '@testing-library/react';
import FeedbackDisplay from './FeedbackDisplay';
import React from 'react';

describe('FeedbackDisplay', () => {
  test('renders nothing when not visible', () => {
    const { container } = render(<FeedbackDisplay isCorrect={true} isVisible={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders nothing when isCorrect is null', () => {
    const { container } = render(<FeedbackDisplay isCorrect={null} isVisible={true} />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders "Correct!" with correct class when isCorrect is true and visible', () => {
    render(<FeedbackDisplay isCorrect={true} isVisible={true} />);
    const feedbackElement = screen.getByText('Correct!');
    expect(feedbackElement).toBeInTheDocument();
    expect(feedbackElement).toHaveClass('correct');
    expect(feedbackElement).not.toHaveClass('incorrect');
  });

  test('renders "Incorrect!" with incorrect class when isCorrect is false and visible', () => {
    render(<FeedbackDisplay isCorrect={false} isVisible={true} />);
    const feedbackElement = screen.getByText('Incorrect!');
    expect(feedbackElement).toBeInTheDocument();
    expect(feedbackElement).toHaveClass('incorrect');
    expect(feedbackElement).not.toHaveClass('correct');
  });
});
