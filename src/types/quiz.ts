// src/types/quiz.ts

export interface Question {
  id: string;
  questionText: string;
  choices: string[];
  correctAnswer: string;
}

// Props for QuestionCard
export interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (selectedAnswer: string) => void;
  selectedAnswer: string | null;
  showFeedback: boolean;
  isSubmitted: boolean;
  correctAnswer: string | null;
}

// Props for AnswerOption
export interface AnswerOptionProps {
  answer: string;
  isSelected: boolean;
  isCorrect: boolean; // True if this option is the correct answer
  isSubmitted: boolean; // True if an answer has been submitted for this question
  onSelect: (answer: string) => void;
}

// Props for GamePage
export interface GamePageProps {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  onAnswerSubmit: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onGameEnd: (finalScore: number) => void;
}

// Props for ResultsPage
export interface ResultsPageProps {
  finalScore: number;
  totalQuestions: number;
  onRestartGame: () => void;
}

// Main App state interface
export type GameState = 'idle' | 'playing' | 'finished';

export interface AppState {
  gameState: GameState;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
}
