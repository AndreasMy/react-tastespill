import { useMemo } from 'react';
import useUserHelpers from '../../hooks/userHooks';

const UserHighScore = () => {
  const { filterUserHighScore } = useUserHelpers();
  const highScore = useMemo(() => filterUserHighScore(), [filterUserHighScore]);

  return <p>High score: {highScore} </p>;
};

export default UserHighScore;
