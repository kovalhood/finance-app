import styles from "./Header.module.css";
// import { useMediaQuery } from "react-responsive";
// import { isDesktop } from "../../utils/mediaQuery";
import { Logo } from "../Logo/Logo";
import { ReactComponent as Logout } from './icons/logout.svg';
import defaultAvatar from './icons/user.png';
import React, { useState } from 'react';
import Modal from '../Modal';


  export const Header = () => {
  const [showModal, setShowModal] = useState(false);

 const toggleModal = e => {
    e.preventDefault();
    setShowModal(prevShowModal => !prevShowModal);
  };

    return (
    <div>
    <div className={styles.wrapper}>
    <header>
      <Logo />
      <div className={styles.user__menu}>
      <img src={defaultAvatar}
      alt="user avatar"
      className={styles.user__avatar} />
      <button type="button" className={styles.button_logout_mobile}onClick={toggleModal} >
      <Logout />
      </button>
            <span className={styles.user__name}></span>
      <a href="/" className={styles.button_logout} onClick={toggleModal}> Exit</a></div>
      </header>
    </div>
    {showModal && (
          <Modal
            onClick={toggleModal}
            massage={'Do you really want to log out?'}
          />
  )
  }
  </div>
  )
}

export default Header;