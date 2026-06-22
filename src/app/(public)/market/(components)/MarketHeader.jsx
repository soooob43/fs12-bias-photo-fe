'use client';

import Image from 'next/image';
import React from 'react';
import { brBold } from '@/fonts';
import icSearch from '@/assets/icons/ic_search.svg';

const MarketHeader = ({ keyword, setKeyword, onOpen }) => {
  return (
    <>
      {/* 모바일 뷰 */}
      <header className="pb-[15px] border-b-1 border-(--gray-gray400) md:hidden">
        <div className="relative inline-block w-full">
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="검색"
            className="w-full pl-[20px] pr-[46px] py-[11px] text-(--white-white) bg-(--black-black) border-1 border-(--gray-gray200) rounded-[2px] outline-none"
          />
          <Image
            src={icSearch}
            alt="검색 아이콘"
            width={22}
            height={22}
            className="absolute top-1/2 -translate-y-1/2 right-[20px] cursor-pointer"
          />
        </div>
      </header>

      {/* 태블릿, 데스크탑 뷰 */}
      <header className="hidden justify-between items-center pb-[20px] border-b-1 md:flex">
        <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
          마켓플레이스
        </h1>
        <button
          onClick={onOpen}
          className="w-full max-w-[440px] max-h-[60px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px] cursor-pointer lg:text-[18px] hover:bg-[#b8c41a]"
        >
          나의 포토카드 판매하기
        </button>
      </header>
    </>
  );
};

export default MarketHeader;
