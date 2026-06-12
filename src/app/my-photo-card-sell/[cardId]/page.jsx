'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchAvailableCards } from '@/api/transactionApi';
import PhotoCardSellModal from '@/components/Modal/PhotoCardSellModal/PhotoCardSellModal';
import {
  DEV_MOCK_CARD_ID,
  DEV_MOCK_PHOTO_CARD,
} from '@/constants/mockPhotoCard';

export default function MyPhotoCardSellDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const isMockCard = String(params.cardId) === DEV_MOCK_CARD_ID;
  const { data, isPending, isError } = useQuery({
    queryKey: ['available-photo-cards'],
    queryFn: fetchAvailableCards,
    enabled: !isMockCard,
  });
  //발표를 위해서 판매 가능한 실카드가 0일 경우 테스트 카드 표시하도록 했음
  const card = isMockCard
    ? DEV_MOCK_PHOTO_CARD
    : data?.data?.find(
        (item) => String(item.cardId) === String(params.cardId),
      );

  if (!isMockCard && isPending) return <p>포토카드를 불러오는 중입니다.</p>;
  if (!isMockCard && (isError || !card)) {
    return <p>판매 가능한 포토카드를 찾지 못했습니다.</p>;
  }

  return (
    <PhotoCardSellModal
      card={card}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.push('/market');
      }}
      title="나의 포토카드 판매하기"
    />
  );
}
