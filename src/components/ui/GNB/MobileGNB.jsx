'use client';

import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import React from 'react';
import { brBold } from '@/fonts';
import { useRouter } from 'next/navigation';

const MobileGNB = ({ title }) => {
  const router = useRouter();
  return (
    <header className="relative flex items-center justify-center py-[1.25rem] mx-auto bg-(--black-black) md:hidden">
      <button
        type="button"
        onClick={() => router.back()}
        className="cursor-pointer"
        aria-label="뒤로 가기"
      >
        <LeftArrowIcon className="absolute top-1/2 -translate-y-1/2 left-1" />
      </button>
      <h1 className={`${brBold.className} text-[1.25rem] text-(--white-white)`}>
        {title}
      </h1>
    </header>
  );
};

export default MobileGNB;
