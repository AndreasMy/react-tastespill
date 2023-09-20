import { useContext, GameContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UsersContext } from '../helpers/userData';
import Timer from './Timer';
import { PlayerScoreList } from './Timer';
import { Game, GameEntry } from './GameComponents';

const GameContainer = () => {
  const {
    gameStart,
    timeLeft,
    score,
    setScore,
    scoreList,
    setTotalScore,
    setcorrectWordArr,
    setStoredScores,
    storedScores,
  } = useContext(GameContext);
  const { selectedUser } = useContext(UsersContext);
  const [gameOver, setGameOver] = useState(false);

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
          <Timer setGameOver={setGameOver} />
          <Game />
        </div>
      ) : (
        <div>
          <GameEntry />
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
