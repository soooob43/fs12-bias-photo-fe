'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchMySales } from '@/api/mySaleApi';
import MobileBackHeader from '@/components/layout/MobileBackHeader';
import { useMe } from '@/hooks/useMe';

import MySaleGradeStats from './(components)/MySaleGradeStats';
import MySalesFilter from './(components)/MySalesFilter';
import MySaleCardList from './(components)/MySaleCardList';
import Pagination from './(components)/Pagination';

const MySalesPage = () => {
  const { data: user } = useMe();

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [saleMethod, setSaleMethod] = useState('');
  const [soldOut, setSoldOut] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['my-sales', page, keyword, grade, genre, saleMethod, soldOut],
    queryFn: () =>
      fetchMySales({
        page,
        limit: 15,
        keyword,
        grade,
        genre,
        saleMethod,
        soldOut,
      }),
  });

  if (isLoading) {
    return <div className="flex justify-center py-[100px]">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center py-[100px] text-red-500">
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <>
      <MobileBackHeader title={'\uB098\uC758 \uD310\uB9E4 \uD3EC\uD1A0\uCE74\uB4DC'} />

      <main className="w-full max-w-[92.5rem] mx-auto px-[0.9375rem] pb-[5.625rem] md:pb-0">
        <h1 className="hidden text-[24px] font-bold text-white md:block md:text-[32px]">
          나의 판매 포토카드
        </h1>

        <div className="hidden mt-[20px] border-b border-(--gray-gray300) md:block" />

        <MySaleGradeStats
          nickname={user?.nickname}
          totalQuantity={data?.pagination?.totalCount ?? 0}
          gradeCounts={data?.gradeCounts ?? {}}
        />

        <MySalesFilter
          keyword={keyword}
          setKeyword={setKeyword}
          setGrade={setGrade}
          setGenre={setGenre}
          setSaleMethod={setSaleMethod}
          setSoldOut={setSoldOut}
        />

        <div className="mt-[40px]">
          <MySaleCardList cards={data?.data ?? []} />
        </div>

        <div className="mt-[80px]">
          <Pagination
            currentPage={page}
            totalPages={Math.max(data?.pagination?.totalPages ?? 0, 1)}
            onPageChange={setPage}
          />
        </div>
      </main>
    </>
  );
};

export default MySalesPage;
