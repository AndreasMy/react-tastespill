import { useCallback, useContext, useEffect } from 'react';
import { GameContext } from '../components/GamePage';
import { shuffleArray } from '../helpers/utils';
import { TopicContext } from '../components/TopicSelection';

const useGameLogic = () => {
  const {
    setScore,
    currentIndex,
    shuffledWords,
    setShuffledWords,
    inputValue,
    correctWordArr,
    setcorrectWordArr,
    storedTime,
    setStoredTime,
    timeDifference,
    setTimeDifference,
  } = useContext(GameContext);

  useEffect(() => {
    if (correctWordArr.length % 3 === 0 && correctWordArr.length !== 0) {
      setScore((prevScore) => prevScore + 10);
    }
  }, [correctWordArr, setScore]);

  const triggerTimeBonus = useCallback(() => {
    const timeMS = storedTime.instanceTwo - storedTime.instanceOne;
    const timeS = timeMS / 1000;
    setTimeDifference(timeS);
  }, [setTimeDifference, storedTime.instanceOne, storedTime.instanceTwo]);

  useEffect(() => {
    if (storedTime.instanceOne !== null && storedTime.instanceTwo !== null) {
      triggerTimeBonus();
    }
  }, [storedTime, triggerTimeBonus]);

  useEffect(() => {
    if (timeDifference !== null) {
      const timeBonsuScore = Math.round(10 / timeDifference);
      setScore((prevScore) => prevScore + timeBonsuScore);
      setTimeDifference(null);
      console.log('Time bonus! ' + timeBonsuScore);
      console.log(timeDifference);
    }
  }, [setScore, timeDifference, setTimeDifference]);

  function scoreByWords() {
    if (inputValue === shuffledWords[currentIndex]) {
      triggerTimeBonus();
      setcorrectWordArr([...correctWordArr, inputValue]);
      setScore((prevScore) => prevScore + 5);
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

  function evalLetters(inputString) {
    const evalInput = scoreByLetters(inputString);
    setScore((prevScore) => prevScore + evalInput);
  }

  const recordTime = () => {
    if (storedTime.instanceOne === null && storedTime.instanceTwo === null) {
      setStoredTime((prevState) => ({
        ...prevState,
        instanceOne: Date.now(),
      }));
    } else if (
      storedTime.instanceOne !== null &&
      storedTime.instanceTwo === null
    ) {
      setStoredTime((prevState) => ({
        ...prevState,
        instanceTwo: Date.now(),
      }));
    } else {
      return;
    }
  };

  return {
    setShuffledWords,
    scoreByWords,
    evalLetters,
    recordTime,
  };
};

export const useGameInput = () => {
  const { scoreByWords, recordTime } = useGameLogic();

  const {
    setCurrentIndex,
    setInputValue,
    setShuffledWords,
    setGameStart,
    timeDifference,
    setStoredTime,
    storedTime,
  } = useContext(GameContext);
  const { selectedTopic } = useContext(TopicContext);

  function handleKeyDown(event) {
    if (event.key === ' ') {
      recordTime();
      scoreByWords();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
      console.log(storedTime);

      if (timeDifference !== null) {
        setStoredTime((prevState) => ({
          ...prevState,
          instanceOne: null,
          instanceTwo: null,
        }));
      }
    }
  }

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
  }

  return {
    handleKeyDown,
    handleStartBtn,
  };
};

export default useGameLogic;
