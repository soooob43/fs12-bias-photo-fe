import React from 'react';
import { brBold } from '@/fonts';

const MySaleHeader = () => {
  return (
    <header className="hidden items-center border-b border-(--gray-gray200) pb-[0.3125rem] md:flex md:pb-[0.625rem]">
      <h1 className={`${brBold.className} text-[3rem] lg:text-[3.875rem]`}>
        나의 판매 포토카드
      </h1>
    </header>
  );
};

export default MySaleHeader;
