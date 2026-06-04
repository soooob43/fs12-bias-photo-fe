'use client';

import { useState } from 'react';
import CommonModal from '@/components/ui/CommonModal/CommonModal';

export default function MyPhotoCardSellPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <main
      style={{ minHeight: '100vh', padding: '40px', background: '#ffffff' }}
    >
      <button type="button" onClick={() => setIsOpen(true)}>
        나의 포토카드 판매하기
      </button>

      <CommonModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>여기에 아래 내용 들어갑니다</p>
      </CommonModal>
    </main>
  );
}
