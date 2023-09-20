/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Timer from './Timer';
import { UsersContext } from '../helpers/userData';
import { TopicContext } from './TopicSelection';
import { PlayerScoreList } from './Timer';
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

export const ScoreCounter = ({ score }) => {
  return (
    <div>
      <p>Player Score</p>
      <p> Score: {score ? score : 0}</p>
    </div>
  );
};

export const Game = ({
  lastTypedTime,
  setLastTypedTime,
  shuffledWords,
  score,
  setScore,
  setcorrectWordArr,
  correctWordArr,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const [timeDifference, setTimeDifference] = useState(null);

  const { selectedUser } = useContext(UsersContext);

  useEffect(() => {
    if (correctWordArr.length % 3 === 0 && correctWordArr.length !== 0) {
      setScore((prevScore) => prevScore + 10);
    }
  }, [correctWordArr, setScore]);

  function scoreByWords() {
    if (inputValue === shuffledWords[currentIndex]) {
      const currentTime = Date.now();
      const timeDifference = lastTypedTime
        ? (currentTime - lastTypedTime) / 1000
        : 0; // in seconds

      // Always calculate the time bonus since we have a starting point
      const timeBonusScore = Math.round(10 / (timeDifference || 1)); // We use || 1 to avoid dividing by zero just in case
      console.log(timeBonusScore);
      setScore((prevScore) => prevScore + 5 + timeBonusScore); // 5 for the correct word, plus the time bonus

      setLastTypedTime(currentTime);
      setcorrectWordArr([...correctWordArr, inputValue]);
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

  return (
    <div>
      <h2>Game on!</h2>
      <p>User: {selectedUser ? selectedUser.userName : 'None'} </p>

      <DisplayWord
        shuffledWords={shuffledWords}
        currentIndex={currentIndex}
        inputValue={inputValue}
      />
      <ScoreCounter
        timeDifference={timeDifference}
        setTimeDifference={setTimeDifference}
        score={score}
        setScore={setScore}
      />
      <GameInput
        currentIndex={currentIndex}
        evalLetters={evalLetters}
        scoreByWords={scoreByWords}
        setCurrentIndex={setCurrentIndex}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </div>
  );
};

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

const GameContainer = () => {
  const { setTotalScore } = useContext(GameContext);
  const { selectedUser } = useContext(UsersContext);

  const [gameOver, setGameOver] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [correctWordArr, setcorrectWordArr] = useState([]);

  const [storedScores, setStoredScores] = useState(() => {
    const storedScores = getFromStorage('scores');
    return storedScores || [];
  });

  const [lastTypedTime, setLastTypedTime] = useState(null);

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
            lastTypedTime={lastTypedTime}
            setLastTypedTime={setLastTypedTime}
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
            setLastTypedTime={setLastTypedTime}
            setGameStart={setGameStart}
            setShuffledWords={setShuffledWords}
          />
          <PlayerScoreList
            filterScoresByUser={filterScoresByUser}
            setGameOver={setGameOver}
            gameOver={gameOver}
          />
        </div>
      )}
    </div>
  );
};

export default GameContainer;
