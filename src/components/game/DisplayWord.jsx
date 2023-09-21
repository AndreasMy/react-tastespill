/* eslint-disable react/prop-types */


export const DisplayWord = ({ shuffledWords, currentIndex, inputValue }) => {
  return (
    <>
      <h3>{shuffledWords[currentIndex]}</h3>
      <h4>{inputValue}</h4>
    </>
  );
};