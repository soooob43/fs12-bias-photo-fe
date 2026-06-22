'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icSearch from '@/assets/icons/ic_search.svg';
import Dropdown from '@/components/ui/Dropdown';
import {
  MY_SALES_FILTER_CONFIG,
  MY_SALES_FILTER_KEY_MAP,
} from '@/constants/mySalesFilter';

const MySalesFilter = ({
  keyword,
  setKeyword,
  setGrade,
  setGenre,
  setSaleMethod,
  setSoldOut,
}) => {
  const gradeOptions = MY_SALES_FILTER_CONFIG.grade.options;
  const genreOptions = MY_SALES_FILTER_CONFIG.genre.options;
  const saleMethodOptions = MY_SALES_FILTER_CONFIG.saleMethod.options;
  const soldOutOptions = MY_SALES_FILTER_CONFIG.soldOut.options;

  const [selectedGrade, setSelectedGrade] = useState('등급');
  const [selectedGenre, setSelectedGenre] = useState('장르');
  const [selectedSaleMethod, setSelectedSaleMethod] = useState('판매방법');
  const [selectedSoldOut, setSelectedSoldOut] = useState('매진여부');

  const handleGradeChange = (value) => {
    setSelectedGrade(value);
    setGrade(MY_SALES_FILTER_KEY_MAP.grade[value]);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    setGenre(MY_SALES_FILTER_KEY_MAP.genre[value]);
  };

  const handleSaleMethodChange = (value) => {
    setSelectedSaleMethod(value);
    setSaleMethod(MY_SALES_FILTER_KEY_MAP.saleMethod[value]);
  };

  const handleSoldOutChange = (value) => {
    setSelectedSoldOut(value);
    setSoldOut(MY_SALES_FILTER_KEY_MAP.soldOut[value]);
  };

  return (
    <div className="mt-[15px] flex justify-between items-center md:mt-[20px]">
      <div className="flex gap-[25px] items-center flex-1">
        <div className="relative w-full max-w-[200px] md:inline-block lg:max-w-[320px]">
          <input
            type="text"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
            placeholder="검색"
            className="w-full pl-[20px] pr-[46px] py-[9.5px] text-(--white-white) bg-(--black-black) border border-(--gray-gray200) rounded-[2px] outline-none lg:py-[12px]"
          />

          <Image
            src={icSearch}
            alt="검색 아이콘"
            width={22}
            height={22}
            className="absolute top-1/2 -translate-y-1/2 right-[20px]"
          />
        </div>

        <Dropdown
          options={gradeOptions}
          value={selectedGrade}
          onChange={handleGradeChange}
        />

        <Dropdown
          options={genreOptions}
          value={selectedGenre}
          onChange={handleGenreChange}
        />

        <Dropdown
          options={saleMethodOptions}
          value={selectedSaleMethod}
          onChange={handleSaleMethodChange}
        />

        <Dropdown
          options={soldOutOptions}
          value={selectedSoldOut}
          onChange={handleSoldOutChange}
        />
      </div>
    </div>
  );
};

export default MySalesFilter;
