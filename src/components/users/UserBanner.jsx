import { TopicContext } from '../topics/TopicSelection';
import { useContext } from 'react';

import TopicSelection from '../topics/TopicSelection';
import GameContainer from '../game/GameContainer';

const UserBanner = () => {
  const { selectedTopic } = useContext(TopicContext);

  return (
    <>
      {selectedTopic ? (
        <GameContainer />
      ) : (
        <div className='topic-container'>
          <h2 className='topic-header'>Select a Topic</h2>
          <TopicSelection />
        </div>
      )}
    </>
  );
};

export default UserBanner;
