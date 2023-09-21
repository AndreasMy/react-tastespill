/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';

export const UserSelectButton = () => {
  const {
    users,
    setSelectedUser,
    selectedUser,
    setUserSelected,
    userSelected,
  } = useContext(UsersContext);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserSelected(true);
  };

  const getFilteredUsers = () => {
    if (userSelected) {
      return users.filter((user) => user.userName === selectedUser.userName);
    }
    return users;
  };

  return (
    <div className='user-select-container'>
      <ul className='user-select-list'>
        {getFilteredUsers().map((user) => (
          <li key={user.id}>
            <button
              className='user-button'
              onClick={() => handleUserSelect(user)}
            >
              {user.userName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
