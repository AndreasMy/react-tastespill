/* eslint-disable react/prop-types */
import { useEffect, useContext, useCallback } from 'react';
// import { UsersContext } from '../helpers/userData';
import { GameContext } from './GameComponents';
import useGameLogic from '../hooks/gameHooks';

export const ScoreCounter = ({
  timeDifference,
  setTimeDifference,
  score,
  setScore,
}) => {
  const { storedTime } = useContext(GameContext);
  useGameLogic(setScore);

  //* Execute time bonus ----------------------------------------------//
  const triggerTimeBonus = useCallback(() => {
    const timeMS = storedTime.instanceTwo - storedTime.instanceOne;
    const timeS = timeMS / 1000;
    setTimeDifference(timeS);
  }, [setTimeDifference, storedTime.instanceOne, storedTime.instanceTwo]);

  //* Trigger time bonus ----------------------------------------------//
  useEffect(() => {
    if (storedTime.instanceOne !== null && storedTime.instanceTwo !== null) {
      triggerTimeBonus();
    }
  }, [storedTime, triggerTimeBonus]);

  //* Calculate time difference ---------------------------------------//
  useEffect(() => {
    if (timeDifference !== null) {
      const timeBonsuScore = Math.round(10 / timeDifference);
      setScore((prevScore) => prevScore + timeBonsuScore);
      //  setTimeDifference(null);
    }
  }, [setScore, timeDifference, setTimeDifference]);

  return (
    <div>
      <p>Player Score</p>
      <p> Score: {score ? score : 0}</p>
    </div>
  );
};

//-------------------------------------------------------------------//

/* export const Game = () => {
  const { selectedUser } = useContext(UsersContext);
  const [score, setScore] = useState(0);
  const [timeDifference, setTimeDifference] = useState(null);

  return (
    <div>
      <h2>Game on!</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
      <ScoreCounter
        score={score}
        setScore={setScore}
        initialScore={0}
        setTimeDifference={setTimeDifference}
        timeDifference={timeDifference}
      />
      <DisplayWord />
      <GameInput />
    </div>
  );
};
 */
