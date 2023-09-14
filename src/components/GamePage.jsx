/* eslint-disable react/prop-types */
import { useState } from 'react';
import { shuffleArray } from '../helpers/utils';

const DisplayWord = ({ words, currentIndex, inputValue }) => {
  return (
    <>
      <h3>{words[currentIndex]}</h3>
      <h4>{inputValue}</h4>
    </>
  );
};

const GameInput = ({
  onSpacePress,
  inputValue,
  setInputvalue,
  words,
  currentIndex,
  score,
  setScore,
}) => {
  function scoreCounter() {
    const [...splitWord] = words[currentIndex];

    let inputString = inputValue;
    inputString = inputString.replace(/\s/g, '');
    const [...inputToCompare] = inputString;
    console.log(inputString, words[currentIndex]);

    if (inputString == words[currentIndex]) {
      setScore(score + 50);
    }
    console.log(splitWord);
    console.log(inputToCompare);
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 32) {
      scoreCounter();
      onSpacePress();
      setInputvalue('');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => {
            setInputvalue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

const GamePage = ({ theme, setSelectedTheme, selectedUser }) => {
  const [gameStart, setGameStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputvalue] = useState('');
  const [shuffledWords, setShuffledWords] = useState([]);
  const [score, setScore] = useState(0);

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(theme.words);
    setShuffledWords(shuffledArray);
  }

  function handleSpacePress() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    console.log(currentIndex + 1);
  }

  function handleBackBtn() {
    setSelectedTheme(null);
  }

  return (
    <div>
      {gameStart ? (
        <div>
          <h2>Game on!</h2>
          <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
          <p> Score: {score ? score : 0}</p>
          <DisplayWord words={shuffledWords} currentIndex={currentIndex} />
          <GameInput
            onSpacePress={handleSpacePress}
            words={shuffledWords}
            currentIndex={currentIndex}
            inputValue={inputValue}
            setInputvalue={setInputvalue}
            score={score}
            setScore={setScore}
          />
        </div>
      ) : (
        <div>
          <button onClick={handleBackBtn}>Back</button>
          <h2>Game Page</h2>
          <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
          <p>Selected Theme: {theme.name}</p>
          <button onClick={handleStartBtn}>Start</button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
