import './App.css';
import { useState } from 'react';
import ThemeSelection from './components/ThemeSelection';
import GamePage from './components/GamePage';
import themes from './data/elementData';
import CreateUser from './components/UserComponents';
import { UsersContext } from './data/userData.js';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      <div>
        {selectedTheme ? (
          <div>
            <GamePage
              theme={selectedTheme}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
          </div>
        ) : (
          <div>
            <h2>Entry Page</h2>
            <CreateUser
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
            <ThemeSelection themes={themes} onSelectTheme={handleSelectTheme} />
          </div>
        )}
      </div>
    </UsersContext.Provider>
  );
}

export default App;
