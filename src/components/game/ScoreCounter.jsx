/* eslint-disable react/prop-types */
export const ScoreCounter = ({ score }) => {
    return (
      <div>
        <p>Player Score</p>
        <p> Score: {score ? score : 0}</p>
      </div>
    );
  };