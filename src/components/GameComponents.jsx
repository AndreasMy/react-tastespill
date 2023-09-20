/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../helpers/userData';
import { TopicContext } from './TopicSelection';
import Timer from './Timer';
import { PlayerScoreList } from './Timer';
import React from 'react';
import { getFromStorage } from '../helpers/localStorage';
import { shuffleArray } from '../helpers/utils';

export const GameContext = React.createContext();

export const DisplayWord = ({ shuffledWords, currentIndex, inputValue }) => {
  return (
    <>
      <h3>{shuffledWords[currentIndex]}</h3>
      <h4>{inputValue}</h4>
    </>
  );
};

export const GameInput = ({
  evalLetters,
  scoreByWords,
  setCurrentIndex,
  setInputValue,
  inputValue,
}) => {
  const preventBackSpaceAndEnter = (e) => {
    if (e.keyCode === 8 || e.keyCode === 13) {
      e.preventDefault();
    }
  };

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreByWords();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => {
            const newValue = e.target.value.replace(/ /g, '');
            setInputValue(newValue);
            evalLetters(newValue);
          }}
          onKeyDown={(e) => {
            preventBackSpaceAndEnter(e);
            handleKeyDown(e);
          }}
        />
      </form>
    </div>
  );
};

export const Game = ({
  shuffledWords,
  score,
  setScore,
  setcorrectWordArr,
  correctWordArr,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const { selectedUser } = useContext(UsersContext);

  useEffect(() => {
    if (correctWordArr.length % 3 === 0 && correctWordArr.length !== 0) {
      setScore((prevScore) => prevScore + 10);
    }
  }, [correctWordArr, setScore]);

  function scoreByWords() {
    if (inputValue === shuffledWords[currentIndex]) {
      setcorrectWordArr([...correctWordArr, inputValue]);
      setScore((prevScore) => prevScore + 5);
    }
  }

  function scoreByLetters(inputValue) {
    let wordOne = '';
    let wordTwo = '';

    const [...splitShuffledWord] = shuffledWords[currentIndex];
    const [...inputToCompare] = inputValue;

    const currentWordIndex = inputToCompare.length - 1;

    wordOne = splitShuffledWord[currentWordIndex];
    wordTwo = inputToCompare[currentWordIndex];

    if (wordOne === wordTwo && wordOne !== undefined) {
      return 1;
    } else if (wordOne === undefined && wordTwo === undefined) {
      return 0;
    } else if (wordOne !== wordTwo) {
      return -1;
    } else if (wordOne.length !== wordTwo.length) {
      return -1;
    }
  }

  function evalLetters(inputValue) {
    const evalInput = scoreByLetters(inputValue);
    setScore((prevScore) => prevScore + evalInput);
  }

  /*   const recordTime = () => {
    if (storedTime.instanceOne === null && storedTime.instanceTwo === null) {
      setStoredTime((prevState) => ({
        ...prevState,
        instanceOne: Date.now(),
      }));
    } else if (
      storedTime.instanceOne !== null &&
      storedTime.instanceTwo === null
    ) {
      setStoredTime((prevState) => ({
        ...prevState,
        instanceTwo: Date.now(),
      }));
    } else {
      return;
    }
  };
 */
  return (
    <div>
      <h2>Game on!</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>
      <p> Score: {score ? score : 0}</p>
      <DisplayWord
        shuffledWords={shuffledWords}
        currentIndex={currentIndex}
        inputValue={inputValue}
      />
      <GameInput
        evalLetters={evalLetters}
        scoreByWords={scoreByWords}
        setCurrentIndex={setCurrentIndex}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

export const GameEntry = ({ setShuffledWords, setGameStart }) => {
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
    //recordTime();
    // console.log(currentIndex);
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

const GameContainer = () => {
  const { scoreList, setTotalScore } = useContext(GameContext);
  const { selectedUser } = useContext(UsersContext);
  const [gameOver, setGameOver] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [correctWordArr, setcorrectWordArr] = useState([]);

  const [storedScores, setStoredScores] = useState(() => {
    const storedScores = getFromStorage('scores');
    return storedScores || [];
  });

  const sendOBJToStorage = (key, newScoreObj) => {
    // Get the existing scores for this user
    const existingScores = JSON.parse(localStorage.getItem(key)) || [];
    const updatedScores = [...existingScores, newScoreObj];
    localStorage.setItem(key, JSON.stringify(updatedScores));
  };

  const filterScoresByUser = () => {
    return storedScores.filter((score) => score.userID === selectedUser.id);
  };

  useEffect(() => {
    if (!timeLeft) {
      setGameOver(true);

      const totalScoreObj = {
        userID: selectedUser.id,
        userName: selectedUser.userName,
        userScore: score,
        id: uuidv4(),
        date: new Date().toLocaleDateString(),
      };

      setTotalScore(totalScoreObj);
      setStoredScores((prevScoreList) => [...prevScoreList, totalScoreObj]);
      sendOBJToStorage('scores', totalScoreObj);

      //? Reset state
      setScore(0);
      setTotalScore(0);
      setcorrectWordArr([]);
    }
  }, [timeLeft]);

  return (
    <div>
      {gameStart ? (
        <div>
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            setGameOver={setGameOver}
            setGameStart={setGameStart}
          />
          <Game
            shuffledWords={shuffledWords}
            score={score}
            setScore={setScore}
            correctWordArr={correctWordArr}
            setcorrectWordArr={setcorrectWordArr}
          />
        </div>
      ) : (
        <div>
          <GameEntry
            setGameStart={setGameStart}
            setShuffledWords={setShuffledWords}
          />
          <PlayerScoreList
            filterScoresByUser={filterScoresByUser}
            setGameOver={setGameOver}
            gameOver={gameOver}
            scoreList={scoreList}
          />
        </div>
      )}
    </div>
  );
};

export default GameContainer;
