import React from 'react';

interface FeedbackDisplayProps {
  isCorrect: boolean | null;
  isVisible: boolean;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ isCorrect, isVisible }) => {
  if (!isVisible || isCorrect === null) {
    return null;
  }

  const feedbackText = isCorrect ? 'Correct!' : 'Incorrect!';
  const feedbackClass = isCorrect ? 'correct' : 'incorrect';

  return (
    <div className={`feedback-display ${feedbackClass}`}>
      {feedbackText}
    </div>
  );
};

export default FeedbackDisplay;
