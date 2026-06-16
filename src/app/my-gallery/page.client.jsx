'use client';

import React, { useState } from 'react';
import MyGalleryHeader from './(components)/MyGalleryHeader';
import MyGalleryCardList from './(components)/MyGalleryCardList';
import MobileCreateButton from './(components)/MobileCreateButton';
import Toast from '@/components/ui/Toast/Toast';
import { useQuery } from '@tanstack/react-query';
import { getRemainingCreateCount } from '@/api/cardApi';

const MyGalleryClientPage = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const { data, isPending, isError } = useQuery({
    queryKey: ['remaining-count'],
    queryFn: getRemainingCreateCount,
  });

  // 포토카드 생성 남은 횟수
  const remainingCount = isError ? '-' : (data?.data?.remainingCount ?? 0);
  // 포토카드 총 생성 가능 횟수
  const totalLimit = isError ? '-' : (data?.data?.totalLimit ?? 10);

  return (
    <>
      <MyGalleryHeader
        remainingCount={remainingCount}
        totalLimit={totalLimit}
        isPending={isPending}
        setIsToastOpen={setIsToastOpen}
      />
      <MyGalleryCardList />
      <MobileCreateButton
        remainingCount={remainingCount}
        totalLimit={totalLimit}
        isPending={isPending}
        setIsToastOpen={setIsToastOpen}
      />
      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message="이번 달 포토카드 생성 횟수를 모두 소진했습니다."
      />
    </>
  );
};

export default MyGalleryClientPage;
