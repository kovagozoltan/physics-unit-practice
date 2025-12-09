
import { useState, useEffect, useCallback } from 'react';
import { generateQuestion, convert, generateDistractors } from '../logic/UnitConversion';

export const GAME_STATES = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  REFERENCE: 'REFERENCE',
};

const POINTS = {
  TEXT_EXACT: 100,
  MULTIPLE_CHOICE: 50,
  HINT_USED: 25,
};

export function useGame() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', message: string, pointsDelta: number }
  
  // Assistance State
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [distractors, setDistractors] = useState([]);
  const [hintShown, setHintShown] = useState(false);

  // Generate a new question
  const nextQuestion = useCallback(() => {
    const q = generateQuestion(level);
    setCurrentQuestion(q);
    setFeedback(null);
    setIsMultipleChoice(false);
    setDistractors([]);
    setHintShown(false);
  }, [level]);

  // Start Game
  const startGame = () => {
    setScore(0);
    setLevel(1);
    setStreak(0);
    setGameState(GAME_STATES.PLAYING);
    nextQuestion();
  };

  const returnToMenu = () => {
    setGameState(GAME_STATES.MENU);
  }

  const showReference = () => {
    setGameState(GAME_STATES.REFERENCE);
  }

  // Actions
  const requestHint = () => {
    setHintShown(true);
  };

  const requestMultipleChoice = () => {
    if (!currentQuestion) return;
    const wrongs = generateDistractors(currentQuestion.answer, 3);
    // Shuffle correct answer in
    const options = [...wrongs, currentQuestion.answer].sort(() => Math.random() - 0.5);
    setDistractors(options);
    setIsMultipleChoice(true);
  };

  const checkAnswer = (userValue) => {
    if (!currentQuestion) return;

    // Parse input if string
    let numericValue = parseFloat(userValue);
    
    // Validate
    if (isNaN(numericValue)) {
      setFeedback({ type: 'error', message: "Invalid Number" });
      return;
    }

    // Check tolerance (1% error allowed for rounding issues)
    const exact = currentQuestion.answer;
    const errorMargin = Math.abs(exact * 0.01);
    const isCorrect = Math.abs(numericValue - exact) <= (errorMargin === 0 ? 1e-9 : errorMargin); // handle 0 case

    if (isCorrect) {
      // Calculate Points
      let points = POINTS.TEXT_EXACT;
      if (isMultipleChoice) points = POINTS.MULTIPLE_CHOICE;
      if (hintShown) points = Math.max(10, points - POINTS.HINT_USED); // Penalty, but min 10

      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      // Level Up Logic: Every 3 correct in a row, level up
      if ((streak + 1) % 3 === 0) {
        setLevel(prev => prev + 1);
      }

      setFeedback({ type: 'correct', message: `Correct! (+${points})`, pointsDelta: points });
      
      // Auto advance after short delay? Or manual? 
      // Manual "Next" button is usually better for educational apps so they can read the feedback.
    } else {
      setStreak(0);
      // Level Down Logic: If failing at level > 1, drop down
      if (level > 1) {
        setLevel(prev => prev - 1);
      }
      setFeedback({ type: 'wrong', message: `Incorrect. The answer was ${exact.toPrecision(4)}` });
    }
  };

  return {
    gameState,
    level,
    score,
    streak,
    currentQuestion,
    feedback,
    isMultipleChoice,
    distractors,
    hintShown,
    startGame,
    returnToMenu,
    showReference,
    nextQuestion,
    requestHint,
    requestMultipleChoice,
    checkAnswer
  };
}
