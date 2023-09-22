import { useContext } from 'react';
import { TopicContext } from '../topics/TopicSelection';
import { UsersContext } from '../../helpers/userData';

const BackButton = () => {
  const { setSelectedTopic } = useContext(TopicContext);
  const { setSelectedUser, setUserSelected } = useContext(UsersContext);

  function handleBackBtn() {
    setUserSelected(false);
    setSelectedTopic(null);
    setSelectedUser(null);
  }

  return <button onClick={handleBackBtn} className='back-button'>Back</button>;
};

export default BackButton;
