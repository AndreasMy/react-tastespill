/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { shuffleArray } from '../../helpers/utils';
import { UsersContext } from '../../helpers/userData';
import { TopicContext } from '../topics/TopicSelection';
import BackButton from '../navigation/BackButton';

export const GameEntry = ({
  setShuffledWords,
  setGameStart,
  setLastTypedTime,
}) => {
  const { selectedTopic } = useContext(TopicContext);
  const { selectedUser } = useContext(UsersContext);

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
    setLastTypedTime(Date.now());
  }

  return (
    <div>
      <BackButton />
      <h2>Game Page</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
      <p>Selected topic: {selectedTopic.name}</p>
      <button onClick={handleStartBtn}>Start</button>
    </div>
  );
};
