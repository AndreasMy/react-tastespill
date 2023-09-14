import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export const UsersContext = React.createContext();

const createUser = (userScore, userName) => {
  const id = uuidv4();
  const scoreList = [];
  const user = {
    id,
    userName,
    userScore,
    scoreList,
  };
  return user;
};

export default createUser;
