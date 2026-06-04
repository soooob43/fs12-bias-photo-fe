'use client';

import { useEffect } from 'react';
import styles from './CommonModal.module.css';

export default function CommonModal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <section
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.dragHandle}
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
        />

        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
        >
          ×
        </button>
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}
