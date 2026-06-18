import React from 'react';
import { brBold } from '@/fonts';
import SecondaryButton from '../ui/Button/SecondaryButton';
import Link from 'next/link';

// 결과 페이지 공통 컴포넌트 - 최혜성
const ResultPage = ({ success = true, title, content, btnName, href }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen mx-auto text-center gap-8 px-4">
      <h1
        className={`${brBold.className} text-[1.875rem] text-(--white-white) md:text-[2.25rem] lg:text-[2.875rem]`}
      >
        {`${title} `}
        {success ? (
          <span className="text-(--main-main)">성공</span>
        ) : (
          <span className="text-(--gray-gray300)">실패</span>
        )}
      </h1>
      <p className="text-(--white-white) text-[1rem] font-bold lg:text-[1.25rem]">
        {content}
        {success ? '에 성공했습니다!' : '에 실패했습니다.'}
      </p>
      <Link href={href} replace className="block w-full max-w-[32.5rem]">
        <SecondaryButton className="w-full">{btnName}</SecondaryButton>
      </Link>
    </div>
  );
};

export default ResultPage;
