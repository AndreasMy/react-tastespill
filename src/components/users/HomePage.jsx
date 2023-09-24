import './styleUsers.css';
import { UserSelect } from './UserSelect';

import Footer from '../common/Footer';
import Header from './Header';

const HomePage = () => {

  return (
    <>
      <div className='home-content-wrapper'>
        <Header />
        <UserSelect />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
