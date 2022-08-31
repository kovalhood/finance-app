import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseModal } from '../../images/close.svg';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClick, text }) => {
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
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeModalBtn} onClick={onClick}>
          <CloseModal />
        </button>
        <p className={styles.text}>{text}</p>
        <div className={styles.btnContainer}>
          <button className={styles.btn} type="button" onClick={onClick}>
            Yes
          </button>
          <button className={styles.btn} type="button" onClick={onClick}>
            No
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
