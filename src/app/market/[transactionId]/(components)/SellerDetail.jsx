'use client';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExchangeOffers } from '@/api/detailApi';
import ExCard from './ExCard';
import { brBold, brRegular } from '@/fonts/index';
import Image from 'next/image';
import renew from '@/app/market/img/renew.svg';
import karina from '@/app/market/img/sample_karina.png';
import PhotoCardSellModal from '@/components/Modal/PhotoCardSellModal/PhotoCardSellModal';

export default function SellerDetail({ transactionId, loginId, data }) {
  const queryClient = useQueryClient();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정하기 상태

  const cardInfo = data?.card; // data 불러와지면 card 정보를 cardInfo 변수에 담아서 쓰기
  const userInfo = data?.seller; // data 불러와지면 user 정보를 userInfo 변수에 담아서 쓰기

  const {
    data: exdata,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['exchangeList', transactionId], // transactionId가 바뀔 때마다 리렌더링
    queryFn: () => fetchExchangeOffers(transactionId),
    enabled: typeof transactionId !== 'undefined' && transactionId !== null,
    retry: false,
  });

  const photoCards = exdata ?? [];

  //로딩 상태 화면 처리
  if (isLoading || (!data && !isError)) {
    return (
      <div className="text-white text-center py-20 font-['Noto_Sans_KR']">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  //에러 상태 화면 처리
  if (isError) {
    return (
      <div className="text-red-500 text-center py-20 font-['Noto_Sans_KR']">
        오류가 발생했습니다: {error.message}
      </div>
    );
  }

  console.log('현재 에러 상태: ', error);

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
        <div className="flex flex-col w-[27.5rem] gap-[5rem]">
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

            <div className="flex justify-between w-full">
              <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.25rem]">
                가격
              </span>
              <span className="text-[#FFF] text-right font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                {data?.price ? data.price.toLocaleString() : '?'} P
              </span>
            </div>
            <div className="flex justify-between w-full">
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
            </div>

            <div className="w-full border-t border-[1px] border-[#5A5A5A]" />

            <div>
              <div className="flex gap-[0.62rem] border-b-[2px] border-[#EEE] mt-[3.75rem] mb-[2.5rem] pb-[0.62rem]">
                <Image src={renew} alt="renew icon" width={24} height={24} />
                <span className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.75rem] font-bold">
                  교환 희망 정보
                </span>
              </div>

              <div className="flex flex-col gap-[1.875rem]">
                <div className="flex items-start gap-[0.9rem]">
                  <span className="text-[#29C9F9] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                    {data?.exchangeGrade || '교환 희망 등급 없음'}
                  </span>
                  |
                  <span className="text-[#A4A4A4] font-['Noto_Sans_KR'] text-[1.5rem] font-bold">
                    {data?.exchangeGenre || '교환 희망 종류 없음'}
                  </span>
                </div>
                <div className="w-full border-t border-[1px] border-[#5A5A5A]" />
                <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem]">
                  {data?.exchangeDescription || '교환 희망 정보 없음'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.25rem]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04]"
            >
              <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
                수정하기
              </p>
            </button>

            <button className="flex w-[27.5rem] h-[5rem] px-[9rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] border border-[#EEE]">
              <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
                판매 내리기
              </p>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between pb-[1.25rem] border-b-[2px] border-[#EEE]">
          <span className="inline-flex items-end text-[#FFF] font-['Noto_Sans_KR'] text-[2.5rem] font-bold">
            교환 제시 목록
          </span>
        </div>
        <div className="py-[3.75rem] flex gap-[5rem]">
          {photoCards.length <= 0 ? (
            <div>제시된 카드가 없습니다</div>
          ) : (
            <ul className="flex gap-[5rem]">
              {photoCards.map((card) => (
                <li
                  key={card.id}
                  className="w-[27.5rem] h-[39.125rem] flex justify-center items-center rounded-[0.125rem] border border-[#FFF]/10 bg-[#161616] text-[2rem]"
                >
                  <ExCard
                    type="my"
                    imageUrl={card.offeredCard.card.imageUrl}
                    title={card.offeredCard.card.title}
                    grade={card.offeredCard.card.grade}
                    genre={card.offeredCard.card.genre}
                    nickname={card.proposer.nickname}
                    price={card.offeredCard.purchasePrice}
                    description={card.description}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <PhotoCardSellModal
        mode="edit"
        transactionId={transactionId}
        card={{
          cardId: cardInfo?.id,
          title: cardInfo?.title,
          imageUrl: cardInfo?.imageUrl,
          grade: cardInfo?.grade,
          genre: cardInfo?.genre,
          creator: userInfo?.nickname,
          quantity: data?.totalQuantity ?? 1,
        }}
        initialValues={{
          totalQuantity: data?.totalQuantity,
          price: data?.price,
          exchangeGrade: data?.exchangeGrade,
          exchangeGenre: data?.exchangeGenre,
          exchangeDescription: data?.exchangeDescription,
        }}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="나의 포토카드 판매 수정하기"
      />
    </div>
  );
}
