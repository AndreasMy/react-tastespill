/* eslint-disable react/prop-types */
import { useEffect, useMemo,  } from 'react';

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
    <>
      <ul className='score-list-container'> 
        {scores.map((score, id) => {
          return (
            <>
              <li className='score-list' key={id}>
                <p className='score-attribute'>Score: </p>
                <p className='score-content'>{score.userScore}pts</p>
                <p className='score-attribute'>Date: </p>
                <p className='score-content'>{score.date}</p>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};
