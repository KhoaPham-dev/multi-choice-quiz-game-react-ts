import React, { useState, useEffect } from 'react';
import { GamePageProps } from '../../types/quiz';
import QuestionCard from '../QuestionCard/QuestionCard';
import FeedbackDisplay from '../FeedbackDisplay/FeedbackDisplay';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';

const GamePage: React.FC<GamePageProps> = ({
  questions,
  currentQuestionIndex,
  score,
  onAnswerSubmit,
  onNextQuestion,
  onGameEnd,
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(null);
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    if (selectedAnswer) {
      const correct = selectedAnswer === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      setIsSubmitted(true);
      onAnswerSubmit(correct);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      onGameEnd(score);
    } else {
      onNextQuestion();
    }
  };

  if (!currentQuestion) {
    return <div>Loading question...</div>; // Should not happen if data is loaded correctly
  }

  return (
    <div className="game-page">
      <ScoreDisplay currentScore={score} totalQuestions={questions.length} />
      <QuestionCard
        question={currentQuestion}
        onAnswerSelect={setSelectedAnswer}
        selectedAnswer={selectedAnswer}
        showFeedback={isSubmitted}
        isSubmitted={isSubmitted}
        correctAnswer={currentQuestion.correctAnswer}
      />
      {isSubmitted && <FeedbackDisplay isCorrect={isCorrect} isVisible={isSubmitted} />}
      <NavigationButtons
        onSubmit={handleSubmit}
        onNext={handleNext}
        canSubmit={selectedAnswer !== null && !isSubmitted}
        canProceed={isSubmitted}
      />
    </div>
  );
};

export default GamePage;
