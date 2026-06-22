'use client';

import styles from './LoginRequiredModal.module.css';
import AlertModal from '../ui/AlertModal/AlertModal';
import PrimaryButton from '../ui/Button/PrimaryButton';

const LoginRequiredModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AlertModal isOpen={isOpen} onClose={onClose}>
      <h2>로그인이 필요합니다.</h2>
      <p>
        로그인 하시겠습니까?
        <br />
        다양한 서비스를 편리하게 이용하실 수 있습니다.
      </p>
      <PrimaryButton onClick={onConfirm} className={styles.confirmButton}>
        확인
      </PrimaryButton>
    </AlertModal>
  );
};

export default LoginRequiredModal;
