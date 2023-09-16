/* eslint-disable react/prop-types */
import { useState } from 'react';
import { UsersContext } from './data/userData.js';
import { TopicContext } from './components/TopicSelection';
import { GameContext } from './components/GamePage';

const Providers = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <UsersContext.Provider
      value={{ users, setUsers, selectedUser, setSelectedUser }}
    >
      <TopicContext.Provider
        value={{ selectedTopic, setSelectedTopic, handleSelectTopic }}
      >
        <GameContext.Provider
          value={{
            score,
            setScore,
            currentIndex,
            setCurrentIndex,
            shuffledWords,
            setShuffledWords,
            inputValue,
            setInputValue,
          }}
        >
          {children}
        </GameContext.Provider>
      </TopicContext.Provider>
    </UsersContext.Provider>
  );
};

export default Providers;