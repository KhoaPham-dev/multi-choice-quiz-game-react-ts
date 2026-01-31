import React from 'react';

interface NavigationButtonsProps {
  onSubmit: () => void;
  onNext: () => void;
  canSubmit: boolean;
  canProceed: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onSubmit,
  onNext,
  canSubmit,
  canProceed,
}) => {
  return (
    <div className="navigation-buttons">
      <button onClick={onSubmit} disabled={!canSubmit}>
        Submit Answer
      </button>
      <button onClick={onNext} disabled={!canProceed}>
        Next Question
      </button>
    </div>
  );
};

export default NavigationButtons;
