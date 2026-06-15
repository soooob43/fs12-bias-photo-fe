'use client';
import React, { Suspense } from 'react';
import ResultPage from '@/components/layout/ResultPage';
import { useSearchParams } from 'next/navigation';
import ResultSkeleton from '@/components/ui/Skeleton/ResultSkeleton';

const SuccessClientPageContent = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const grade = searchParams.get('grade');

  const text = `[ ${grade} | ${title} ] 포토카드 생성`;

  return (
    <>
      <ResultPage
        success={true}
        title="포토 카드 생성"
        content={text}
        btnName="마이갤러리로 돌아가기"
        href="/my-gallery"
      />
    </>
  );
};

const SuccessClientPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <ResultSkeleton />
        </div>
      }
    >
      <SuccessClientPageContent />
    </Suspense>
  );
};

export default SuccessClientPage;
