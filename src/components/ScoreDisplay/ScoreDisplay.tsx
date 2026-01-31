import React from 'react';

interface ScoreDisplayProps {
  currentScore: number;
  totalQuestions: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  currentScore,
  totalQuestions,
}) => {
  return (
    <div className="score-display">
      Score: {currentScore} / {totalQuestions}
    </div>
  );
};

export default ScoreDisplay;
