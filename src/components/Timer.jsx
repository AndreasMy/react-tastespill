import { useEffect, useState, useContext } from 'react';
import { GameContext } from './GamePage';

const Timer = () => {
  const { setGameStart } = useContext(GameContext);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!timeLeft) {
      setGameStart(false);
      //* Add score to user score arr
      //? Save changes to localStorage
      //* Open a modal with game stats
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, setGameStart]);

  return <div>{timeLeft}</div>;
};

export default Timer;
