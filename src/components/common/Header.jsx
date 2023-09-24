import React from 'react';
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';

import useUserHelpers from '../../hooks/userHooks';
import UserHighScore from '../game/HighScore';
import { NewUserForm } from '../users/NewUserForm';

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
                <h2
                  className='user-banner-name'
                  style={{ color: user.userColor }}
                >
                  {user.userName}
                </h2>
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
            <NewUserForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
