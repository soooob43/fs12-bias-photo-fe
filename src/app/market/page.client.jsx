'use client';

import React, { useState } from 'react';
import MarketHeader from './(components)/MarketHeader';
import MarketFilter from './(components)/MarketFilter';
import MarketCardList from './(components)/MarketCardList';
import useDebounce from '@/hooks/useDebounce';

const ClientPage = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  const [filterType, setFilterType] = useState(null); // 'GRADE' | 'GENRE' | 'SALE_STATUS'
  const [filterValue, setFilterValue] = useState(null);

  const [sortBy, setSortBy] = useState('DATE');
  const [sortOrder, setSortOrder] = useState('DESC');

  return (
    <>
      <MarketHeader keyword={keyword} setKeyword={setKeyword} />
      <MarketFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setFilterType={setFilterType}
        setFilterValue={setFilterValue}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
      <MarketCardList
        keyword={debouncedKeyword}
        filterType={filterType}
        filterValue={filterValue}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="sticky bottom-0 left-0 right-0 py-[15px] mx-auto max-w-[1480px] md:hidden">
        <button className="w-full max-h-[60px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px]">
          나의 포토카드 판매하기
        </button>
      </div>
    </>
  );
};

export default ClientPage;
