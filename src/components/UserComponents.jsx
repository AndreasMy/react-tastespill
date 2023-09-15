/* eslint-disable react/prop-types */

import { useState, useContext } from 'react';
import createUser from '../data/userData';
import { UsersContext } from '../data/userData';

const UserSubmit = () => {
  const [userName, setUserName] = useState('');
  const { setUsers, setSelectedUser } = useContext(UsersContext);

  const handleCreateUser = (userScore, userName) => {
    const newUser = createUser(userScore, userName);
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setSelectedUser(newUser);
    console.log(newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(0, userName);
    setUserName('');
  };

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
  console.log(selectedUser);
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
