'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRemainingCreateCount } from '@/api/cardApi';
import ErrorPage from '@/components/layout/ErrorPage';
import Spinner from '@/components/ui/Spinner';
import CreateCardHeader from './(components)/CreateCardHeader';

export default function CreateCardLayout({ children }) {
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ['remaining-count'],
    queryFn: getRemainingCreateCount,
  });

  if (isLoading && pathname === '/my-gallery/create') {
    return (
      <div className="w-full max-w-[1480px] mx-auto px-[15px]">
        <CreateCardHeader />
        <main className="flex justify-center items-center min-h-[50vh] w-full pt-5 pb-10 md:my-20">
          <Spinner />
        </main>
      </div>
    );
  }

  if (pathname === '/my-gallery/create') {
    const remainingCount = data?.data?.remainingCount ?? 0;

    if (remainingCount === 0) {
      return (
        <ErrorPage
          title="생성 횟수 소진"
          content="이번 달 포토카드 생성 횟수를 모두 소진했습니다."
          btnName="마이갤러리로 돌아가기"
          href="/my-gallery"
        />
      );
    }
  }

  return <>{children}</>;
}
