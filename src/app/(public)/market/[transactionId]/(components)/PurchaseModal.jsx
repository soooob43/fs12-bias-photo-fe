'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { purchasePhotocardApi } from '@/api/detailApi';
import AlertButtonModal from '@/components/ui/AlertButtonModal/AlertButtonModal';

export default function PurchaseModal({
  isOpen,
  onClose,
  transactionId,
  loginId,
  cardInfo,
  quantity,
}) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsSubmitting(true);
      await purchasePhotocardApi({
        transactionId: transactionId,
        buyerId: loginId,
        quantity: quantity,
      });
      router.replace(
        `/market/${transactionId}/result?isSuccess=true&grade=${encodeURIComponent(cardInfo.grade)}&title=${encodeURIComponent(cardInfo.title)}&quantity=${quantity}`,
      );
      onClose();
    } catch (error) {
      if (!loginId) {
        alert('로그인 후에 구매가 가능합니다.');
      }

      console.error('구매 요청 중 오류 발생: ', error);
      router.replace(
        `/market/${transactionId}/result?isSuccess=false&grade=${encodeURIComponent(cardInfo.grade)}&title=${encodeURIComponent(cardInfo.title)}&quantity=${quantity}`,
      );
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertButtonModal
      onClose={onClose}
      isOpen={isOpen}
      onClick={handlePurchase}
      disabled={isSubmitting}
      btnName="구매하기"
    >
      <div className="flex flex-col gap-4">
        <h2>포토카드 구매</h2>
        <div className="flex flex-col gap-2">
          <p>
            [{cardInfo.grade} | {cardInfo.title}]
          </p>
          <p>{quantity}장을 구매하시겠습니까?</p>
        </div>
      </div>
    </AlertButtonModal>
  );
}
