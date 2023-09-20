/* eslint-disable react/prop-types */
import React from 'react';
export const TopicContext = React.createContext();

const TopicSelection = ({ topics, onSelectTopic }) => {
  const TopicSelectBtn = ({ topic, onSelect }) => {
    return <button onClick={() => onSelect(topic)}>{topic.name}</button>;
  };

  return (
    <div className='topic-select-container'>
      {topics.map((topic) => (
        <TopicSelectBtn key={topic.id} topic={topic} onSelect={onSelectTopic} />
      ))}
    </div>
  );
};

export default TopicSelection;
