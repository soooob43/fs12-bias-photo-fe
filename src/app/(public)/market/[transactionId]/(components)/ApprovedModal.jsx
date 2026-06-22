'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { acceptExchangeOfferApi } from '@/api/detailApi';
import { useQueryClient } from '@tanstack/react-query';
import AlertButtonModal from '@/components/ui/AlertButtonModal/AlertButtonModal';

export default function ApprovedModal({
  isOpen,
  grade,
  title,
  transactionId,
  exchangeOfferId,
  onClose,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 취소 중 중복 요청 방지 관리
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccept = async () => {
    try {
      setIsSubmitting(true);
      // API 함수가 요구하는 규격대로 데이터를 객체에 담아 호출합니다.
      await acceptExchangeOfferApi({
        transactionId,
        exchangeOfferId,
      });

      queryClient.invalidateQueries({ queryKey: ['exchangeList'] }); // 강제 캐시 무효화
      router.replace('/my-gallery');
      onClose();
    } catch (error) {
      alert(error.message || '교환 수락 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertButtonModal
      onClose={onClose}
      isOpen={isOpen}
      onClick={handleAccept}
      btnName="승인하기"
      disabled={isSubmitting}
    >
      <div className="flex flex-col gap-4">
        <h2>교환 제시 승인</h2>
        <div className="flex flex-col gap-2">
          <p>
            [{grade} | {title}]
          </p>
          <p>카드와의 교환을 승인하시겠습니까?</p>
        </div>
      </div>
    </AlertButtonModal>
  );
}
