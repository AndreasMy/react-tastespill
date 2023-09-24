import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export const UsersContext = React.createContext();

const createUser = (userScore, userName) => {
  const randomColor = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  let h = randomColor(10, 360).toFixed(2);
  let s = randomColor(90, 100).toFixed(2);
  let l = randomColor(65, 70).toFixed(2);

  const id = uuidv4();
  const userScoreList = [];
  const color = `hsl(${h}, ${s}%, ${l}%) `;
  const user = {
    id,
    userName,
    userScore,
    userScoreList,
    userColor: color,
  };
  return user;
};

export default createUser;
