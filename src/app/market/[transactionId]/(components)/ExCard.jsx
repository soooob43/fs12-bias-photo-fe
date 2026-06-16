import Image from 'next/image';
import React, { useState } from 'react';
import imgTest from '@/assets/images/img_photo_card_test.svg';
import imgLogo from '@/assets/images/img_logo.svg';
import icSoldOut from '@/assets/icons/ic_sold_out.svg';
import DeniedModal from './DeniedModal';
import ApprovedModal from './ApprovedModal';

// 둥급에 따른 색깔 설정 객체
const GRADE_COLORS = {
  COMMON: 'text-(--main-main)',
  RARE: 'text-(--blue-blue)',
  SUPER_RARE: 'text-(--purple-purple)',
  LEGENDARY: 'text-(--pink-pink)',
};

// 등급 이름 매핑 객체
const GRADE_MAP = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER RARE',
  LEGENDARY: 'LEGENDARY',
};

// 장르 이름 매핑 객체
const GENRE_MAP = {
  ALBUM: '앨범',
  BENEFIT: '특전',
  FAN_SIGN: '팬싸',
  SEASON_GREETING: '시즌그리팅',
  FAN_MEETING: '팬미팅',
  CONCERT: '콘서트',
  MD: 'MD',
  COLLAB: '콜라보',
  FAN_CLUB: '팬클럽',
  ETC: '기타',
};

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
        <section className="flex justify-between items-center pb-[10px] border-b-1 border-(--gray-gray400)">
          <div className="flex">
            <p
              className={`border-r-1 border-(--gray-gray400) pr-[0.6rem] ${GRADE_COLORS[grade] || 'text-(--white-white)'}`}
            >
              {GRADE_MAP[grade] || grade}
            </p>
            <p className="border-r-1 border-(--gray-gray400)  px-[0.6rem]">
              {GENRE_MAP[genre] || genre}
            </p>
            <p className="md:pl-[5px] pl-[0.6rem]">
              <span className="text-[#FFF] font-bold">{price} P</span> 에 구매
            </p>
          </div>
          <p className="text-(--white-white) underline underline-offset-3">
            {nickname}
          </p>
        </section>
        <section className="flex justify-between mt-[5px] md:mt-[10px]">
          <p className="text-(--white-white)">{description}</p>
        </section>
      </div>

      <div className="flex gap-[1.25rem]">
        {page === 'buyer' ? (
          <button
            onClick={() => setDeniedOpen(true)}
            className="flex flex-1 h-[3.4rem] px-[2.5625rem] py-[1rem] justify-center items-center shrink-0 rounded-[0.125rem] border border-[#EEE]"
          >
            <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1rem] font-bold">
              취소하기
            </p>
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setDeniedOpen(true);
                console.log();
              }}
              className="flex flex-1 h-[3.4rem] px-[2.5625rem] py-[1rem] justify-center items-center shrink-0 rounded-[0.125rem] border border-[#EEE]"
            >
              <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1rem] font-bold">
                거절하기
              </p>
            </button>

            <button
              onClick={() => setApprovedOpen(true)}
              className="flex flex-1 h-[3.4rem] px-[2.5625rem] py-[1rem] justify-center items-center shrink-0 rounded-[0.125rem] bg-[#EFFF04]"
            >
              <p className="text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1rem] font-bold">
                승인하기
              </p>
            </button>
          </>
        )}
      </div>

      {deniedOpen && (
        <DeniedModal
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
          grade={grade}
          title={title}
          onClose={() => {
            setApprovedOpen(false);
          }}
        />
      )}
    </main>
  );
};

export default ExCard;
