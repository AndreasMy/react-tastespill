
import { UserSelect } from './UserSelect';

import Footer from '../common/Footer';
import Header from '../common/Header';

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
