import { v4 as uuidv4 } from 'uuid';

import { useContext, useState, useEffect } from 'react';
import { UsersContext } from '../../helpers/userData';

import useUserHelpers from '../../hooks/userHooks';

//import Timer from './Timer';
import { Game } from './GamePage';
import { GameEntry } from './EntryPage';
import { PlayerScoreList } from './ScoreList';
import HighScoreList from '../users/HighScoreList';

const GameContainer = () => {
  const { selectedUser, setTotalScore, setStoredScores, gameStart } =
    useContext(UsersContext);

  const [gameOver, setGameOver] = useState(false);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [score, setScore] = useState(0);

  //const [gameStart, setGameStart] = useState(false);

  const [timeLeft, setTimeLeft] = useState(120);
  const [correctWordArr, setcorrectWordArr] = useState([]);

  const [lastTypedTime, setLastTypedTime] = useState(null);

  const { filterScoresByUser, sendOBJToStorage } = useUserHelpers();

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
  }, [
    timeLeft,
    selectedUser,
    score,
    setTotalScore,
    setStoredScores,
    sendOBJToStorage,
  ]);

  return (
    <>
      {gameStart ? (
        <>
          <Game
            lastTypedTime={lastTypedTime}
            setLastTypedTime={setLastTypedTime}
            shuffledWords={shuffledWords}
            setShuffledWords={setShuffledWords}
            score={score}
            setScore={setScore}
            correctWordArr={correctWordArr}
            setcorrectWordArr={setcorrectWordArr}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            setGameOver={setGameOver}
          />
        </>
      ) : (
        <div className='game-entry-container'>
          <div className='game-col'>
            <PlayerScoreList
              filterScoresByUser={filterScoresByUser}
              setGameOver={setGameOver}
              gameOver={gameOver}
            />
          </div>
          <div className='game-entry-content'>
            <GameEntry
              setLastTypedTime={setLastTypedTime}
              setShuffledWords={setShuffledWords}
            />
          </div>
          <div className='game-col'>
            <HighScoreList />
          </div>
        </div>
      )}
    </>
  );
};

export default GameContainer;
