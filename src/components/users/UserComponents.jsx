/* eslint-disable react/prop-types */
import { useContext, } from 'react';
import { UsersContext } from '../../helpers/userData';


export const UserSelect = () => {
  const { users, setSelectedUser } = useContext(UsersContext);

  return (
    <div className='user-select-container'>
      <ul className='user-select-list'>
        {users.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => {
                setSelectedUser(user);
              }}
            >
              {user.userName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};




