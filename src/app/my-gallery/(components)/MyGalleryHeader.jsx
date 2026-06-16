import Link from 'next/link';
import React from 'react';
import { brBold } from '@/fonts';
import MobileGNB from '@/components/ui/GNB/MobileGNB';

/*---------------------------
 마이갤러리 MyGalleryHeader 작업 
  add : 2026.06.15 윤소정
  add : 2026.06.15 최혜성
----------------------------*/

const MyGalleryHeader = ({
  remainingCount,
  totalLimit,
  isPending,
  setIsToastOpen,
}) => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  return (
    <>
      <MobileGNB title="마이갤러리" />
      <header className="hidden items-center justify-between border-b border-(--gray-gray200) pb-[0.3125rem] md:flex md:pb-[0.625rem]">
        <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
          마이갤러리
        </h1>

        <div className="flex items-end gap-2">
          <p className="text-(--gray-gray300) text-[0.875rem]">
            {year}년 {month}월
          </p>
          <Link
            href="/my-gallery/create"
            onClick={(e) => {
              if (remainingCount === 0) {
                e.preventDefault();
                setIsToastOpen(true);
              }
            }}
            className={`flex items-center justify-center w-full max-w-[27.5rem] text-center max-h-[60px] py-[17px] font-semibold text-[16px] rounded-[2px] cursor-pointer md:w-[22.5rem] lg:w-[27.5rem] lg:text-[18px] transition-colors
              ${
                remainingCount === 0
                  ? 'bg-(--gray-gray300) text-(--gray-gray400)'
                  : 'bg-(--main-main) text-(--black-black) hover:bg-[#b8c41a]'
              }`}
          >
            <p>포토카드 생성하기 </p>
            <span>
              {isPending ? `(-/3)` : `(${remainingCount}/${totalLimit})`}
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default MyGalleryHeader;
