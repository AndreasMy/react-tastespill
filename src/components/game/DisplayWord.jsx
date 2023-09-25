/* eslint-disable react/prop-types */


export const DisplayWord = ({ shuffledWords, currentIndex,  }) => {
  return (
    <>
      <h1 className="game-word">{shuffledWords[currentIndex]}</h1>

    </>
  );
};