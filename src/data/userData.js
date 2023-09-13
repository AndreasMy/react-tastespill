import { v4 as uuidv4 } from "uuid";

export const users = [];


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

export function handleCreateUser(userScore, userName) {
    const newUser = createUser(userScore, userName)
    users.push(newUser);
    console.log(users)
}

export default createUser;
