/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
import { UserSelectButton } from './UserButton';

export const UserSelect = () => {
  const { selectedUser } = useContext(UsersContext);
  console.log(selectedUser);
  return (
    <>
      <UserSelectButton />
    </>
  );
};
