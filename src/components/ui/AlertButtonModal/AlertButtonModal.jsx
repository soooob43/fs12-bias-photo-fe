import PrimaryButton from '../Button/PrimaryButton';
import styles from './AlertButtonModal.module.css';

const AlertButtonModal = ({
  type = 'button',
  onClick,
  btnName,
  isOpen,
  onClose,
  disabled = false,
  children,
  ...rest
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.backdrop}>
      <div className={`${styles.modal} flex flex-col`}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div
          className={`${styles.content} flex flex-col flex-1 overflow-hidden`}
        >
          <div className="flex-1 overflow-y-auto pb-6">{children}</div>
          <div className="flex justify-center pb-8 flex-shrink-0">
            <PrimaryButton
              type={type}
              onClick={onClick}
              className={styles.confirmButton}
              disabled={disabled}
              {...rest}
            >
              {btnName}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertButtonModal;
