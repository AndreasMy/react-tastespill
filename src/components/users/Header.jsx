import React from 'react';
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';

import useUserHelpers from '../../hooks/userHooks';
import UserHighScore from '../game/HighScore';
import { NewUserForm } from './NewUserForm';

const Header = () => {
  const { getFilteredUsers } = useUserHelpers();
  const { userSelected } = useContext(UsersContext);

  return (
    <>
      {userSelected ? (
        getFilteredUsers().map((user) => (
          <React.Fragment key={user.id}>
            <header
              className='user-banner'
              style={{ backgroundColor: user.userColor }}
            >
              <div className='user-banner-content'>
                <h2 className='user-banner-name'>{user.userName}</h2>
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
