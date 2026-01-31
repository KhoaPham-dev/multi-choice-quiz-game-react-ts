import React from 'react';
import { ResultsPageProps } from '../../types/quiz';

const ResultsPage: React.FC<ResultsPageProps> = ({
  finalScore,
  totalQuestions,
  onRestartGame,
}) => {
  return (
    <div className="results-page card">
      <h2>Game Over!</h2>
      <p>Your Score: {finalScore} out of {totalQuestions}</p>
      <button onClick={onRestartGame}>Play Again</button>
    </div>
  );
};

export default ResultsPage;
