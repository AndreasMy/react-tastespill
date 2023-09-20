/* import { useContext, useEffect } from 'react';
import { GameContext } from '../components/GameComponents';
import { shuffleArray } from '../helpers/utils';
import { TopicContext } from '../components/TopicSelection'; */

/* const useGameLogic = () => {
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
  } = useContext(GameContext);

  useEffect(() => {
    if (correctWordArr.length % 3 === 0 && correctWordArr.length !== 0) {
      setScore((prevScore) => prevScore + 10);
    }
  }, [correctWordArr, setScore]);

  function scoreByWords() {
    if (inputValue === shuffledWords[currentIndex]) {
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

  function evalLetters(inputValue) {
    const evalInput = scoreByLetters(inputValue);
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
}; */

/* export const useGameInput = () => {
  const { scoreByWords, recordTime } = useGameLogic();

  const {
    setCurrentIndex,
    setInputValue,
    setShuffledWords,
    setGameStart,

    currentIndex,
  } = useContext(GameContext);
  const { selectedTopic } = useContext(TopicContext);

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreByWords();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }
  }

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
    recordTime();
    console.log(currentIndex);
  }

  return {
    handleKeyDown,
    handleStartBtn,
  };
}; */

//export default useGameLogic;
