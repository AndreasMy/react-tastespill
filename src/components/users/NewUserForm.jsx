// import useUserHelpers from '../../hooks/userHooks';
import { sendToStorage } from '../../helpers/localStorage';
import { useContext, useEffect } from 'react';
import { UsersContext } from '../../helpers/userData';

import createUser from '../../helpers/userData';

export const NewUserForm = () => {
  const { userName, setUserName, users, setUsers, containerRef } =
    useContext(UsersContext);
  //const {} = useUserHelpers();

  //* Send User to localStorage
  useEffect(() => {
    if (users) {
      sendToStorage('users', [...users]);
    }
  }, [users]);

  const handleCreateUser = (userScore, userName) => {
    const newUser = createUser(userScore, userName);
    setUsers((prevUsers) => [...prevUsers, newUser]);

    console.log(newUser);
    const container = containerRef.current;

    // Allows for some time to render before scrolling
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 100);
    }
  };

  // in NewUserForm
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(0, userName);
    setUserName('');
  };

  return (
    <div className='player-form-container'>
      <label htmlFor='createUser'>New Player: </label>
      <div className='label-form-group'>
        <form onSubmit={handleSubmit}>
          <input
            id='createUser'
            placeholder='Your Name'
            type='text'
            value={userName}
            onChange={(e) => {
              // minimal placeholder validation
              let newValue = e.target.value.replace(/[^a-zA-Z]/g, '');
              newValue = newValue.substring(0, 10);
              setUserName(newValue);
            }}
          ></input>
          <button type='submit' className='user-submit-btn'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
