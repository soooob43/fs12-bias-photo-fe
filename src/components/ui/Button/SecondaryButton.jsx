import React from 'react';
import styles from './SecondaryButton.module.css';

const SecondaryButton = ({ children, className = '', ...props }) => {
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

export default SecondaryButton;
