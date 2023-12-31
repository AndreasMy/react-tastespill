/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';

import { UsersContext } from '../../helpers/userData';
import { TopicContext } from '../../App';
import { shuffleArray } from '../../helpers/utils';

import { GameInput } from './Inputs';
import { DisplayWord } from './DisplayWord';
import { ScoreCounter } from './ScoreCounter';
import Timer from './Timer';

export const Game = ({
  lastTypedTime,
  setLastTypedTime,
  setShuffledWords,
  shuffledWords,
  score,
  setScore,
  setcorrectWordArr,
  correctWordArr,
  timeLeft, // Added
  setTimeLeft, // Added
  setGameOver, // Added
  // Added
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeDifference, setTimeDifference] = useState(null);

  const { setGameStart } = useContext(UsersContext);
  const { selectedTopic } = useContext(TopicContext);

  const [needsReshuffling, setNeedsReshuffling] = useState(false);

  useEffect(() => {
    if (currentIndex === shuffledWords.length - 1) {
      setNeedsReshuffling(true);
    }
  }, [currentIndex, shuffledWords]);

  useEffect(() => {
    if (needsReshuffling) {
      const shuffledArray = shuffleArray(selectedTopic.words);
      setShuffledWords(shuffledArray);
      setNeedsReshuffling(false);
      setCurrentIndex(0);
    }
  }, [needsReshuffling, selectedTopic.words, setShuffledWords]);

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
    <div className='game-wrapper'>
      <div className='game-col col-left'>
        <ScoreCounter
          timeDifference={timeDifference}
          setTimeDifference={setTimeDifference}
          score={score}
          setScore={setScore}
        />
      </div>
      <div className=' game-input-container'>
        <div className='g-input-container'>
          <DisplayWord
            shuffledWords={shuffledWords}
            currentIndex={currentIndex}
            inputValue={inputValue}
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
      </div>
      <div className='game-col col-right'>
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          setGameOver={setGameOver}
          setGameStart={setGameStart}
        />
      </div>
    </div>
  );
};
