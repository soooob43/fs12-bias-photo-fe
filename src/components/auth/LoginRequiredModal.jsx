'use client';

import AlertModal from '../ui/AlertModal/AlertModal';

const LoginRequiredModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AlertModal isOpen={isOpen} onClose={onClose}>
      <h2>로그인이 필요합니다.</h2>
      <p>
        로그인 하시겠습니까?
        <br />
        다양한 서비스를 편리하게 이용하실 수 있습니다.
      </p>
    </AlertModal>
  );
};

export default LoginRequiredModal;
