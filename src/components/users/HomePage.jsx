import { NewUserForm } from './NewUserForm';
import { UserSelect } from './UserSelect';
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
import TopicSelection from '../topics/TopicSelection';
import BackButton from '../navigation/BackButton';

const HomePage = () => {
  const { userSelected } = useContext(UsersContext);
  //* useState
  //logic
  return (
    <div className='home-content-wrapper'>
      {userSelected === false ? (
        <>
          <h1>Welcome</h1>
          <NewUserForm />
          <UserSelect />
        </>
      ) : (
        <>
          <h1>Welcome</h1>
          <BackButton />
          <UserSelect />
          <TopicSelection />
        </>
      )}
    </div>
  );
};

export default HomePage;
