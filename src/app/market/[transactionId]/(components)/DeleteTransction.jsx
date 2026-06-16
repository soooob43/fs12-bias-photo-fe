'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMarketTransactionApi } from '@/api/detailApi';

export default function DeleteTransaction({ transactionId, onClose }) {
  const router = useRouter();

  // 취소 중 중복 요청 방지 관리
  const [isSubmitting, setIsSubmitting] = useState(false);

  //판매글 내리기 함수
  const handleDeleteTransaction = async () => {
    try {
      setIsSubmitting(true);

      await deleteMarketTransactionApi(transactionId);

      alert(`해당 판매글이 성공적으로 삭제되었습니다.`);
      router.push('/market');

      onClose();
    } catch (error) {
      console.error('삭제 처리 중 에러 발생:', error);
      alert('요청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[22rem] p-[4rem] fixed z-50 flex flex-col items-center justify-between rounded-[0.125rem] bg-[#161616] ">
      <button
        onClick={onClose}
        disabled={isSubmitting}
        className="absolute w-[2rem] h-[2rem] top-[30px] right-[30px] text-[#A4A4A4] cursor-pointer "
      >
        &times;
      </button>
      <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
        포토카드 판매 내리기
      </p>
      <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
        정말로 판매를 중단하시겠습니까?
      </p>
      <button
        onClick={handleDeleteTransaction}
        className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
      >
        판매내리기
      </button>
    </div>
  );
}
