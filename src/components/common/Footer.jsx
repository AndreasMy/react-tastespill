import '../users/styleUsers.css';

import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';

const Footer = () => {
  const { userSelected } = useContext(UsersContext);

  return (
    <>
      {userSelected ? (
        <footer className='user-footer'></footer>
      ) : (
        <>
          <div className='user-footer'></div>
        </>
      )}
    </>
  );
};

export default Footer;
