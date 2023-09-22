/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
import useUserHelpers from '../../hooks/userHooks';
import UserBanner from './UserBanner';

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
          {getFilteredUsers().map((user) => (
            <li key={user.id}>
              <div className='user-button-wrapper'>
                <button
                  className='user-button'
                  onClick={() => handleUserSelect(user)}
                >
                  {user.userName}
                </button>
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
