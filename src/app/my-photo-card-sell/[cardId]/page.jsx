'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchAvailableCards } from '@/api/transactionApi';
import PhotoCardSellModal from '@/components/Modal/PhotoCardSellModal/PhotoCardSellModal';

export default function MyPhotoCardSellDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const { data, isPending, isError } = useQuery({
    queryKey: ['available-photo-cards'],
    queryFn: fetchAvailableCards,
  });
  const card = data?.data?.find(
    (item) => String(item.cardId) === String(params.cardId),
  );

  if (isPending) return <p>포토카드를 불러오는 중입니다.</p>;
  if (isError || !card) return <p>판매 가능한 포토카드를 찾지 못했습니다.</p>;

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
