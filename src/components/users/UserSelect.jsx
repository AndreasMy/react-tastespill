/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
import { UserSelectButton } from './UserButton';
import { NewUserForm } from './NewUserForm';

export const UserSelect = ({ userName }) => {
  const { users, selectedUser } = useContext(UsersContext);
  console.log(selectedUser);
  return (
    <>

      {users.length < 1 ? (
        <NewUserForm userName={userName} />
      ) : (
        <UserSelectButton />
      )}
    </>
  );
};
