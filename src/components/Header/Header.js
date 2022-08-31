import styles from "./Header.module.css";
// import { useMediaQuery } from "react-responsive";
// import { isDesktop } from "../../utils/mediaQuery";
import { Logo } from "../Logo/Logo";
import { ReactComponent as Logout } from './icons/logout.svg';
import defaultAvatar from './icons/user.png';
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import Modal from '../Modal';
import authSelectors from '../../redux/selectors/auth-selectors';

  export const Header = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const userEmail = useSelector(authSelectors.getUserEmail);
  const userPicture = useSelector(authSelectors.getUserPicture);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

    return (
     <div
        className={
          isLoggedIn ? styles.backgroundLoggedIn : styles.backgroundLoggedOut
        }>
    <div className={styles.wrapper}>
    <header className={styles.header}>
         <Logo />
        <div className={styles.user__menu}>
                <img
                  src={userPicture ? userPicture : defaultAvatar}
                  alt="user avatar"
            className={styles.user__avatar} />
          <Button onClick={toggleModal}  className={styles.logout__mobile}
            variant="primary"
            type ="submit">
                  <Logout />
                </Button>
                <span type="button" className={styles.user__name}>{userEmail}</span>
                <a href="/" onClick={toggleModal} className={styles.logout}> Выйти </a>
              </div>
         </header>
       { showModal && (
          <Modal
            closeModal={toggleModal}
            massage={'Do you really want to leave?'}
          />
        )}
        </div>
        </div>
   );
};

