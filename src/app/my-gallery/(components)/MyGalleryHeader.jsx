'use client';

import Link from 'next/link';
import React from 'react';
import { brBold } from '@/fonts';

const MyGalleryHeader = () => {
  return (
    <header className="hidden justify-between items-center pb-[20px] border-b-1 md:flex">
      <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
        마이갤러리
      </h1>
      <Link
        href="/my-gallery/create"
        className="w-full max-w-[440px] text-center max-h-[60px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px] cursor-pointer lg:text-[18px] hover:bg-[#b8c41a]"
      >
        포토카드 생성하기
      </Link>
    </header>
  );
};

export default MyGalleryHeader;
