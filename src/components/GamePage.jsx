/* eslint-disable react/prop-types */
const GamePage = ({ theme, setSelectedTheme }) => {
  function handleBackBtn() {
    setSelectedTheme(null);
  }

  return (
    <div>
      <button onClick={handleBackBtn}>Back</button>
      <h2>Game Page</h2>
      <p>Selected Theme: {theme}</p>
    </div>
  );
};

export default GamePage;