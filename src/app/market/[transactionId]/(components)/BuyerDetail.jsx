'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketDetail } from '@/api/detailApi.js';
import { brBold, brRegular } from '@/fonts/index';
import Image from 'next/image';
import karina from '@/app/market/img/sample_karina.png';

export default function BuyerDetail({ transactionId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['marketDetail', transactionId], // transactionId가 바뀔 때마다 리렌더링
    queryFn: () => fetchMarketDetail(transactionId),
    enabled: !!transactionId,
  });

  const [quantity, setQuantity] = useState(0);

  // 1. 로딩 상태 화면 처리
  if (isLoading) {
    return (
      <div className="text-white text-center py-20 font-['Noto_Sans_KR']">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  // 2. 에러 상태 화면 처리
  if (isError) {
    return (
      <div className="text-red-500 text-center py-20 font-['Noto_Sans_KR']">
        오류가 발생했습니다: {error.message}
      </div>
    );
  }
  console.log('★★ 카드거래 전체 데이터:', data);
  console.log('★★ 카드 원본 데이터:', data?.card);

  const cardInfo = data?.card; // data 불러와지면 card 정보를 cardInfo 변수에 담아서 쓰기
  const userInfo = data?.seller; // data 불러와지면 user 정보를 userInfo 변수에 담아서 쓰기

  const maxQuantity = data?.remainingQuantity || 0;
  const totalPrice = data?.price * quantity || 0;

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const handleIncrease = () => {
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  return (
    <div className="w-[92.5rem] h-[95rem] flex flex-col justify-between">
      <div className="text-[#A4A4A4] font-['brBold'] text-[1.5rem] mb-[3.75rem]">
        마켓플레이스
      </div>
      <div className="text-[#FFF] font-['Noto_Sans_KR'] text-[2.5rem] font-bold pb-[1.25rem] mb-[4.37rem] border-b-[2px] border-[#EEE]">
        {cardInfo?.title || '로딩된 제목 없음'}
      </div>
      <div className="flex justify-between items-start">
        <div className="relative w-[60rem] h-[45rem]">
          <Image
            // url없는 경우에 karina 이미지로 대체
            src={cardInfo?.imageUrl || karina}
            alt={cardInfo?.title || '포토카드 이미지'}
            fill
            className="object-cover"
            unoptimized={cardInfo?.imageUrl ? true : false} // 외부 URL 이미지를 최적화 없이 그대로 가져올 때 에러 방지
          />
        </div>
        <div className="flex flex-col w-[27.5rem] h-[45rem] gap-[5rem]">
          <div className="flex flex-col gap-[1.875rem]">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-start gap-[0.9rem]">
                <span className="text-[#FF2A6A] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  {cardInfo?.grade || '포토카드 등급 없음'}
                </span>
                |
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  {cardInfo?.genre || '포토카드 종류 없음'}
                </span>
              </div>
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold underline">
                {userInfo?.nickname || '소유자 미상'}
              </span>
            </div>
            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
              {cardInfo?.description || '포토카드 설명 없음'}
            </p>
            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="flex justify-between w-full">
              <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.25rem]">
                가격
              </span>
              <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                {data?.price ? data.price.toLocaleString() : '?'} P
              </span>
            </p>
            <p className="flex justify-between w-full">
              <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.25rem]">
                잔여
              </span>
              <span>
                <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  {data?.remainingQuantity || '?'}
                </span>
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem]">
                  /{data?.totalQuantity || '?'}
                </span>
              </span>
            </p>

            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
            <p className="flex justify-between w-fulls">
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                구매수량
              </span>
              <span className="w-[11rem] h-[3.125rem] flex justify-between rounded-[0.125rem] p-[0.6rem] border border-[#FFF] text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                <button
                  onClick={handleDecrease}
                  disabled={quantity <= 0}
                  className="cursor-pointer"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= maxQuantity}
                  className="cursor-pointer"
                >
                  +
                </button>
              </span>
            </p>
            <p className="flex justify-between w-full">
              <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                총 가격
              </span>
              <span>
                <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                  {totalPrice.toLocaleString()} P
                </span>
                <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem]">
                  ({quantity}장)
                </span>
              </span>
            </p>
          </div>

          <button
            disabled={quantity === 0}
            className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04] cursor-pointer"
          >
            <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
              포토카드 구매하기
            </p>
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between pb-[1.25rem] border-b-[2px] border-[#EEE]">
          <span className="inline-flex items-end text-[#FFF] font-['Noto_Sans_KR'] text-[2.5rem] font-bold">
            교환 희망 정보
          </span>
          <button className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04] cursor-pointer">
            <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
              포토카드 교환하기
            </p>
          </button>
        </div>
        <div className="py-[3.75rem]">
          <p className="mb-[1.25rem] text-[#FFF] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
            {data?.exchangeDescription || '교환 희망 정보 없음'}
          </p>
          <p className="flex gap-[0.62rem] text-[#A4A4A4]">
            <span className="text-[#29C9F9] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
              {data?.exchangeGrade || '교환 희망 등급 없음'}
            </span>
            |
            <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
              {data?.exchangeGenre || '교환 희망 종류 없음'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
