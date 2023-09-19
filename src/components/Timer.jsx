/* eslint-disable react/prop-types */
import { useEffect, useContext, useMemo } from 'react';
import { GameContext } from './GamePage';
// import { UsersContext } from '../helpers/userData';

const Timer = ({ setGameOver }) => {
  const { setGameStart, timeLeft, setTimeLeft } = useContext(GameContext);
  const initialTime = 8;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTimeLeft]);

  useEffect(() => {
    if (!timeLeft) {
      setGameOver(true);
      setGameStart(false);
      setTimeLeft(initialTime);
      return;
    }
  }, [timeLeft, setGameOver, setGameStart, setTimeLeft]);

  return <div>{timeLeft}</div>;
};

export const PlayerScoreList = ({
  gameOver,
  setGameOver,

  filterScoresByUser,
}) => {
  useEffect(() => {
    if (gameOver) {
      setGameOver(false);
    }
  }, [gameOver, setGameOver]);

  const scores = useMemo(() => filterScoresByUser(), [filterScoresByUser]);

  return (
    <div>
      <ul>
        {scores.map((score, id) => {
          return <li key={id}>{score.userScore}</li>;
        })}
      </ul>
    </div>
  );
};

export default Timer;
