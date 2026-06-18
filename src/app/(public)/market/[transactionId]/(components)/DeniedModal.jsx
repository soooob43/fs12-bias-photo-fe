'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteExchangeApi } from '@/api/detailApi';
import { useQueryClient } from '@tanstack/react-query';

export default function DeniedModal({
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

      const actionText = page === 'buyer' ? '취소' : '거절';
      alert(`교환 제안이 성공적으로 ${actionText}되었습니다.`);

      queryClient.invalidateQueries({ queryKey: ['exchangeList'] }); // 강제 캐시 무효화
      onClose();
    } catch (error) {
      console.error('교환 처리 중 에러 발생:', error);
      alert('요청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
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
      {page === 'buyer' ? (
        <>
          <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
            교환 제시 취소
          </p>
          <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
            [{grade} | {title}] 교환 제시를 취소하시겠습니까?
          </p>
          <button
            onClick={handleDeleteExchange}
            disabled={isSubmitting} // 로딩 중 클릭 비활성화
            className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
          >
            취소하기
          </button>
        </>
      ) : (
        <>
          <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
            교환 제시 거절
          </p>
          <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
            [{grade} | {title}] 카드와의 교환을 거절하시겠습니까?
          </p>
          <button
            onClick={handleDeleteExchange}
            disabled={isSubmitting} // 로딩 중 클릭 비활성화
            className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
          >
            거절하기
          </button>
        </>
      )}
    </div>
  );
}
