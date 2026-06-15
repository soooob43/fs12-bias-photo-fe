'use client';

import { useState } from 'react';

import GradeStats from './(components)/GradeStats';
import MySalesFilter from './(components)/MySalesFilter';
import MySaleCardList from './(components)/MySaleCardList';
import Pagination from './(components)/Pagination';

const MySalesPage = () => {
  const gradeCounts = {
    COMMON: 10,
    RARE: 3,
    SUPER_RARE: 3,
    LEGENDARY: 5,
  };

  const [page, setPage] = useState(1);

  const [keyword, setKeyword] = useState('');

  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [saleMethod, setSaleMethod] = useState('');
  const [soldOut, setSoldOut] = useState('');

  // 나중에 React Query 연결 예정
  // const { data, isLoading } = useQuery(...)

  return (
    <main className="mx-auto max-w-[1480px] px-[20px] py-[30px]">
      {/* 페이지 제목 */}
      <h1 className="text-[24px] font-bold text-(--white-white)">
        나의 판매 포토카드
      </h1>

      <GradeStats gradeCounts={gradeCounts} />

      {/* 검색 + 필터 */}
      <MySalesFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setGrade={setGrade}
        setGenre={setGenre}
        setSaleMethod={setSaleMethod}
        setSoldOut={setSoldOut}
      />

      {/* 카드 목록 */}
      <MySaleCardList cards={[]} />

      <div className="flex min-h-screen items-center justify-center bg-black">
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    </main>
  );
};

export default MySalesPage;
