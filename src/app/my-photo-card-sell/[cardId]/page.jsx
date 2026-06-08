'use client';

import { useState } from 'react';
import PhotoCardSellModal from '@/components/Modal/PhotoCardSellModal/PhotoCardSellModal';

export default function MyPhotoCardSellDetailPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <PhotoCardSellModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="나의 포토카드 판매하기"
    />
  );
}
