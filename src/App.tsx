import { useState } from 'react';
import './App.css';
import { Question, GameState } from './types/quiz';
import questionsData from './data/questions.json';
import HomePage from './components/HomePage/HomePage';
import GamePage from './components/GamePage/GamePage';
import ResultsPage from './components/ResultsPage/ResultsPage';

function App() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const startGame = () => {
    setQuestions(questionsData);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setGameState('finished');
    }
  };

  const restartGame = () => {
    setGameState('idle');
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestions([]);
  };

  return (
    <div className="App">
      <h1>Multi-Choice Quiz Game</h1>
      {gameState === 'idle' && <HomePage onStartGame={startGame} />}
      {gameState === 'playing' && questions.length > 0 && (
        <GamePage
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          score={score}
          onAnswerSubmit={handleAnswerSubmit}
          onNextQuestion={handleNextQuestion}
          onGameEnd={() => setGameState('finished')}
        />
      )}
      {gameState === 'finished' && (
        <ResultsPage
          finalScore={score}
          totalQuestions={questions.length}
          onRestartGame={restartGame}
        />
      )}
    </div>
  );
}

export default App;
