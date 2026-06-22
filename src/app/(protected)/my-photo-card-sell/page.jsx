'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhotoCardSelectModal from '@/components/Modal/PhotoCardSelectModal/PhotoCardSelectModal';

export default function MyPhotoCardSellPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <PhotoCardSelectModal
      isOpen={isOpen}
      onClose={handleClose}
      title="나의 포토카드 판매하기"
      onSelectCard={(card) => {
        setIsOpen(false);
        router.push(`/my-photo-card-sell/${card.cardId}`);
      }}
    />
  );
}
