// import createUser from '../helpers/userData';
import { useContext } from 'react';
import { UsersContext } from '../helpers/userData';

const useUserHelpers = () => {
  const { users, selectedUser, userSelected, storedScores } =
    useContext(UsersContext);

  const getFilteredUsers = () => {
    const userStats = sortUserByScore();
    //* Use form validation instead?
    if (userSelected) {
      return userStats.filter(
        (user) =>
          user.userName === selectedUser.userName && user.id === selectedUser.id
      );
    }
    return userStats;
  };

  const getFilteredUsersStats = () => {
    const userStats = sortUserByScore();
    return userStats;
  };

  const sendOBJToStorage = (key, data) => {
    // Get the existing scores for this user
    const existingScores = JSON.parse(localStorage.getItem(key)) || [];
    const updatedScores = [...existingScores, data];
    localStorage.setItem(key, JSON.stringify(updatedScores));
  };

  const filterScoresByUser = () => {
    return storedScores.filter((score) => score.userID === selectedUser.id);
  };

  const userStatsObj = () => {
    const userStatsArray = users.map((user) => {
      const scores = storedScores.filter((score) => score.userID === user.id);
      const highScores = scores.reduce((a, b) => Math.max(a, b.userScore), 0);
      const userName = user.userName;
      const timesPlayed = scores.length;
      const color = user.userColor;

      return {
        id: user.id,
        scoresArr: scores,
        highScore: highScores,
        userName: userName,
        timesPlayed: timesPlayed,
        userColor: color,
      };
    });
    console.log(userStatsArray);
    return userStatsArray;
  };

  const sortUserByScore = () => {
    const userStats = userStatsObj();
    const sortedUsers = userStats.sort((a, b) => b.highScore - a.highScore);
    console.log(sortedUsers);

    return sortedUsers;
  };
  sortUserByScore();

  const filterUserHighScore = () => {
    const scores = filterScoresByUser();
    console.log(scores);
    if (scores.length === 0) return 0;
    return scores.reduce((a, b) => Math.max(a, b.userScore), 0);
  };

  return {
    getFilteredUsersStats,
    getFilteredUsers,
    filterScoresByUser,
    sendOBJToStorage,
    filterUserHighScore,
    userStatsObj,
  };
};

export default useUserHelpers;
