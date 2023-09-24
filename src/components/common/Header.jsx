import React from 'react';
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';

import useUserHelpers from '../../hooks/userHooks';
import UserHighScore from '../game/HighScore';
import { NewUserForm } from '../users/NewUserForm';
import BackButton from './BackButton';

const Header = () => {
  const { getFilteredUsers } = useUserHelpers();
  const { userSelected } = useContext(UsersContext);

  return (
    <>
      {userSelected ? (
        getFilteredUsers().map((user) => (
          <React.Fragment key={user.id}>
            <header className='user-banner'>
              <div className='user-banner-content'>
              <BackButton />
                <h1
                  className='user-banner-name'
                  style={{ color: user.userColor }}
                >
                  {user.userName}
                </h1>

                <div className='banner-score-container'>
                  <UserHighScore />
                </div>
              </div>
            </header>
          </React.Fragment>
        ))
      ) : (
        <div className='user-banner'>
          <div className='user-banner-content'>
            <h2>Select Player</h2>
            <NewUserForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
