/* eslint-disable react/prop-types */
import './styleGame.css'
import { useContext } from 'react';
import { shuffleArray } from '../../helpers/utils';

import { TopicContext } from '../topics/TopicSelection';

export const GameEntry = ({
  setShuffledWords,
  setGameStart,
  setLastTypedTime,
}) => {
  const { selectedTopic } = useContext(TopicContext);

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
    setLastTypedTime(Date.now());
  }

  return (
    <div className='game-entry'>
      <button onClick={handleStartBtn}>Start</button>
    </div>
  );
};
