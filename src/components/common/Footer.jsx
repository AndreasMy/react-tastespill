import '../users/styleUsers.css';

import { useContext } from 'react';
import { TopicContext } from '../topics/TopicSelection';

const Footer = () => {
  const { selectedTopic } = useContext(TopicContext);

  return (
    <>
      {selectedTopic ? (
        <footer className='user-footer'>
          <h2 className='footer-topic' style={{ color: selectedTopic.color }}>
            {selectedTopic.name}{' '}
          </h2>
        </footer>
      ) : (
        <>
          <footer className='user-footer'></footer>
        </>
      )}
    </>
  );
};

export default Footer;
