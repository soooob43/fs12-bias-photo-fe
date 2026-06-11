'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { purchasePhotocardApi } from '@/api/detailApi';

export default function PurchaseModal({
  onClose,
  transactionId,
  loginId,
  cardInfo,
  quantity,
}) {
  const router = useRouter();

  const handlePurchase = async () => {
    try {
      await purchasePhotocardApi({
        transactionId: transactionId,
        buyerId: loginId,
        quantity: quantity,
      });
      router.push(
        `/market/${transactionId}/result?isSuccess=true&grade=${encodeURIComponent(cardInfo.grade)}&title=${encodeURIComponent(cardInfo.title)}&quantity=${quantity}`,
      );
      onClose();
    } catch (error) {
      if (!loginId) {
        alert('로그인 후에 구매가 가능합니다.');
        return onClose();
      }

      console.error('구매 요청 중 오류 발생: ', error);

      router.push(
        `/market/${transactionId}/result?isSuccess=false&grade=${encodeURIComponent(cardInfo.grade)}&title=${encodeURIComponent(cardInfo.title)}&quantity=${quantity}`,
      );
    }
  };

  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[22rem] p-[4rem] fixed z-50 flex flex-col items-center justify-between rounded-[0.125rem] bg-[#161616] ">
      <button
        onClick={onClose}
        className="absolute w-[2rem] h-[2rem] top-[30px] right-[30px] text-[#A4A4A4] cursor-pointer "
      >
        &times;
      </button>
      <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
        포토카드 구매
      </p>
      <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
        [{cardInfo.grade} | {cardInfo.title}] {quantity}장을 구매하시겠습니까?
      </p>
      <button
        onClick={handlePurchase}
        className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
      >
        구매하기
      </button>
    </div>
  );
}
