'use client';

import { useState } from 'react';
import PhotoCardSelectModal from '@/components/Modal/PhotoCardSelectModal/PhotoCardSelectModal';

export default function MyPhotoCardSellPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button>나의 포토카드 판매하기</button>
      <PhotoCardSelectModal
        isOpen={isOpen}
        onClose={handleClose}
        title="나의 포토카드 판매하기"
      />
    </>
  );
}
