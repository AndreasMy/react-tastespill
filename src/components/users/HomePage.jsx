/* eslint-disable react/no-unescaped-entities */
import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';
import { UserSelect } from './UserSelect';

import Footer from '../common/Footer';
import Header from '../common/Header';

const HomePage = () => {
  const { users } = useContext(UsersContext);

  return (
    <>
      {users.length > 0 ? (
        <div className='home-content-wrapper'>
          <Header />
          <UserSelect />
          <Footer />
        </div>
      ) : (
        <div className='home-content-wrapper'>
          <Header />
          <h2 style={{color: 'grey'}}>You haven't added any users :/</h2>
          <Footer />
        </div>
      )}
    </>
  );
};

export default HomePage;
