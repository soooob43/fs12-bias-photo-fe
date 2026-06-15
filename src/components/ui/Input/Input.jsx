import styles from './Input.module.css';
const Input = ({ error = false, className = '', ...props }) => {
  return (
    <input
      className={`${styles.input} ${error ? styles.error : ''} ${className}`}
      {...props}
    />
  );
};

export default Input;
