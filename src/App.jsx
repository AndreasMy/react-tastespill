import './App.css';
import React, { useState } from 'react';
import topics from './data/elementData';
import { getFromStorage } from './helpers/localStorage';
import { UsersContext } from './helpers/userData.js';
import { TopicContext } from './components/topics/TopicSelection';

import CreateUser from './components/users/UserComponents';
import TopicSelection from './components/topics/TopicSelection';
import GameContainer from './components/game/GameContainer';

export const TimerContext = React.createContext();
export const GameContext = React.createContext();

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState(() => {
    const storedUsers = getFromStorage('users');
    return storedUsers || [];
  });

  const [totalScore, setTotalScore] = useState({
    userScore: 0,
    userName: '',
    userID: '',
    uuid: '',
    date: '',
  });

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

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
        }}
      >
        <TopicContext.Provider value={{ selectedTopic, setSelectedTopic }}>
          <div>
            {selectedTopic ? (
              <GameContext.Provider
                value={{
                  totalScore,
                  setTotalScore,
                }}
              >
                <div>
                  <GameContainer />
                </div>
              </GameContext.Provider>
            ) : (
              <div>
                <h2>Entry Page</h2>
                <CreateUser />
                <TopicSelection
                  topics={topics}
                  onSelectTopic={handleSelectTopic}
                />
              </div>
            )}
          </div>
        </TopicContext.Provider>
      </UsersContext.Provider>
    </>
  );
}

export default App;
