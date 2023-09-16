import createUser from '../helpers/userData';
import { useContext } from 'react';
import { UsersContext } from '../helpers/userData';

const useUserHelpers = () => {
  const { setUsers, setSelectedUser, userName, setUserName } =
    useContext(UsersContext);

  const handleCreateUser = (userScore, userName) => {
    const newUser = createUser(userScore, userName);
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setSelectedUser(newUser);
    console.log(newUser);
  };

  // in UserSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(0, userName);
    setUserName('');
  };

  return {
    handleSubmit,
  };
};

export default useUserHelpers;
