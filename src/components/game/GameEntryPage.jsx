/* eslint-disable react/prop-types */
import { useContext } from "react";
import { shuffleArray } from "../../helpers/utils";
import { UsersContext } from "../../helpers/userData";
import { TopicContext } from "../topics/TopicSelection";


export const GameEntry = ({
    setShuffledWords,
    setGameStart,
    setLastTypedTime,
  }) => {
    const { selectedTopic, setSelectedTopic } = useContext(TopicContext);
    const { selectedUser, setSelectedUser } = useContext(UsersContext);
  
    function handleBackBtn() {
      setSelectedTopic(null);
      setSelectedUser(null);
    }
  
    function handleStartBtn() {
      setGameStart(true);
      const shuffledArray = shuffleArray(selectedTopic.words);
      setShuffledWords(shuffledArray);
      setLastTypedTime(Date.now());
    }
  
    return (
      <div>
        <button onClick={handleBackBtn}>Back</button>
        <h2>Game Page</h2>
        <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
        <p>Selected topic: {selectedTopic.name}</p>
        <button onClick={handleStartBtn}>Start</button>
      </div>
    );
  };