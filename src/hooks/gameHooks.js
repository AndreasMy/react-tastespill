import { useContext } from 'react';
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
    wordIndex,
  } = useContext(GameContext);

  function setInputString() {
    let inputString = inputValue;
    inputString = inputString.replace(/\s/g, '');
    return inputString;
  }

  function scoreCounter() {
    const inputString = setInputString();

    if (inputString === shuffledWords[currentIndex]) {
      setScore((prevScore) => prevScore + 5);
    }
  }

  function compareLetters() {
    const inputString = setInputString();

    let wordOne = '';
    let wordTwo = '';

    const [...splitShuffledWord] = shuffledWords[currentIndex];
    const [...inputToCompare] = inputString;

    wordOne = splitShuffledWord[wordIndex];
    wordTwo = inputToCompare[wordIndex];

    console.log(inputToCompare);
    console.log('Selected word: ' + wordOne);
    console.log('Written word: ' + wordTwo);

    if (wordOne === wordTwo && wordOne !== undefined) {
      return 1;
    } else if (wordOne === undefined & wordTwo === undefined) {
      return 0;
    } else if (wordOne !== wordTwo) {
      return -2;
    } else if (wordOne.length !== wordTwo.length) {
      return -2;
    }
  }

  function evalLetters() {
    const evalInput = compareLetters();
    setScore((prevScore) => prevScore + evalInput);
  }

  return {
    setShuffledWords,
    scoreCounter,
    evalLetters,
  };
};

export const useGameInput = () => {
  const { scoreCounter } = useGameLogic();

  const {
    setCurrentIndex,
    setInputValue,
    setShuffledWords,
    setGameStart,
    wordIndex,
    setWordIndex,
  } = useContext(GameContext);
  const { selectedTopic } = useContext(TopicContext);

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreCounter();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
      setWordIndex(-1);
    }
  }

  function traverseArray() {
    setWordIndex((prevWordIndex) => prevWordIndex + 1);
    console.log(wordIndex);
  }

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
  }

  return {
    handleKeyDown,
    handleStartBtn,
    traverseArray,
  };
};

export default useGameLogic;
