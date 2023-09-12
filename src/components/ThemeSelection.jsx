/* eslint-disable react/prop-types */
import CreateUser from "./UserComponents";


const ThemeSelectBtn = ({ theme, onSelect }) => {
  return <button onClick={() => onSelect(theme)}>{theme.name}</button>;
};

const ThemeSelection = ({themes,  onSelectTheme }) => {
  return (
    <div>
      <h2>Entry Page</h2>
      <CreateUser />
      <div>
        {themes.map((theme) => (
          <ThemeSelectBtn
            key={theme.id}
            theme={theme}
            onSelect={onSelectTheme}
          />
        ))}
      </div>


    </div>
  );
};

export default ThemeSelection;
