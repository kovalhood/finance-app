import styles from './Header.module.scss';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { isDesktop } from '../../utils/mediaQuery';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { ReactComponent as Logout } from './icons/logoutIcon.svg';
import defaultAvatar from './icons/user.png';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import { authSelectors, authOperations } from '../../redux/operation';

export const Header = () => {
  const Desktop = isDesktop(useMediaQuery);
  const loggedIn = useSelector(authSelectors.getIsLoggedIn);
  const [showModal, setShowModal] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const email = useSelector(authSelectors.getEmail);
  // const name = useSelector(authSelectors.getName);
  const userPicture = useSelector(authSelectors.getUserPicture);
  const dispatch = useDispatch();
  const toggleModal = e => {
    e.preventDefault();
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Link to="/main-page">
            <Logo />
          </Link>
          {loggedIn ? (
            <div className={styles.user__menu}>
              <img
                src={userPicture ? userPicture : defaultAvatar}
                alt="user avatar"
                className={styles.user__avatar}
              />
              <span className={styles.user__name}>{email.split('@')[0]}</span>
              {dropdown && (
                <div className={styles.dropdown}>
                  <span className={styles.user_mail} title={email}>
                    {email}
                  </span>

                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => dispatch(authOperations.logOut())}
                  >
                    Log out
                  </button>
                </div>
              )}
              <button
                type="button"
                className={styles.button_logout_mobile}
                onClick={toggleModal}
              >
                <Logout />
              </button>
              <a
                href="/"
                className={styles.button_logout}
                onClick={toggleModal}
              >
                {' '}
                Exit
              </a>
            </div>
          ) : null}
        </header>
      </div>
      {showModal && (
        <Modal
          onClick={toggleModal}
          massage={'Do you really want to log out?'}
        />
      )}
    </div>
  );
};
export default Header;
