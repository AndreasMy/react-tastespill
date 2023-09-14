/* eslint-disable react/prop-types */

import { useState, useContext } from 'react';
import createUser from '../data/userData';
import { UsersContext } from '../data/userData';

const UserSubmit = () => {
  const [userName, setUserName] = useState('');
  const { users, setUsers } = useContext(UsersContext);
  console.log(users);

  function handleCreateUser(userScore, userName) {
    const newUser = createUser(userScore, userName);
    setUsers([...users, newUser]);
  }

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

const UserSelect = ({ setSelectedUser }) => {
  const { users } = useContext(UsersContext);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => setSelectedUser(user.userName)}>
              {user.userName}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const CreateUser = ({
  userName,
  setUserName,
  selectedUser,
  setSelectedUser,
}) => {
  const { users } = useContext(UsersContext);
  return (
    <div>
      {users.length < 1 ? (
        <UserSubmit userName={userName} setUserName={setUserName} />
      ) : (
        <div>
          <UserSelect
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <UserSubmit userName={userName} setUserName={setUserName} />
        </div>
      )}
    </div>
  );
};

export default CreateUser;
