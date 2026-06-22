'use client';

import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import React from 'react';
import { brBold } from '@/fonts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MobileGNB = ({ title, href = '' }) => {
  const router = useRouter();
  return (
    <header className="relative sticky top-0 flex items-center justify-center py-[1.25rem] mx-auto bg-(--black-black) z-100 md:hidden">
      <button
        type="button"
        onClick={() => router.back()}
        className="cursor-pointer"
        aria-label="뒤로 가기"
      >
        <LeftArrowIcon className="absolute top-1/2 -translate-y-1/2 left-2" />
      </button>
      <Link
        href={href}
        className={`${brBold.className} text-[1.25rem] text-(--white-white)`}
      >
        {title}
      </Link>
    </header>
  );
};

export default MobileGNB;
