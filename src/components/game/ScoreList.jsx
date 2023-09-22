/* eslint-disable react/prop-types */
import { useEffect, useMemo } from 'react';

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
