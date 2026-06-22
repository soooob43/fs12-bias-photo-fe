'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteExchangeApi } from '@/api/detailApi';
import { useQueryClient } from '@tanstack/react-query';
import AlertButtonModal from '@/components/ui/AlertButtonModal/AlertButtonModal';

export default function DeniedModal({
  isOpen,
  page,
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

  //교환 취소 함수
  const handleDeleteExchange = async () => {
    try {
      setIsSubmitting(true);
      await deleteExchangeApi(exchangeOfferId);
      queryClient.invalidateQueries({ queryKey: ['exchangeList'] }); // 강제 캐시 무효화
      onClose();
    } catch (error) {
      console.error('교환 처리 중 에러 발생:', error);
      alert('요청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBuyer = page === 'buyer';

  return (
    <AlertButtonModal
      onClose={onClose}
      isOpen={isOpen}
      onClick={isBuyer ? handleDeleteExchange : handleDeleteExchange}
      btnName={isBuyer ? '취소하기' : '거절하기'}
      disabled={isSubmitting}
    >
      {page === 'buyer' ? (
        <div className="flex flex-col gap-4">
          <h2>교환 제시 취소</h2>
          <div className="flex flex-col gap-2">
            <p>
              [{grade} | {title}]
            </p>
            <p>교환 제시를 취소하시겠습니까?</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2>교환 제시 거절</h2>
          <div className="flex flex-col gap-2">
            <p>
              [{grade} | {title}]
            </p>
            <p>카드와의 교환을 거절하시겠습니까?</p>
          </div>
        </div>
      )}
    </AlertButtonModal>
  );
}
