'use client';

import Link from 'next/link';
import React from 'react';
import { brBold } from '@/fonts';
import { useRouter } from 'next/navigation';

/*---------------------------
 마이갤러리 MyGalleryHeader 작업 
  add : 2026.06.15 윤소정
----------------------------*/

const MyGalleryHeader = () => {
  const router = useRouter();

  return (
    <>
      <header className="flex items-center justify-center pb-[20px] md:hidden">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-[15px] text-[28px]"
          aria-label="뒤로 가기"
        >
          ‹
        </button>

        <h1 className={`${brBold.className} text-[20px]`}>마이갤러리</h1>
      </header>

      <header className="hidden items-center justify-between border-b border-(--gray-gray200) pb-[20px] md:flex">
        <h1 className={`${brBold.className} text-[48px] lg:text-[62px]`}>
          마이갤러리
        </h1>

        <Link
          href="/my-gallery/create"
          className="w-full max-w-[440px] rounded-[2px] bg-(--main-main) py-[17px] text-center text-[16px] font-semibold text-(--black-black) hover:bg-(--main-main300) lg:text-[18px]"
        >
          포토카드 생성하기
        </Link>
      </header>
    </>
  );
};

export default MyGalleryHeader;
