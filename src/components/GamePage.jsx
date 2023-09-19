/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../helpers/userData';
import { TopicContext } from './TopicSelection';
import useGameLogic, { useGameInput } from '../hooks/gameHooks';
import Timer from './Timer';
import { ScoreList } from './Timer';
import { sendToStorage } from '../helpers/localStorage';

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
  const { evalLetters } = useGameLogic();

  const preventBackSpaceAndEnter = (e) => {
    if (e.keyCode === 8 || e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => {
            const newValue = e.target.value.replace(/ /g, '');
            setInputValue(newValue);
            evalLetters(newValue);
          }}
          onKeyDown={(e) => {
            preventBackSpaceAndEnter(e);
            handleKeyDown(e);
          }}
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
      <p>Selected topic: {selectedTopic.name}</p>
      <button onClick={handleStartBtn}>Start</button>
    </div>
  );
};

const GameContainer = () => {
  const { gameStart, timeLeft, score, setScoreList, scoreList, setTotalScore } =
    useContext(GameContext);
  const { selectedUser } = useContext(UsersContext);

  const [gameOver, setGameOver] = useState(false);

  console.log(selectedUser);

  useEffect(() => {
    selectedUser.scoreList = scoreList;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? selectedUser : user
    );
    sendToStorage('users', [...updatedUsers]);
  }, [scoreList]);

  useEffect(() => {
    if (!timeLeft) {
      setGameOver(true);
      const totalScoreObj = {
        userScore: score,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      };

      setTotalScore(totalScoreObj);
      setScoreList((prevScoreList) => [...prevScoreList, totalScoreObj]);
    }
  }, [timeLeft]);

  return (
    <div>
      {gameStart ? (
        <div>
          <Timer setGameOver={setGameOver} />
          <Game />
        </div>
      ) : (
        <div>
          <GameEntry />
          <ScoreList setGameOver={setGameOver} gameOver={gameOver} />
        </div>
      )}
    </div>
  );
};

export default GameContainer;
