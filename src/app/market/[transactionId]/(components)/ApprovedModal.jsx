'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { acceptExchangeOfferApi } from '@/api/detailApi';
import { QueryClient } from '@tanstack/react-query';

export default function ApprovedModal({
  grade,
  title,
  transactionId,
  exchangeOfferId,
  onClose,
}) {
  const router = useRouter();

  const handleAccept = async () => {
    try {
      // API 함수가 요구하는 규격대로 데이터를 객체에 담아 호출합니다.
      await acceptExchangeOfferApi({
        transactionId,
        exchangeOfferId,
      });

      alert('교환 요청이 성공적으로 수락되었습니다!');
      QueryClient.invalidateQueries({ queryKey: ['exchangeList'] }); // 강제 캐시 무효화

      onClose();
    } catch (error) {
      alert('error.message || 교환 수락 중 오류가 발생했습니다.');
      console.error(error);
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
        교환 제시 승인
      </p>
      <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
        [{grade} | {title}] 카드와의 교환을 승인하시겠습니까?
      </p>
      <button
        onClick={handleAccept}
        className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
      >
        승인하기
      </button>
    </div>
  );
}
