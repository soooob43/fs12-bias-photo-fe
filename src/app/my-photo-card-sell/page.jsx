'use client';

import { useState } from 'react';
import PhotoCardSelectModal from '@/components/features/PhotoCardSelectModal/PhotoCardSelectModal';

export default function MyPhotoCardSellPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <PhotoCardSelectModal
      isOpen={isOpen}
      onClose={handleClose}
      title="나의 포토카드 판매하기"
    />
  );
}
