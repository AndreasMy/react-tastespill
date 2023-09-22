import useUserHelpers from '../../hooks/userHooks';

import GameContainer from '../game/GameContainer';

const UserBanner = () => {
  const { getFilteredUsers } = useUserHelpers();

  return (
    <div className='user-container'>
      {getFilteredUsers().map((user) => (
        <div key={user.id}>
          <div className='user-banner'>
            <div className='user-banner-content'>
              <h2 className='user-banner-name'>{user.userName}</h2>
              <div className='banner-score-container'>
                <p>High score:</p>
                <p>Score!</p>
              </div>
            </div>
          </div>
          <div className='main-game-container'>
            <GameContainer />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBanner;
