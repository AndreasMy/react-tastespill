/* eslint-disable react/prop-types */
import CreateUser from "./UserComponents";

const ThemeSelection = ({ onSelectTheme }) => {
  return (
    <div>
      <h2>Entry Page</h2>
      <CreateUser />
      <button onClick={() => onSelectTheme("theme1")}>Select Theme</button>
    </div>
  );
};

export default ThemeSelection;
