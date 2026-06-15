'use client';

import ResultPage from '@/components/layout/ResultPage';
import ResultSkeleton from '@/components/ui/Skeleton/ResultSkeleton';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const FailClientPageContent = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const grade = searchParams.get('grade');

  const text = `[ ${grade} | ${title} ] 포토카드 생성`;

  return (
    <ResultPage
      success={false}
      title="포토 카드 생성"
      content={text}
      btnName="마이갤러리로 돌아가기"
      href="/my-gallery"
    />
  );
};

const FailClientPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <ResultSkeleton />
        </div>
      }
    >
      <FailClientPageContent />
    </Suspense>
  );
};

export default FailClientPage;
