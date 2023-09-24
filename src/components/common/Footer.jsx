import '../users/styleUsers.css';

import { useContext } from 'react';
import { TopicContext } from '../topics/TopicSelection';
import { UsersContext } from '../../helpers/userData';

const Footer = () => {
  const { selectedTopic } = useContext(TopicContext);
  const {selectedUser} = useContext(UsersContext)

  return (
    <>
      <div className='user-footer'
      style={{backgroundColor: selectedUser.userColor}}>
        <p>Topic: {selectedTopic ? selectedTopic.name : null}</p>
      </div>
    </>
  );
};

export default Footer;
