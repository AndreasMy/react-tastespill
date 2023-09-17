import { useContext, useEffect } from 'react';
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
  } = useContext(GameContext);

  useEffect(() => {
    if (correctWordArr.length % 3 === 0 && correctWordArr.length !== 0) {
      setScore((prevScore) => prevScore + 10);
    }

  }, [correctWordArr, setScore]);

  function setInputString() {
    let inputString = inputValue;
    inputString = inputString.replace(/\s/g, '');
    return inputString;
  }

  function scoreByWords() {
    const inputString = setInputString();

    if (inputString === shuffledWords[currentIndex]) {
      setcorrectWordArr([...correctWordArr, inputString]);
      setScore((prevScore) => prevScore + 5);
    }
  }

  function scoreByLetters() {
    const inputString = setInputString();

    let wordOne = '';
    let wordTwo = '';

    const [...splitShuffledWord] = shuffledWords[currentIndex];
    const [...inputToCompare] = inputString;

    const currentWordIndex = inputToCompare.length - 1;

    wordOne = splitShuffledWord[currentWordIndex];
    wordTwo = inputToCompare[currentWordIndex];

    console.log(inputToCompare);
    console.log('Selected word: ' + wordOne);
    console.log('Written word: ' + wordTwo);

    if (wordOne === wordTwo && wordOne !== undefined) {
      return 1;
    } else if ((wordOne === undefined) && (wordTwo === undefined)) {
      return 0;
    } else if (wordOne !== wordTwo) {
      return -2;
    } else if (wordOne.length !== wordTwo.length) {
      return -2;
    }
  }

  function evalLetters() {
    const evalInput = scoreByLetters();
    setScore((prevScore) => prevScore + evalInput);
  }

  return {
    setShuffledWords,
    scoreByWords,
    evalLetters,
  };
};

export const useGameInput = () => {
  const { scoreByWords } = useGameLogic();

  const { setCurrentIndex, setInputValue, setShuffledWords, setGameStart } =
    useContext(GameContext);
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
  }

  return {
    handleKeyDown,
    handleStartBtn,
  };
};

export default useGameLogic;
