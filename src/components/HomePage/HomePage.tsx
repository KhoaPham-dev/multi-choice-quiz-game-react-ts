import React from 'react';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  return (
    <div className="home-page">
      <h2>Welcome to the Quiz Game!</h2>
      <p>Test your knowledge with our multi-choice questions.</p>
      <button onClick={onStartGame}>Start Game</button>
    </div>
  );
};

export default HomePage;
