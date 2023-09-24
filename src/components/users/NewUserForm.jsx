import useUserHelpers from '../../hooks/userHooks';
import { sendToStorage } from '../../helpers/localStorage';
import { useContext, useEffect } from 'react';
import { UsersContext } from '../../helpers/userData';

export const NewUserForm = () => {
  const { userName, setUserName, users } = useContext(UsersContext);
  const { handleSubmit } = useUserHelpers();

  //* Send User to localStorage
  useEffect(() => {
    if (users) {
      sendToStorage('users', [...users]);
    }
  }, [users]);

  return (
    <div className='player-form-container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="createUser">Create New User: </label>
        <input
          id='createUser'
          placeholder='Your Name'
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button type='submit' className='user-submit-btn'>
          Submit
        </button>
      </form>
    </div>
  );
};
