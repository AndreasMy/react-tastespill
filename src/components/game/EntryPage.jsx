/* eslint-disable react/prop-types */
import './styleGame.css';
import { useContext } from 'react';
import { shuffleArray } from '../../helpers/utils';

import { TopicContext } from '../../App';
import { UsersContext } from '../../helpers/userData';

export const GameEntry = ({
  setShuffledWords,

  setLastTypedTime,
}) => {
  const { selectedTopic } = useContext(TopicContext);
  const { setGameStart } = useContext(UsersContext);

  function handleStartBtn() {
    setGameStart(true);
    const shuffledArray = shuffleArray(selectedTopic.words);
    setShuffledWords(shuffledArray);
    setLastTypedTime(Date.now());
  }

  return (
    <div className='game-entry'>
      <button
      className='game-start-btn'
        style={{ backgroundColor: selectedTopic.color, color: 'antiquewhite' }}
        onClick={handleStartBtn}
      >
        Start
      </button>
    </div>
  );
};
