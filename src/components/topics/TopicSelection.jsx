/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
export const TopicContext = React.createContext();

const TopicSelection = () => {
  const { topics, setSelectedTopic } = useContext(TopicContext);

  return (
    <>
      <div className='topic-select-container'>
        <h2 className='topic-header'>Pick a topic</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => setSelectedTopic(topic)}
                className='topic-btn'
                style={{ backgroundColor: topic.color }}
              >
                {topic.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TopicSelection;
