/* eslint-disable react/prop-types */
export const ScoreCounter = ({ score }) => {
    return (
      <div>
        <p className="game-score"> Score: {score ? score : 0}</p>
      </div>
    );
  };