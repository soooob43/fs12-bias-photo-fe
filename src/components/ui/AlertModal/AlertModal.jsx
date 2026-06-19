'use client';

import styles from './AlertModal.module.css';

const AlertModal = ({
  isOpen,
  onClose,
  children,
  modalClassName = '',
  contentClassName = '',
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.backdrop}>
      <div className={modalClassName ? modalClassName : styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={`${styles.content} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
