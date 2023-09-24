import '../users/styleUsers.css';

import { useContext } from 'react';
import { UsersContext } from '../../helpers/userData';

const Footer = () => {
  const { selectedUser, userSelected } = useContext(UsersContext);

  return (
    <>
      {userSelected ? (
        <footer
          className='user-footer'
          style={{ backgroundColor: selectedUser.userColor }}
        ></footer>
      ) : (
        <>
          <div className='user-footer'></div>
        </>
      )}
    </>
  );
};

export default Footer;
