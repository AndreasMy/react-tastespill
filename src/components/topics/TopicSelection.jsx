/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
export const TopicContext = React.createContext();

const TopicSelection = () => {
  const { topics, setSelectedTopic } = useContext(TopicContext);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div className='topic-select-container'>
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onMouseEnter={() => setIsHovered(topic.id)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setSelectedTopic(topic)}
                className='topic-btn'
                style={{
                  backgroundColor:
                    isHovered === topic.id ? topic.color : topic.darkColor,
                }}
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
