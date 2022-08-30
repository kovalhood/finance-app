import styles from "./Header.module.css";
import { useMediaQuery } from "react-responsive";
import { Default, isDesktop } from "../../utils/mediaQuery";
import { Logo } from "../Logo/Logo";
import { ReactComponent as Logout } from './icons/logout.svg';
import defaultAvatar from './icons/user.png';
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import LogoutModal from '../LogoutModal';

export const Header = () => {
  const isLoggedIn = false;
  const Desktop = isDesktop(useMediaQuery);
// export default function Header() {
  // const loggedIn = useSelector(authSelectors.getIsLoggedIn);
  // const userName = useSelector(authSelectors.getUsername);
  // const userPicture = useSelector(authSelectors.getUserPicture);
  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = e => {
  //   e.preventDefault();
  //   setShowModal(prevVal => !prevVal);
  // };
 

  return (
    <div className={styles.wrapper}>
    <header className={styles.header}>
        <Logo />
        <div className={styles.user__menu}>
                <img
                  src={defaultAvatar}
                  alt="user avatar"
            className={styles.user__avatar} />
          <Button className={styles.logout__mobile}
            variant="primary"
            type="submit">
                  <Logout />
                </Button>
                <span type="button" className={styles.user__name}></span>
                <a href="/" className={styles.logout}> Выйти </a>
              </div>
      </header>
     
    </div>
  );
};

