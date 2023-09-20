/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
import { UsersContext } from '../../helpers/userData';
import { GameInput } from './GameInputs';

export const ScoreCounter = ({ score }) => {
  return (
    <div>
      <p>Player Score</p>
      <p> Score: {score ? score : 0}</p>
    </div>
  );
};

export const DisplayWord = ({ shuffledWords, currentIndex, inputValue }) => {
  return (
    <>
      <h3>{shuffledWords[currentIndex]}</h3>
      <h4>{inputValue}</h4>
    </>
  );
};

export const Game = ({
  lastTypedTime,
  setLastTypedTime,
  shuffledWords,
  score,
  setScore,
  setcorrectWordArr,
  correctWordArr,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeDifference, setTimeDifference] = useState(null);

  const { selectedUser } = useContext(UsersContext);

  useEffect(() => {
    if (correctWordArr.length % 3 === 0 && correctWordArr.length !== 0) {
      setScore((prevScore) => prevScore + 10);
    }
  }, [correctWordArr, setScore]);

  function scoreByWords() {
    if (inputValue === shuffledWords[currentIndex]) {
      const currentTime = Date.now();
      const timeDifference = lastTypedTime
        ? (currentTime - lastTypedTime) / 1000
        : 0; // in seconds

      // Always calculate the time bonus since we have a starting point
      const timeBonusScore = Math.round(10 / (timeDifference || 1)); // We use || 1 to avoid dividing by zero just in case
      console.log(timeBonusScore);
      setScore((prevScore) => prevScore + 5 + timeBonusScore); // 5 for the correct word, plus the time bonus

      setLastTypedTime(currentTime);
      setcorrectWordArr([...correctWordArr, inputValue]);
    }
  }

  function scoreByLetters(inputValue) {
    let wordOne = '';
    let wordTwo = '';

    const [...splitShuffledWord] = shuffledWords[currentIndex];
    const [...inputToCompare] = inputValue;

    const currentWordIndex = inputToCompare.length - 1;

    wordOne = splitShuffledWord[currentWordIndex];
    wordTwo = inputToCompare[currentWordIndex];

    if (wordOne === wordTwo && wordOne !== undefined) {
      return 1;
    } else if (wordOne === undefined && wordTwo === undefined) {
      return 0;
    } else if (wordOne !== wordTwo) {
      return -1;
    } else if (wordOne.length !== wordTwo.length) {
      return -1;
    }
  }

  function evalLetters(inputValue) {
    const evalInput = scoreByLetters(inputValue);
    setScore((prevScore) => prevScore + evalInput);
  }

  return (
    <div>
      <h2>Game on!</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>

      <DisplayWord
        shuffledWords={shuffledWords}
        currentIndex={currentIndex}
        inputValue={inputValue}
      />
      <ScoreCounter
        timeDifference={timeDifference}
        setTimeDifference={setTimeDifference}
        score={score}
        setScore={setScore}
      />
      <GameInput
        currentIndex={currentIndex}
        evalLetters={evalLetters}
        scoreByWords={scoreByWords}
        setCurrentIndex={setCurrentIndex}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};
