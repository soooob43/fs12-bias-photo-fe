'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function DeniedModal({ grade, title, onClose }) {
  const router = useRouter();

  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[22rem] p-[4rem] fixed z-50 flex flex-col items-center justify-between rounded-[0.125rem] bg-[#161616] ">
      <button
        onClick={onClose}
        className="absolute w-[2rem] h-[2rem] top-[30px] right-[30px] text-[#A4A4A4] cursor-pointer "
      >
        &times;
      </button>
      <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
        교환 제시 거절
      </p>
      <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
        [{grade} | {title}] 카드와의 교환을 거절하시겠습니까?
      </p>
      <button
        onClick={onClose}
        className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
      >
        거절하기
      </button>
    </div>
  );
}
