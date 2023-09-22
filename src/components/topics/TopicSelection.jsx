/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
export const TopicContext = React.createContext();

const TopicSelection = () => {
  const { topics, setSelectedTopic } = useContext(TopicContext);

  const TopicSelectBtn = ({ topic }) => {
    return (
      <button onClick={() => setSelectedTopic(topic)}>{topic.name}</button>
    );
  };

  return (
    <div className='main-topic-container'>
      <h2 className='topic-header'>Pick a topic</h2>
      <div className='topic-select-container'>
        {topics.map((topic) => (
          <TopicSelectBtn key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default TopicSelection;
