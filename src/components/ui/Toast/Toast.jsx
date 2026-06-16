'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

/*---------------------------
 포토카드 생성 제한 토스트 메세지 컴포넌트 작업 
  add : 2026.06.15 윤소정
----------------------------*/

const Toast = ({
  isOpen,
  message,
  onClose,
  duration = 3000,
  type = 'warning',
}) => {
  useEffect(() => {
    if (!isOpen || !duration) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        !
      </span>

      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Toast;
