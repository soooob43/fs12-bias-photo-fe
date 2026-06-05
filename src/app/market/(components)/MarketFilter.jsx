'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icFilter from '@/assets/icons/ic_filter.svg';
import icSearch from '@/assets/icons/ic_search.svg';
import Dropdown from '@/components/ui/Dropdown';

const MarketFilter = () => {
  const gradeOptions = ['COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'];
  const genreOptions = [
    '앨범',
    '특전',
    '팬싸',
    '시즌그리팅',
    '팬미팅',
    '콘서트',
    'MD',
    '콜라보',
    '팬클럽',
    '기타',
  ];
  const transactionOptions = ['판매', '교환'];
  const sortOptions = ['낮은 가격순', '높은 가격순', '최신순', '오래된순'];
  const [grade, setGrade] = useState(gradeOptions[0]);
  const [genre, setGenre] = useState(genreOptions[0]);
  const [transaction, setTransaction] = useState(transactionOptions[0]);
  const [orderBy, setOrderBy] = useState(sortOptions[0]);
  const [keyword, setKeyword] = useState('');
  return (
    <div className="mt-[15px] flex justify-between items-center md:mt-[20px]">
      <button className="p-[6.5px] border border-(--gray-gray200) rounded-[2px] cursor-pointer md:hidden">
        <Image src={icFilter} alt="필터 아이콘" width={20} height={20} />
      </button>
      <div className="hidden md:flex gap-[25px] items-center flex-1">
        <div className="relative w-full max-w-[200px] md:inline-block lg:max-w-[320px]">
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            placeholder="검색"
            className="w-full pl-[20px] pr-[46px] py-[9.5px] text-(--white-white) bg-(--black-black) border-1 border-(--gray-gray200) rounded-[2px] outline-none lg:py-[12px]"
          />
          <Image
            src={icSearch}
            alt="검색 아이콘"
            width={22}
            height={22}
            className="absolute top-1/2 -translate-y-1/2 right-[20px] cursor-pointer"
          />
        </div>
        <Dropdown options={gradeOptions} value={'등급'} onChange={setGrade} />
        <Dropdown options={genreOptions} value={'장르'} onChange={setGenre} />
        <Dropdown
          options={transactionOptions}
          value={'판매 방법'}
          onChange={setTransaction}
        />
      </div>
      <Dropdown
        type={'sort'}
        options={sortOptions}
        value={orderBy}
        onChange={setOrderBy}
      />
    </div>
  );
};

export default MarketFilter;
