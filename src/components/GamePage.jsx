/* eslint-disable react/prop-types */
import { useState } from "react";
import { shuffleArray } from "../modules/utils";

const DisplayWord = ({ words, currentIndex }) => {
  return <h3>{words[currentIndex]}</h3>;
};

const GameInput = ({ onSpacePress, inputValue, setInputvalue }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 32) {
      console.log("Next!");
      onSpacePress();
      setInputvalue("");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputvalue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

const GamePage = ({ theme, setSelectedTheme }) => {
  const [gameStart, setGameStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputvalue] = useState("");
  const [shuffledWords, setShuffledWords] = useState([]);

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(theme.words);
    setShuffledWords(shuffledArray);
    console.log(shuffledArray);
  }

  function handleSpacePress() {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  function handleBackBtn() {
    setSelectedTheme(null);
  }

  //* Should be moved to game component?

  return (
    <div>
      {gameStart ? (
        <div>
          <h2>Game on!</h2>
          <DisplayWord words={shuffledWords} currentIndex={currentIndex} />
          <GameInput
            onSpacePress={handleSpacePress}
            inputValue={inputValue}
            setInputvalue={setInputvalue}
          />
        </div>
      ) : (
        <div>
          <button onClick={handleBackBtn}>Back</button>
          <h2>Game Page</h2>
          <p>Selected Theme: {theme.name}</p>
          <button onClick={handleStartBtn}>Start</button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
