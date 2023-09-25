import { useContext } from 'react';
import { TopicContext } from '../../App';
import { UsersContext } from '../../helpers/userData';

const BackButton = () => {
  const { setSelectedTopic } = useContext(TopicContext);
  const { setSelectedUser, setUserSelected, gameStart } =
    useContext(UsersContext);

  function handleBackBtn() {
    setUserSelected(false);
    setSelectedTopic(null);
    setSelectedUser(null);
  }

  return (
    <button
      disabled={gameStart}
      onClick={handleBackBtn}
      className='back-button'
    >
      Back
    </button>
  );
};

export default BackButton;
