/* eslint-disable react/prop-types */
import React from 'react';


export const TopicContext = React.createContext();

const TopicSelectBtn = ({ topic, onSelect }) => {
  return <button onClick={() => onSelect(topic)}>{topic.name}</button>;
};

const TopicSelection = ({ topics, onSelectTopic }) => {
  return (
    <div>
      {topics.map((topic) => (
        <TopicSelectBtn key={topic.id} topic={topic} onSelect={onSelectTopic} />
      ))}
    </div>
  );
};

export default TopicSelection;
