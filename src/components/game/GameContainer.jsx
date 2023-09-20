import { v4 as uuidv4 } from 'uuid';

import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../App';
import { UsersContext } from '../../helpers/userData';
import { getFromStorage } from '../../helpers/localStorage';
import Timer from './Timer';
import { Game } from './GamePage';
import { GameEntry } from './GameEntryPage';
import { PlayerScoreList } from './Timer';

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
  }, [timeLeft, selectedUser, score, setTotalScore]);

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
