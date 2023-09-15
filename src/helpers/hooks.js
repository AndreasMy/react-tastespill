import { useContext } from 'react';
import { GameContext } from '../components/GamePage';

function useGameLogic() {
  const {
    score,
    setScore,
    currentIndex,
    setCurrentIndex,
    shuffledWords,
    setShuffledWords,
    inputValue,
    setInputValue,
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

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreCounter();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }
  }

  return {
    handleKeyDown,
    setShuffledWords,
    shuffledWords,
    score,
    setScore,
    currentIndex,
    scoreCounter,
  };
}

export default useGameLogic;
