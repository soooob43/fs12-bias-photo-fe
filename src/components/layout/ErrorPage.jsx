import React from 'react';
import { brBold } from '@/fonts';
import SecondaryButton from '../ui/Button/SecondaryButton';
import Link from 'next/link';

// 에러 페이지 공통 컴포넌트 - 최혜성
const ErrorPage = ({ title, content, btnName, href }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen mx-auto text-center gap-8 px-4">
      <h1
        className={`${brBold.className} text-[2.875rem] text-(--white-white)`}
      >
        {title}
      </h1>
      <p className="text-(--white-white)">{content}</p>
      <Link href={href} replace className="block w-full max-w-[32.5rem]">
        <SecondaryButton className="w-full">{btnName}</SecondaryButton>
      </Link>
    </div>
  );
};

export default ErrorPage;
