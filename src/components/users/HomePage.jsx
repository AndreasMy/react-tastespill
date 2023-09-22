import './styleUsers.css';

import { NewUserForm } from './NewUserForm';
import { UserSelect } from './UserSelect';
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
// import TopicSelection from '../topics/TopicSelection';
import BackButton from '../common/BackButton';
import Footer from '../common/Footer';

const HomePage = () => {
  const { userSelected } = useContext(UsersContext);
  //* useState
  //logic
  return (
    <div className='home-main-wrapper'>
      {userSelected === false ? (
        <div className='home-content-wrapper'>
          <NewUserForm />
          <UserSelect />

        </div>
      ) : (
        <div className='home-content-wrapper'>
          <BackButton />
          <UserSelect />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default HomePage;