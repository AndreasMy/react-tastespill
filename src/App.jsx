import './App.css';
import { useState } from 'react';
import TopicSelection from './components/ThemeSelection';
import GamePage from './components/GamePage';
import topics from './data/elementData';
import CreateUser from './components/UserComponents';
import { UsersContext } from './data/userData.js';
import { TopicContext } from './components/ThemeSelection';
import { GameContext } from './components/GamePage';


function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };
  return (
    <>
      <UsersContext.Provider
        value={{ users, setUsers, selectedUser, setSelectedUser }}
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
                }}
              >
                <div>
                  <GamePage />
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
