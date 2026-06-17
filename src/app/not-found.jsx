import React from 'react';
import Link from 'next/link';
import { brBold } from '@/fonts';
import SecondaryButton from '@/components/ui/Button/SecondaryButton';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen mx-auto text-center gap-8 px-4">
      <h1 className={`${brBold.className} text-[2.875rem] text-(--red-red)`}>
        404 Not Found
      </h1>
      <p className="text-(--white-white)">
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경/삭제되어 찾을 수 없습니다.
      </p>
      <Link href="/" replace className="block w-full max-w-[32.5rem]">
        <SecondaryButton className="w-full">홈으로 돌아가기</SecondaryButton>
      </Link>
    </div>
  );
};

export default NotFoundPage;
