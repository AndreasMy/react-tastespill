import useUserHelpers from '../../hooks/userHooks';

const UserStats = () => {
  const { getFilteredUsers } = useUserHelpers();

  return (
    <div className='user-container'>
      {getFilteredUsers().map((user) => (
        <li key={user.id}>
          <div className='user-banner'>
            <div className='user-banner-content'>
              <h2 className='user-banner-name'>{user.userName}</h2>
              <div className='banner-score-container'>
                <p>High score:</p>
                <p>Score!</p>
              </div>
            </div>
          </div>
        </li>
      ))}
      <br />
      <p>Nice to have:</p>
      <p>Biggest word streak</p>
      <p>Number of games played</p>
    </div>
  );
};

export default UserStats;
