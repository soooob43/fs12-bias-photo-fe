'use client';

import React from 'react';

export default function PurchaseModal({ onClose, cardInfo, quantity }) {
  return (
    <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[22rem] p-[4rem] fixed z-50 flex flex-col items-center justify-between rounded-[0.125rem] bg-[#161616] ">
      <button
        onClick={onClose}
        className="absolute w-[2rem] h-[2rem] top-[30px] right-[30px] text-[#A4A4A4] cursor-pointer "
      >
        ✕
      </button>
      <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
        포토카드 구매
      </p>
      <p className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1rem]">
        [{cardInfo.grade} | {cardInfo.title}] {quantity}장을 구매하시겠습니까?
      </p>
      <button
        onClick={onClose}
        className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
      >
        구매하기
      </button>
    </div>
  );
}
