import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';
import React from 'react';

describe('HomePage', () => {
  test('renders welcome message and start button', () => {
    render(<HomePage onStartGame={() => {}} />);
    expect(screen.getByText(/Welcome to the Quiz Game!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Game/i })).toBeInTheDocument();
  });

  test('calls onStartGame when button is clicked', async () => {
    const handleStartGame = jest.fn();
    render(<HomePage onStartGame={handleStartGame} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Start Game/i }));
    expect(handleStartGame).toHaveBeenCalledTimes(1);
  });
});
