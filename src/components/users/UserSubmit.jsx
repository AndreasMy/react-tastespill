import useUserHelpers from '../../hooks/userHooks';
import { sendToStorage } from '../../helpers/localStorage';
import { useContext, useEffect } from 'react';
import { UsersContext } from '../../helpers/userData';

export const UserSubmit = () => {
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