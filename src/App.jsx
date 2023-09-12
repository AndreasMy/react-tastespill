import "./App.css";
import { useState } from "react";
import ThemeSelection from "./components/ThemeSelection";
import GamePage from "./components/GamePage";


function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div>
      {selectedTheme ? (
        <GamePage
          theme={selectedTheme}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
      ) : (
        <ThemeSelection onSelectTheme={handleSelectTheme} />
      )}
    </div>
  );
}

export default App;
