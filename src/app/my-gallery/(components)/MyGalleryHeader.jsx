import Link from 'next/link';
import React from 'react';
import { brBold } from '@/fonts';
import MobileGNB from '@/components/ui/GNB/MobileGNB';

const MyGalleryHeader = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  return (
    <>
      <header className="hidden justify-between items-center pb-[20px] border-b-1 md:flex">
        <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
          마이갤러리
        </h1>

        <div className="flex items-end gap-2">
          <p className="text-(--gray-gray300) text-[0.875rem]">
            {year}년 {month}월
          </p>
          <Link
            href="/my-gallery/create"
            className="flex items-center justify-center w-full max-w-[27.5rem] text-center max-h-[60px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px] cursor-pointer md:w-[22.5rem] lg:w-[27.5rem] lg:text-[18px] hover:bg-[#b8c41a]"
          >
            포토카드 생성하기
          </Link>
        </div>
      </header>
      <MobileGNB title="마이갤러리" />
    </>
  );
};

export default MyGalleryHeader;
