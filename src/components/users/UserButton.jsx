/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
import useUserHelpers from '../../hooks/userHooks';
import UserBanner from './UserBanner';
//import UserHighScore from '../game/HighScore';

export const UserSelectButton = () => {
  const { setSelectedUser, selectedUser, setUserSelected } =
    useContext(UsersContext);

  const { getFilteredUsers } = useUserHelpers();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserSelected(true);
  };

  return (
    <div className='user-select-container'>
      {!selectedUser ? (
        <ul className='user-container user-select-list'>
          {getFilteredUsers().map((user, index) => (
            <li key={user.id}>
              <div className='user-button-wrapper'>
                <button
                  className='user-button'
                  onClick={() => handleUserSelect(user)}
                >
                  {user.userName}
                </button>

                <p className='user-stat'>High score: {user.highScore} </p>
                <p className='user-stat'>Games played: {user.timesPlayed} </p>
                <p className='user-stat'>Rank: {index + 1} </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <UserBanner />
      )}
    </div>
  );
};
