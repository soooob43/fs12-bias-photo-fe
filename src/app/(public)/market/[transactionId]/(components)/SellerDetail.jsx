'use client';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExchangeOffers } from '@/api/detailApi';
import ExCard from './ExCard';
import { brBold } from '@/fonts/index';
import Image from 'next/image';
import renew from '@/app/(public)/market/img/renew.svg';
import karina from '@/app/(public)/market/img/sample_karina.png';
import PhotoCardSellModal from '@/components/Modal/PhotoCardSellModal/PhotoCardSellModal';
import DeleteTransaction from './DeleteTransction';
import Link from 'next/link';
import { GENRE_MAP, GRADE_COLORS, GRADE_MAP } from '@/constants/card';
import Spinner from '@/components/ui/Spinner';
import ErrorPage from '@/components/layout/ErrorPage';

export default function TestSellerDetail({ transactionId, loginId, data }) {
  const queryClient = useQueryClient();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정하기 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); //판매내리기 상태

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
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5 mt-10">
        <Spinner />
        <p className="text-(--gray-gray300) text-[1rem] font-medium animate-pulse">
          포토카드를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  //에러 상태 화면 처리
  if (isError) {
    return (
      <ErrorPage
        title="오류가 발생했습니다!"
        content={error.message}
        btnName="마켓플레이스로 돌아가기"
        href="/market"
      />
    );
  }

  return (
    <div className="w-full max-w-[92.5rem] mx-auto flex flex-col">
      <header>
        <Link
          href="/market"
          className={`hidden md:block text-(--gray-gray300) text-[1rem] my-[2.5rem] ${brBold.className} lg:text-[1.5rem]`}
        >
          마켓플레이스
        </Link>
        <div className="text-(--white-white) text-[1.5rem] font-bold pb-[0.625rem] border-b-2 border-(--gray-gray100) md:pb-[1.25rem] md:text-[2rem] lg:text-[2.5rem]">
          {cardInfo?.title || '로딩된 제목 없음'}
        </div>
      </header>
      <div className="flex flex-col gap-[2.5rem] w-full mt-[1.625rem] md:flex-row md:mt-[3rem] lg:gap-[5rem]">
        <div className="relative w-full aspect-[345/259] overflow-hidden lg:max-w-[60rem]">
          <Image
            // url없는 경우에 karina 이미지로 대체
            src={cardInfo?.imageUrl || karina}
            alt={cardInfo?.title || '포토카드 이미지'}
            fill
            priority
            className="object-contain object-center"
            unoptimized={cardInfo?.imageUrl ? true : false} // 외부 URL 이미지를 최적화 없이 그대로 가져올 때 에러 방지
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw"
          />
        </div>
        <div className="flex flex-col w-full gap-[5rem] md:max-w-[27.5rem]">
          <div className="flex flex-col gap-[1.875rem]">
            <div className="flex text-[1.125rem] font-bold justify-between items-center w-full lg:text-[1.5rem]">
              <div className="flex items-start gap-[0.9rem]">
                <span
                  className={`${GRADE_COLORS[cardInfo?.grade] || 'text-(--white-white)'}`}
                >
                  {GRADE_MAP[cardInfo?.grade] || '포토카드 등급 없음'}
                </span>
                <span className="text-(--gray-gray400)">|</span>
                <span className="text-(--gray-gray300)">
                  {GENRE_MAP[cardInfo?.genre] || '포토카드 종류 없음'}
                </span>
              </div>
              <span className="text-(--white-white) underline  underline-offset-3">
                {userInfo?.nickname || '소유자 미상'}
              </span>
            </div>
            <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
            <p className="text-(--white-white) text-[1rem] lg:text-[1.125rem]">
              {cardInfo?.description || '포토카드 설명 없음'}
            </p>
            <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
            <div className="flex justify-between w-full">
              <span className="text-[1.125rem] text-(--gray-gray300) lg:text-[1.25rem]">
                가격
              </span>
              <span className="text-(--white-white) text-right text-[1.25rem] font-bold lg:text-[1.5rem]">
                {data?.price ? data.price.toLocaleString() : '?'} P
              </span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[1.125rem] text-(--gray-gray300) lg:text-[1.25rem]">
                잔여
              </span>
              <span>
                <span className="text-(--white-white) text-right text-[1.25rem] font-bold lg:text-[1.5rem]">
                  {data?.remainingQuantity || 0}{' '}
                </span>
                <span className="text-(--gray-gray300) text-right text-[1.25rem] font-bold lg:text-[1.5rem]">
                  / {data?.totalQuantity || '?'}
                </span>
              </span>
            </div>
            <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
            <div>
              <div className="flex items-center gap-[0.625rem] border-b-[0.125rem] border-(--gray-gray100) mt-[3.75rem] mb-[2.5rem] pb-[0.625rem]">
                <div className="w-[1.375rem] h-[1.375rem] lg:w-[1.5rem] lg:h-[1.5rem]">
                  <Image src={renew} alt="renew icon" width={24} height={24} />
                </div>
                <span className="text-[--white-white] text-[1.375rem] font-bold lg:text-[1.75rem]">
                  교환 희망 정보
                </span>
              </div>

              <div className="flex flex-col gap-[1.875rem]">
                <div className="flex items-start gap-[0.625rem] text-[1.125rem] font-bold lg:text-[1.5rem]">
                  <span
                    className={`${GRADE_COLORS[data?.exchangeGrade] || 'text-(--white-white)'}`}
                  >
                    {GRADE_MAP[data?.exchangeGrade] || '교환 희망 등급 없음'}
                  </span>
                  <span className="text-(--gray-gray400)">|</span>
                  <span className="text-(--gray-gray300)">
                    {GENRE_MAP[data?.exchangeGenre] || '교환 희망 종류 없음'}
                  </span>
                </div>
                <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
                <p className="text-(--white-white) text-[1rem] lg:text-[1.125rem]">
                  {data?.exchangeDescription || '교환 희망 정보 없음'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.25rem]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="flex w-full h-[4.6875rem] py-[1.5625rem] justify-center items-center cursor-pointer shrink-0 rounded-[0.125rem] bg-(--main-main) md:max-w-[440px] lg:h-[5rem]"
            >
              <p className="text-(--black-black) text-[1rem] font-bold lg:text-[1.125rem]">
                수정하기
              </p>
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex w-full h-[4.6875rem] py-[1.5625rem] justify-center items-center cursor-pointer shrink-0 rounded-[0.125rem] bg-(--black-black) border border-(--gray-gray100) md:max-w-[440px] lg:h-[5rem]"
            >
              <p className="text-(--white-white) text-[1rem] font-bold lg:text-[1.125rem]">
                판매 내리기
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[7.5rem]">
        <div className="flex pb-[0.625rem] border-b-[0.125rem] border-(--gray-gray100) md:pb-[1.25rem]">
          <span className="text-(--white-white) text-[1.5rem] font-bold md:text-[2rem] lg:text-[2.5rem]">
            교환 제시 목록
          </span>
        </div>
        {/* <div className="py-[3.75rem] flex gap-[5rem]"> */}
        <div className="mb-[1.25rem] md:mb-[3.125rem]">
          {photoCards.length <= 0 ? (
            <div className="w-full flex py-[3.75rem] justify-center items-center text-[1.25rem] text-(--gray-gray300) md:py-[6.25rem]">
              아직 교환 제시된 카드가 없습니다
            </div>
          ) : (
            <ul className="mt-[1.25rem] grid grid-cols-2 gap-[0.625rem] md:mt-[2.5rem] md:gap-[1.25rem] lg:mt-[3.75rem] lg:grid-cols-3 lg:gap-5">
              {photoCards.map((card) => (
                <li key={card.id}>
                  <ExCard
                    page="seller"
                    imageUrl={card.offeredCard.card.imageUrl}
                    title={card.offeredCard.card.title}
                    grade={card.offeredCard.card.grade}
                    genre={card.offeredCard.card.genre}
                    nickname={card.proposer.nickname}
                    price={card.offeredCard.purchasePrice}
                    description={card.description}
                    transactionId={transactionId}
                    exchangeOfferId={card.id}
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

      {isDeleteModalOpen && (
        <DeleteTransaction
          transactionId={transactionId}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
