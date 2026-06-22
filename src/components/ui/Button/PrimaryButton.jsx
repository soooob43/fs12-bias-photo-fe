'use client';

import styles from './PrimaryButton.module.css';

const PrimaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        ${styles.button}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
