import React from 'react';
import { AnswerOptionProps } from '../../types/quiz';

const AnswerOption: React.FC<AnswerOptionProps> = ({
  answer,
  isSelected,
  isCorrect,
  isSubmitted,
  onSelect,
}) => {
  const handleClick = () => {
    if (!isSubmitted) {
      onSelect(answer);
    }
  };

  let buttonClass = 'option-button';
  if (isSubmitted) {
    if (isCorrect) {
      buttonClass += ' correct';
    } else if (isSelected) {
      buttonClass += ' incorrect';
    }
  } else if (isSelected) {
    buttonClass += ' selected';
  }

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={isSubmitted}
    >
      {answer}
    </button>
  );
};

export default AnswerOption;
