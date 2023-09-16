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
  } = useContext(GameContext);

  function scoreCounter() {
    const [...splitWord] = shuffledWords[currentIndex];

    let inputString = inputValue;
    inputString = inputString.replace(/\s/g, '');
    const [...inputToCompare] = inputString;
    console.log(inputString, shuffledWords[currentIndex]);

    if (inputString === shuffledWords[currentIndex]) {
      setScore((prevScore) => prevScore + 50);
    }
    console.log(splitWord);
    console.log(inputToCompare);
  }

  return {
    setShuffledWords,
    scoreCounter,
  };
};

export const useGameInput = () => {
  const { scoreCounter } = useGameLogic();

  const { setCurrentIndex, setInputValue, setShuffledWords, setGameStart } =
    useContext(GameContext);
  const { selectedTopic } = useContext(TopicContext);

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreCounter();
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
