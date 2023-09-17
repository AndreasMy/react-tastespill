import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from './GamePage';
import { UsersContext } from '../helpers/userData';

export const TimerContext = React.createContext();

const Timer = () => {
  const { setGameStart, score } = useContext(GameContext);
  const [timeLeft, setTimeLeft] = useState(5);
  const { users } = useContext(UsersContext);

  useEffect(() => {
    if (!timeLeft) {
      const newScoreList = [];
      setGameStart(false);
      //* Add score to user score arr
      newScoreList.push(score);
      console.log(newScoreList);

      console.log(users);
      //updateScoreList(users.id, );

      //* Open a modal with game stats
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, setGameStart, score, users]);

  return <div>{timeLeft}</div>;
};

export default Timer;
