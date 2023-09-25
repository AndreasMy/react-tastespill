/* eslint-disable react/prop-types */

export const GameInput = ({
  evalLetters,
  scoreByWords,
  setCurrentIndex,
  setInputValue,
  inputValue,
}) => {
  const preventBackSpaceAndEnter = (e) => {
    if (e.keyCode === 8 || e.keyCode === 13) {
      e.preventDefault();
    }
  };

  function handleKeyDown(event) {
    if (event.key === ' ') {
      scoreByWords();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setInputValue('');
    }
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className='game-input'
          type='text'
          value={inputValue}
          autoFocus
          onChange={(e) => {
            const newValue = e.target.value.replace(/ /g, '');
            setInputValue(newValue);
            evalLetters(newValue);
          }}
          onKeyDown={(e) => {
            preventBackSpaceAndEnter(e);
            handleKeyDown(e);
          }}
        />
      </form>
    </>
  );
};
