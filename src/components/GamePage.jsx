/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UsersContext } from '../helpers/userData';
import { TopicContext } from './TopicSelection';
import { useGameInput } from '../hooks/gameHooks';

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
  const { inputValue, setInputValue } = useContext(GameContext);
  const { handleKeyDown } = useGameInput();

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

const Game = () => {
  const { selectedUser } = useContext(UsersContext);
  const { score } = useContext(GameContext);

  return (
    <div>
      <h2>Game on!</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
      <p> Score: {score ? score : 0}</p>
      <DisplayWord />
      <GameInput />
    </div>
  );
};

const GameEntry = () => {
  const { selectedTopic, setSelectedTopic } = useContext(TopicContext);
  const { selectedUser } = useContext(UsersContext);
  const { handleStartBtn } = useGameInput();

  function handleBackBtn() {
    setSelectedTopic(null);
  }

  return (
    <div>
      <button onClick={handleBackBtn}>Back</button>
      <h2>Game Page</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
      <p>Selected selectedTopic: {selectedTopic.name}</p>
      <button onClick={handleStartBtn}>Start</button>
    </div>
  );
};

const GameContainer = () => {
  const { gameStart } = useContext(GameContext);

  return (
    <div>
      {gameStart ? (
        <div>
          <Game />
        </div>
      ) : (
        <div>
          <GameEntry />
        </div>
      )}
    </div>
  );
};

export default GameContainer;
