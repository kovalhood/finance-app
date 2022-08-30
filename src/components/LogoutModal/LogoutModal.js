import React, { useEffect } from 'react';
import styles from './LogoutModal.module.css';
import { authOperations } from '../../redux/operations';
import { useDispatch } from 'react-redux';
import { ReactComponent as CloseIcon } from '../../images/close.svg';

const LogoutModal = ({ massage, closeModal }) => {
  useEffect(() => {
    const handleKeyDownEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDownEsc);
    return () => {
      window.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, [closeModal]);
  const dispatch = useDispatch();

  const onLogout = e => {
    dispatch(authOperations.logOut());
    closeModal(e);
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal(e);
    }
  };
  return (
    <div onClick={handleBackdropClick} className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <p className={styles.massage}>{massage}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onLogout} type="button">
            Да
          </button>
          <button onClick={closeModal} className={styles.button} type="button">
            Нет
          </button>
        </div>
        <CloseIcon onClick={closeModal} className={styles.closeButton} />
      </div>
    </div>
  );
};

export default LogoutModal;
