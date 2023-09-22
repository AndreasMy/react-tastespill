import '../users/styleUsers.css';

import { useContext } from 'react';
import { TopicContext } from '../topics/TopicSelection';

const Footer = () => {
  const { selectedTopic } = useContext(TopicContext);

  return (
    <>
      <div className='user-footer'>
        <p>Topic: {selectedTopic ? selectedTopic.name : null}</p>
      </div>
    </>
  );
};

export default Footer;
