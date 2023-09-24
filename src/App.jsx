import './App.css';

import React, { useState, useRef } from 'react';
import topics from './data/elementData';

import { getFromStorage } from './helpers/localStorage';
import { UsersContext } from './helpers/userData.js';
import { TopicContext } from './components/topics/TopicSelection';

import HomePage from './components/users/HomePage';
// import MainContainer from './components/users/MainContainer';

export const TimerContext = React.createContext();

function App() {
  const [gameStart, setGameStart] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userSelected, setUserSelected] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState('');

  const [users, setUsers] = useState(() => {
    const storedUsers = getFromStorage('users');
    return storedUsers || [];
  });

  const [storedScores, setStoredScores] = useState(() => {
    const storedScores = getFromStorage('scores');
    return storedScores || [];
  });

  const [storedUserStats, setStoredUserStat] = useState(() => {
    const storedStats = getFromStorage('stats');
    return storedStats || [];
  });

  const [userStats, setUserStat] = useState({
    id: '',
    highScore: 0,
    gamesPlayed: 0,
  });

  const [totalScore, setTotalScore] = useState({
    userScore: 0,
    userName: '',
    userID: '',
    uuid: '',
    date: '',
  });

  const containerRef = useRef(null);

  return (
    <>
      <UsersContext.Provider
        value={{
          users,
          setUsers,
          selectedUser,
          setSelectedUser,
          userName,
          setUserName,
          userSelected,
          setUserSelected,
          totalScore,
          setTotalScore,
          storedScores,
          setStoredScores,
          userStats,
          setUserStat,
          storedUserStats,
          setStoredUserStat,
          containerRef,
          gameStart,
          setGameStart,
        }}
      >
        <TopicContext.Provider
          value={{ topics, selectedTopic, setSelectedTopic }}
        >
          <div className='game-container'>
            <HomePage />
          </div>
        </TopicContext.Provider>
      </UsersContext.Provider>
    </>
  );
}

export default App;
