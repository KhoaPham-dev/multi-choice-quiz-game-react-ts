import React from 'react';
import { QuestionCardProps } from '../../types/quiz';
import AnswerOption from '../AnswerOption/AnswerOption';

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showFeedback,
  isSubmitted,
  correctAnswer,
}) => {
  return (
    <div className="card question-card">
      <p className="question-text">{question.questionText}</p>
      <div className="options-container">
        {question.choices.map((choice) => (
          <AnswerOption
            key={choice}
            answer={choice}
            isSelected={selectedAnswer === choice}
            isCorrect={choice === correctAnswer}
            isSubmitted={isSubmitted}
            onSelect={onAnswerSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
