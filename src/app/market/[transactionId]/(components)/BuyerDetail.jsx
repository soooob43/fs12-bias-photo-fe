'use client';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchExchangeOffers } from '@/api/detailApi';
import ExCard from './ExCard';
import { useRouter } from 'next/navigation';

import { brBold } from '@/fonts/index';
import Image from 'next/image';
import karina from '@/app/market/img/sample_karina.png';
import PurchaseModal from './PurchaseModal';
import PhotoCardSelectModal from '@/components/Modal/PhotoCardSelectModal/PhotoCardSelectModal';
import CommonModal from '@/components/ui/CommonModal/CommonModal';
import ExchangeModal from './ExchangeModal';
import Link from 'next/link';
import { GENRE_MAP, GRADE_COLORS, GRADE_MAP } from '@/constants/card';
import Spinner from '@/components/ui/Spinner';
import ErrorPage from '@/components/layout/ErrorPage';

export default function TestBuyerDetail({ transactionId, loginId, data }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(0);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [exSecondModalOpen, setExSecondModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // 교환하기에서 선택한 카드 정보 저장

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

  const photoCards =
    loginId && exdata
      ? exdata.filter((card) => card.proposerId === loginId)
      : [];

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
            className="object-contain object-left-top"
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
                {userInfo?.nickname || '판매자 미상'}
              </span>
            </div>
            <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
            <p className="text-(--white-white) text-[1rem] lg:text-[1.125rem]">
              {cardInfo?.description || '포토카드 설명 없음'}
            </p>
            <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
            <p className="flex justify-between w-full">
              <span className="text-[1.125rem] text-(--gray-gray300) lg:text-[1.25rem]">
                가격
              </span>
              <span className="text-(--white-white) text-right text-[1.25rem] font-bold lg:text-[1.5rem]">
                {data?.price ? data.price.toLocaleString() : '?'} P
              </span>
            </p>
            <p className="flex justify-between w-full">
              <span className="text-[1.125rem] text-(--gray-gray300) lg:text-[1.25rem]">
                잔여
              </span>
              <span>
                <span className="text-(--white-white) text-right text-[1.25rem] font-bold lg:text-[1.5rem]">
                  {data?.remainingQuantity || '?'}{' '}
                </span>
                <span className="text-(--gray-gray300) text-right text-[1.25rem] font-bold lg:text-[1.5rem]">
                  / {data?.totalQuantity || '?'}
                </span>
              </span>
            </p>

            <div className="w-full border-t border-[0.0625rem] border-(--gray-gray400)" />
            <p className="flex justify-between items-center w-full">
              <span className="text-(--white-white) text-[1.125rem] lg:text-[1.25rem]">
                구매수량
              </span>
              <span className="max-w-[144px] w-full h-[2.8125rem] py-[0.625rem] px-[0.75rem] flex items-center justify-between rounded-[0.125rem] border border-(--gray-gray200) text-(--white-white) text-[1.125rem] lg:text-[1.25rem] lg:max-w-[11rem] lg:h-[3.125rem]">
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
            <p className="flex justify-between items-center w-full">
              <span className="text-(--white-white) text-[1.125rem] lg:text-[1.25rem]">
                총 가격
              </span>
              <span className="flex gap-[0.625rem]">
                <span className="text-(--white-white) text-[1.25rem] font-bold lg:text-[1.5rem]">
                  {totalPrice.toLocaleString()} P
                </span>
                <span className="text-(--gray-gray300) text-[1.125rem] lg:text-[1.25rem]">
                  ({quantity}장)
                </span>
              </span>
            </p>
          </div>

          <button
            onClick={() => setPurchaseModalOpen(true)}
            disabled={quantity === 0}
            className="flex w-full h-[4.6875rem] py-[1.5625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-(--main-main) cursor-pointer disabled:bg-[#949494] disabled:cursor-not-allowed md:max-w-[440px]"
          >
            <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
              포토카드 구매하기
            </p>
          </button>
        </div>
      </div>
      <div className="mt-[7.5rem]">
        <div className="flex justify-between pb-[0.625rem] border-b-[0.125rem] border-(--gray-gray100) md:pb-[1.25rem]">
          <span className="text-(--white-white) text-[1.5rem] font-bold md:text-[2rem] lg:[2.5rem]">
            교환 희망 정보
          </span>
          <button
            onClick={() => setExchangeModalOpen(true)}
            className="hidden w-full max-w-[21.375rem] h-[3.75rem] py-[1.0625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-(--main-main) cursor-pointer md:flex lg:max-w-[27.5rem]"
          >
            <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
              포토카드 교환하기
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-[1.25rem] py-[3.75rem] text-[1.125rem] font-bold lg:text-[1.5rem]">
          <p className="text-(--white-white)">
            {data?.exchangeDescription || '교환 희망 정보 없음'}
          </p>
          <p className="flex gap-[0.625rem] text-(--gray-gray400)">
            <span
              className={`${GRADE_COLORS[data?.exchangeGrade] || 'text-(--white-white)'}`}
            >
              {GRADE_MAP[data?.exchangeGrade] || '교환 희망 등급 없음'}
            </span>
            |
            <span className="text-(--gray-gray300)">
              {GENRE_MAP[data?.exchangeGenre] || '교환 희망 종류 없음'}
            </span>
          </p>
          <button
            onClick={() => setExchangeModalOpen(true)}
            className="flex w-full h-[3.4375rem] mt-[1.25rem] py-[1.0625rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-(--main-main) cursor-pointer md:hidden"
          >
            <p className="text-(--black-black) text-[1rem] font-bold">
              포토카드 교환하기
            </p>
          </button>
        </div>
        <div>
          {photoCards.length <= 0 ? (
            <></>
          ) : (
            <>
              <div className="flex pb-[0.625rem] border-b-[0.125rem] border-(--gray-gray100) md:pb-[1.25rem] lg:mt-[3.75rem]">
                <span className="text-(--white-white) text-[24px] font-bold md:text-[32px] lg:text-[40px]">
                  내가 제시한 교환 목록
                </span>
              </div>
              <div className="mb-[1.25rem] md:mb-[3.125rem]">
                <ul className="mt-[1.25rem] grid grid-cols-2 gap-[0.625rem] md:mt-[2.5rem] md:gap-[1.25rem] lg:mt-[3.75rem] lg:grid-cols-3 lg:gap-5">
                  {photoCards.map((card) => (
                    <li key={card.id}>
                      <ExCard
                        page="buyer"
                        imageUrl={card.offeredCard.card.imageUrl}
                        title={card.offeredCard.card.title}
                        grade={card.offeredCard.card.grade}
                        genre={card.offeredCard.card.genre}
                        nickname={card.proposer.nickname}
                        price={card.offeredCard.purchasePrice}
                        description={card.description}
                        exchangeOfferId={card.id}
                        transactionId={transactionId}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {purchaseModalOpen && (
        <PurchaseModal
          onClose={() => setPurchaseModalOpen(false)}
          transactionId={transactionId}
          loginId={loginId}
          cardInfo={cardInfo}
          quantity={quantity}
        />
      )}

      {exchangeModalOpen &&
        (() => {
          if (loginId === 'undefined' || !loginId) {
            alert('로그인 후에 교환이 가능합니다.');
            setExchangeModalOpen(false);
            return null;
          }

          return (
            <PhotoCardSelectModal
              isOpen={exchangeModalOpen}
              onClose={() => setExchangeModalOpen(false)}
              title="포토카드 교환하기"
              onSelectCard={(card) => {
                setSelectedCard(card);
                setExchangeModalOpen(false);
                setExSecondModalOpen(true);
              }}
            />
          );
        })()}

      {exSecondModalOpen && (
        <CommonModal
          isOpen={exSecondModalOpen}
          onClose={() => {
            setExSecondModalOpen(false); //모달 닫고
            setSelectedCard(null); // 선택했던 카드 정보 초기화
          }}
        >
          <ExchangeModal
            transactionId={transactionId}
            loginId={loginId}
            cardInfo={selectedCard}
            onClose={() => {
              setExSecondModalOpen(false); //모달 닫고
              setSelectedCard(null); // 선택했던 카드 정보 초기화
            }}
          />
        </CommonModal>
      )}
    </div>
  );
}
