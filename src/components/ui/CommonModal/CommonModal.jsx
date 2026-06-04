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
    <div className={styles.backdrop}>
      <section className={styles.modal}>
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
