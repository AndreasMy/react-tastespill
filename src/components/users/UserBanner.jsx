import { TopicContext } from '../topics/TopicSelection';
import { useContext } from 'react';

import TopicSelection from '../topics/TopicSelection';
import GameContainer from '../game/GameContainer';

const UserBanner = () => {
  const { selectedTopic } = useContext(TopicContext);

  return (
    <>
      {selectedTopic ? (
        <div className='main-game-container'>
          <GameContainer />
        </div>
      ) : (
        <TopicSelection />
      )}
    </>
  );
};

export default UserBanner;
