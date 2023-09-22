import createUser from '../helpers/userData';
import { useContext } from 'react';
import { UsersContext } from '../helpers/userData';

const useUserHelpers = () => {
  const {
    setUsers,
    //setSelectedUser,
    userName,
    setUserName,
    users,
    selectedUser,
    userSelected,
  } = useContext(UsersContext);

  const handleCreateUser = (userScore, userName) => {
    const newUser = createUser(userScore, userName);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  //  setSelectedUser(newUser);
    console.log(newUser);
  };

  // in NewUserForm
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateUser(0, userName);
    setUserName('');
  };

  const getFilteredUsers = () => {
    //* Use form validation instead?
    if (userSelected) {
      return users.filter(
        (user) =>
          user.userName === selectedUser.userName && user.id === selectedUser.id
      );
    }
    return users;
  };

  return {
    handleSubmit,
    getFilteredUsers,
  };
};

export default useUserHelpers;
