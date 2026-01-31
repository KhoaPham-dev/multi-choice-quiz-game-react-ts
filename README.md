# Multi-Choice Quiz Game React + TypeScript

This is a web application that allows users to play a multi-choice questions game. The application presents questions one at a time, allows users to select an answer, provides immediate feedback, tracks their score, and displays a final score upon game completion.

## Table of Contents

- [Project Overview](#project-overview)
- [File Structure](#file-structure)
- [Setup & Installation](#setup--installation)
- [How to Run the Application](#how-to-run-the-application)
- [How to Run Tests](#how-to-run-tests)

## Project Overview

This project implements a simple multi-choice quiz game using React and TypeScript. It follows a component-based architecture, with clear separation of concerns for different parts of the game flow, including question display, answer selection, feedback, score tracking, and game completion. Question data is loaded from a local JSON file.

## File Structure

```
multi-choice-quiz-game-react-ts/
├── public/
├── src/
│   ├── components/
│   │   ├── AnswerOption/
│   │   │   ├── AnswerOption.tsx
│   │   │   └── AnswerOption.test.tsx
│   │   ├── FeedbackDisplay/
│   │   │   ├── FeedbackDisplay.tsx
│   │   │   └── FeedbackDisplay.test.tsx
│   │   ├── GamePage/
│   │   │   ├── GamePage.tsx
│   │   │   └── GamePage.test.tsx
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   └── HomePage.test.tsx
│   │   ├── NavigationButtons/
│   │   │   ├── NavigationButtons.tsx
│   │   │   └── NavigationButtons.test.tsx
│   │   ├── QuestionCard/
│   │   │   ├── QuestionCard.tsx
│   │   │   └── QuestionCard.test.tsx
│   │   ├── ResultsPage/
│   │   │   ├── ResultsPage.tsx
│   │   │   └── ResultsPage.test.tsx
│   │   └── ScoreDisplay/
│   │       ├── ScoreDisplay.tsx
│   │       └── ScoreDisplay.test.tsx
│   ├── data/
│   │   └── questions.json
│   ├── types/
│   │   └── quiz.ts
│   ├── App.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── setupTests.ts
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KhoaPham-dev/multi-choice-quiz-game-react-ts.git
    cd multi-choice-quiz-game-react-ts
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## How to Run the Application

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, and you can access the application in your browser at the address provided in the terminal (usually `http://localhost:5173`).

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will compile the application into the `dist` directory.

## How to Run Tests

To run the unit tests using Jest and React Testing Library:

```bash
npm test
# or
yarn test
```
