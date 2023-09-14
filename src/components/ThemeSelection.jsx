/* eslint-disable react/prop-types */


const ThemeSelectBtn = ({ theme, onSelect }) => {
  return <button onClick={() => onSelect(theme)}>{theme.name}</button>;
};

const ThemeSelection = ({ themes, onSelectTheme }) => {
  return (
    <div>
      {themes.map((theme) => (
        <ThemeSelectBtn key={theme.id} theme={theme} onSelect={onSelectTheme} />
      ))}
    </div>
  );
};

export default ThemeSelection;
