import useUserHelpers from '../../hooks/userHooks';

const HighScoreList = () => {
  const { getFilteredUsersStats } = useUserHelpers();

  return (
    <>
      <ul className='score-list-container'>
        {getFilteredUsersStats().map((user, index) => (
          <li className='score-list' key={user.id}>
            <div className='name-container'>
              <p className='score-content'>{user.userName}</p>
            </div>
            <p className='score-attribute'>HighScore: </p>
            <p className='score-content'>{user.highScore}</p>
            <p className='score-attribute'>Rank: </p>
            <p className='score-content'>{index + 1}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HighScoreList;
