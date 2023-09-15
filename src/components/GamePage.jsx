/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { shuffleArray } from '../helpers/utils';
import { UsersContext } from '../data/userData';
import { TopicContext } from './ThemeSelection';
import useGameLogic from '../helpers/hooks';

import React from 'react';

export const GameContext = React.createContext();

const DisplayWord = () => {
  const { shuffledWords, currentIndex, inputValue } = useContext(GameContext);

  return (
    <>
      <h3>{shuffledWords[currentIndex]}</h3>
      <h4>{inputValue}</h4>
    </>
  );
};

const GameInput = () => {
  const { inputValue, setInputValue, setCurrentIndex } =
    useContext(GameContext);
  const { scoreCounter } = useGameLogic();

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreCounter();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

const GamePage = () => {
  const { selectedTopic, setSelectedTopic } = useContext(TopicContext);
  const { selectedUser } = useContext(UsersContext);
  const [gameStart, setGameStart] = useState(false);

  const { score, setShuffledWords } = useContext(GameContext);

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
  }

  function handleBackBtn() {
    setSelectedTopic(null);
  }

  return (
    <div>
      {gameStart ? (
        <div>
          <h2>Game on!</h2>
          <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
          <p> Score: {score ? score : 0}</p>
          <DisplayWord />
          <GameInput />
        </div>
      ) : (
        <div>
          <button onClick={handleBackBtn}>Back</button>
          <h2>Game Page</h2>
          <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
          <p>Selected selectedTopic: {selectedTopic.name}</p>
          <button onClick={handleStartBtn}>Start</button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
