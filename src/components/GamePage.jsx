/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../helpers/userData';
import { TopicContext } from './TopicSelection';
import useGameLogic, { useGameInput } from '../hooks/gameHooks';
import Timer from './Timer';
import { PlayerScoreList } from './Timer';
import React from 'react';

export const GameContext = React.createContext();

const DisplayWord = () => {
  const { shuffledWords, currentIndex, inputValue } = useContext(GameContext);
  const { recordTime } = useGameLogic();

  useEffect(() => {
    recordTime();
  }, [currentIndex]);

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
  const { selectedUser, setSelectedUser } = useContext(UsersContext);
  const { handleStartBtn } = useGameInput();

  function handleBackBtn() {
    setSelectedTopic(null);
    setSelectedUser(null);
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
  const {
    gameStart,
    timeLeft,
    score,
    setScore,
    scoreList,
    setTotalScore,
    setcorrectWordArr,
    setStoredScores,
    storedScores,
  } = useContext(GameContext);
  const { selectedUser } = useContext(UsersContext);
  const [gameOver, setGameOver] = useState(false);

  const sendOBJToStorage = (key, newScoreObj) => {
    // Get the existing scores for this user
    const existingScores = JSON.parse(localStorage.getItem(key)) || [];
    const updatedScores = [...existingScores, newScoreObj];
    localStorage.setItem(key, JSON.stringify(updatedScores));
  };

  const filterScoresByUser = () => {
    return storedScores.filter((score) => score.userID === selectedUser.id);
  };

  useEffect(() => {
    if (!timeLeft) {
      setGameOver(true);

      const totalScoreObj = {
        userID: selectedUser.id,
        userName: selectedUser.userName,
        userScore: score,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      };

      setTotalScore(totalScoreObj);
      setStoredScores((prevScoreList) => [...prevScoreList, totalScoreObj]);
      sendOBJToStorage('scores', totalScoreObj);

      //? Reset state
      setScore(0);
      setTotalScore(0);
      setcorrectWordArr([]);
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
          <PlayerScoreList
            filterScoresByUser={filterScoresByUser}
            setGameOver={setGameOver}
            gameOver={gameOver}
            scoreList={scoreList}
          />
        </div>
      )}
    </div>
  );
};

export default GameContainer;
