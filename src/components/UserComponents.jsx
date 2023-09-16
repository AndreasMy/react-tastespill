/* eslint-disable react/prop-types */

import { useContext } from 'react';

import { UsersContext } from '../helpers/userData';
import useUserHelpers from '../hooks/userHooks';

const UserSubmit = () => {
  const { userName, setUserName } = useContext(UsersContext);
  const { handleSubmit } = useUserHelpers();

  return (
    <div>
      <label htmlFor='createUser'>New player: </label>
      <form onSubmit={handleSubmit}>
        <input
          id='createUser'
          placeholder='Your Name'
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

const UserSelect = () => {
  const { users, setSelectedUser } = useContext(UsersContext);

  return (
    <>
      <ul>
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
    </>
  );
};

const CreateUser = ({ userName }) => {
  const { users, selectedUser } = useContext(UsersContext);

  return (
    <div>
      <p>Selected user: {selectedUser ? selectedUser.userName : 'None'}</p>
      {users.length < 1 ? (
        <UserSubmit userName={userName} />
      ) : (
        <div>
          <UserSelect />
          <UserSubmit />
        </div>
      )}
    </div>
  );
};

export default CreateUser;
