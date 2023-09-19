import './App.css';
import React, { useState } from 'react';
import TopicSelection from './components/TopicSelection';
import GameContainer from './components/GamePage';
import topics from './data/elementData';
import CreateUser from './components/UserComponents';
import { getFromStorage } from './helpers/localStorage';
import { UsersContext } from './helpers/userData.js';
import { TopicContext } from './components/TopicSelection';
import { GameContext } from './components/GamePage';

export const TimerContext = React.createContext();

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, setUserName] = useState('');

  const [users, setUsers] = useState(() => {
    const storedUsers = getFromStorage('users');
    return storedUsers || [];
  });

  const [timeLeft, setTimeLeft] = useState(8);
  const [scoreList, setScoreList] = useState([]);

  

  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [gameStart, setGameStart] = useState(false);
  const [correctWordArr, setcorrectWordArr] = useState([]);

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
                  setScore,
                  score,
                  currentIndex,
                  setCurrentIndex,
                  shuffledWords,
                  setShuffledWords,
                  inputValue,
                  setInputValue,
                  gameStart,
                  setGameStart,
                  correctWordArr,
                  setcorrectWordArr,
                  timeLeft,
                  setTimeLeft,
                  scoreList,
                  setScoreList,
 
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
