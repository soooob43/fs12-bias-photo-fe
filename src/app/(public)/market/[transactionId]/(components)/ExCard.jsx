import Image from 'next/image';
import React, { useState } from 'react';
import imgTest from '@/assets/images/img_photo_card_test.svg';
import imgLogo from '@/assets/images/img_logo.svg';
import icSoldOut from '@/assets/icons/ic_sold_out.svg';
import DeniedModal from './DeniedModal';
import ApprovedModal from './ApprovedModal';
import { GENRE_MAP, GRADE_COLORS, GRADE_MAP } from '@/constants/card';

const ExCard = ({
  page = 'buyer',
  title,
  imageUrl,
  grade = 'COMMON',
  genre,
  nickname,
  price = 0,
  description = '설명 없음',
  isSoldOut = false,
  transactionId,
  exchangeOfferId,
}) => {
  const [deniedOpen, setDeniedOpen] = useState(false);
  const [approvedOpen, setApprovedOpen] = useState(false);

  return (
    <main
      className={`flex flex-col gap-[10px] p-[10px] w-full bg-(--gray-gray500) rounded-[2px] md:p-[20px] md:gap-[26px] lg:p-[40px] lg:max-w-[440px] lg:gap-[32px]`}
    >
      <div className="relative w-full aspect-[150/112] overflow-hidden lg:max-w-[360px] lg:max-h-[270px]">
        <Image
          src={imageUrl || imgTest}
          alt="Default Image"
          fill
          priority
          className={`object-cover ${isSoldOut ? 'opacity-15' : ''}`}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
        {isSoldOut ? (
          <Image
            src={icSoldOut}
            alt="SoldOut Image"
            fill
            className="absolute top-1/2 left-1/2"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-[5px] text-[10px] text-(--gray-gray300) md:text-[16px] md:gap-[10px] lg:text-[18px]">
        <h1 className="truncate text-[14px] font-bold text-(--white-white) md:text-[22px]">
          {title}
        </h1>
        <section className="flex flex-col w-full items-start gap-1 pb-[10px] border-b-1 border-(--gray-gray400) md:gap-2">
          <div className="flex w-full items-center">
            <p
              className={`border-r-1 border-(--gray-gray400) pr-[0.6rem] ${GRADE_COLORS[grade] || 'text-(--white-white)'}`}
            >
              {GRADE_MAP[grade] || grade}
            </p>
            <p className="flex px-[0.6rem]">{GENRE_MAP[genre] || genre}</p>
          </div>
          <div className="flex w-full flex-1 gap-2 items-center justify-between">
            <p className="flex items-center min-w-0">
              <span className="text-(--white-white) font-bold truncate inline-block lg:max-w-[10rem]">
                {price} P
              </span>
              <span className="whitespace-nowrap shrink-0 ml-1">에 구매</span>
            </p>
            <p className="text-(--white-white) shrink-0 underline underline-offset-3">
              {nickname}
            </p>
          </div>
        </section>
        <section className="flex w-full my-[0.3125rem] md:my-[0.625rem]">
          <p className="text-(--white-white) w-full leading-[1.5] h-[3em] overflow-y-auto break-words whitespace-pre-wrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {description}
          </p>
        </section>
      </div>

      <div className="flex w-full gap-[1.25rem]">
        {page === 'buyer' ? (
          <button
            onClick={() => setDeniedOpen(true)}
            className="flex w-full h-[2.5rem] justify-center items-center rounded-[0.125rem] border border-(--gray-gray100) md:h-[3.4375rem] lg:h-[3.75rem]"
          >
            <p className="text-(--white-white) text-[0.75rem] font-bold md:text-[1rem] lg:text-[1.125rem]">
              취소하기
            </p>
          </button>
        ) : (
          <div className="flex w-full gap-[0.3125rem] md:gap-[1.25rem]">
            <button
              type="button"
              onClick={() => {
                setDeniedOpen(true);
              }}
              className="flex flex-1 w-full h-[2.5rem] justify-center items-center rounded-[0.125rem] border border-(--gray-gray100) bg-(--gray-gray500) cursor-pointer md:h-[3.4375rem] lg:h-[3.75rem] lg:max-w-[10.625rem]"
            >
              <p className="text-(--white-white) text-[0.75rem] font-bold md:text-[1rem] lg:text-[1.125rem]">
                거절하기
              </p>
            </button>

            <button
              type="button"
              onClick={() => setApprovedOpen(true)}
              className="flex flex-1 w-full h-[2.5rem] justify-center items-center rounded-[0.125rem] border border-(--main-main) bg-(--main-main) cursor-pointer md:h-[3.4375rem] lg:h-[3.75rem] lg:max-w-[10.625rem]"
            >
              <p className="text-(--black-black) text-[0.75rem] font-bold md:text-[1rem] lg:text-[1.125rem]">
                승인하기
              </p>
            </button>
          </div>
        )}
      </div>

      {deniedOpen && (
        <DeniedModal
          isOpen={deniedOpen}
          page={page}
          grade={grade}
          title={title}
          transactionId={transactionId}
          exchangeOfferId={exchangeOfferId}
          onClose={() => {
            setDeniedOpen(false);
          }}
        />
      )}

      {approvedOpen && (
        <ApprovedModal
          isOpen={approvedOpen}
          grade={grade}
          title={title}
          transactionId={transactionId}
          exchangeOfferId={exchangeOfferId}
          onClose={() => {
            setApprovedOpen(false);
          }}
        />
      )}
    </main>
  );
};

export default ExCard;
