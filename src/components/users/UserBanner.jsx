import useUserHelpers from '../../hooks/userHooks';

import { TopicContext } from '../topics/TopicSelection';
import { useContext } from 'react';

import TopicSelection from '../topics/TopicSelection';
import GameContainer from '../game/GameContainer';
import UserHighScore from '../game/HighScore';

const UserBanner = () => {
  const { getFilteredUsers } = useUserHelpers();
  const { selectedTopic } = useContext(TopicContext);

  return (
    <div className='user-container'>
      {getFilteredUsers().map((user) => (
        <div key={user.id}>
          <div className='user-banner'>
            <div className='user-banner-content'>
              <h2 className='user-banner-name'>{user.userName}</h2>
              <div className='banner-score-container'>
                <UserHighScore />
              </div>
            </div>
          </div>
          {selectedTopic ? (
            <div className='main-game-container'>
              <GameContainer />
            </div>
          ) : (
            <TopicSelection />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserBanner;
