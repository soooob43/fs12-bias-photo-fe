'use client';

import { useState } from 'react';
import VisibleIcon from '@/components/icons/VisibleIcon';
import InvisibleIcon from '@/components/icons/InvisibleIcon';
import styles from './PasswordInput.module.css';

const PasswordInput = ({ error = false, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        type={isVisible ? 'text' : 'password'}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
      />

      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ? (
          <VisibleIcon className={styles.icon} />
        ) : (
          <InvisibleIcon className={styles.icon} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
