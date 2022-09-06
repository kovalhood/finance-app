import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseModal } from '../../images/closeIcon.svg';
import styles from './Modal.module.scss';
import { authOperations } from '../../redux/operation';
import { useDispatch } from 'react-redux';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ massage, onClick }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClick(e);
    }
  };

  const dispatch = useDispatch();

  const onLogout = e => {
    dispatch(authOperations.logOut());
    onClick(e);
  };

  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        onClick(e);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return createPortal(
    <div onClick={handleBackdropClick} className={styles.backdrop}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeModalBtn}
          onClick={onClick}
        >
          <CloseModal />
        </button>
        <p className={styles.massage}>{massage}</p>
        <div className={styles.btnContainer}>
          <button className={styles.btn} type="button" onClick={onLogout}>
            Yes
          </button>
          <button className={styles.btn} type="button" onClick={onClick}>
            No
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
