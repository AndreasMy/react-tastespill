import useUserHelpers from '../../hooks/userHooks';

import { TopicContext } from '../topics/TopicSelection';
import React, { useContext } from 'react';

import TopicSelection from '../topics/TopicSelection';
import GameContainer from '../game/GameContainer';
import UserHighScore from '../game/HighScore';
import Footer from '../common/Footer';

const UserBanner = () => {
  const { getFilteredUsers } = useUserHelpers();
  const { selectedTopic } = useContext(TopicContext);

  return (
    <div className='user-container'>
      {getFilteredUsers().map((user) => (
        <React.Fragment key={user.id}>
          <div
            className='user-banner'
            style={{ backgroundColor: user.userColor }}
          >
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
        </React.Fragment>
      ))}
      <Footer />
    </div>
  );
};

export default UserBanner;
