'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMarketTransactionApi } from '@/api/detailApi';
import AlertButtonModal from '@/components/ui/AlertButtonModal/AlertButtonModal';

export default function DeleteTransaction({ isOpen, transactionId, onClose }) {
  const router = useRouter();

  // 취소 중 중복 요청 방지 관리
  const [isSubmitting, setIsSubmitting] = useState(false);

  //판매글 내리기 함수
  const handleDeleteTransaction = async () => {
    try {
      setIsSubmitting(true);

      await deleteMarketTransactionApi(transactionId);

      router.replace('/market');

      onClose();
    } catch (error) {
      console.error('삭제 처리 중 에러 발생:', error);
      alert('요청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertButtonModal
      onClose={onClose}
      isOpen={isOpen}
      onClick={handleDeleteTransaction}
      disabled={isSubmitting}
      btnName="판매내리기"
    >
      <div className="flex flex-col gap-5">
        <h2>포토카드 판매 내리기</h2>
        <p>정말로 판매를 중단하시겠습니까?</p>
      </div>
    </AlertButtonModal>
  );
}
