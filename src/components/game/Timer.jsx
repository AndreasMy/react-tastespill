/* eslint-disable react/prop-types */
import { useEffect,  } from "react";

const Timer = ({ setGameOver, setGameStart, timeLeft, setTimeLeft }) => {
  const initialTime = 300;

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

  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
};



export default Timer;
