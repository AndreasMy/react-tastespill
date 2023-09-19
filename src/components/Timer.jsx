/* eslint-disable react/prop-types */
import { useEffect, useContext } from 'react';
import { GameContext } from './GamePage';

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

export const ScoreList = ({ gameOver, setGameOver }) => {
  const { score, scoreList, setScoreList } = useContext(GameContext);

  useEffect(() => {
    console.log(gameOver);
    console.log(scoreList);
  }, [gameOver, scoreList]);

  useEffect(() => {
    if (gameOver) {
      setGameOver(false);
    }
  }, [gameOver, setGameOver, setScoreList, score]);

  return (
    <div>
      <ul>
        {scoreList.map((userScore, index) => {
          return <li key={index}>{userScore}</li>;
        })}
      </ul>
    </div>
  );
};

export default Timer;
