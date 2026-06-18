'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icFilter from '@/assets/icons/ic_filter.svg';
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

  const [selectedGrade, setSelectedGrade] = useState(
    MY_SALES_FILTER_CONFIG.grade.label,
  );
  const [selectedGenre, setSelectedGenre] = useState(
    MY_SALES_FILTER_CONFIG.genre.label,
  );
  const [selectedSaleMethod, setSelectedSaleMethod] = useState(
    MY_SALES_FILTER_CONFIG.saleMethod.label,
  );
  const [selectedSoldOut, setSelectedSoldOut] = useState(
    MY_SALES_FILTER_CONFIG.soldOut.label,
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  const renderFilterDropdowns = (dropdownProps = {}) => (
    <>
      <Dropdown
        options={gradeOptions}
        value={selectedGrade}
        onChange={handleGradeChange}
        {...dropdownProps}
      />
      <Dropdown
        options={genreOptions}
        value={selectedGenre}
        onChange={handleGenreChange}
        {...dropdownProps}
      />
      <Dropdown
        options={saleMethodOptions}
        value={selectedSaleMethod}
        onChange={handleSaleMethodChange}
        {...dropdownProps}
      />
      <Dropdown
        options={soldOutOptions}
        value={selectedSoldOut}
        onChange={handleSoldOutChange}
        {...dropdownProps}
      />
    </>
  );

  return (
    <div className="mt-[20px] md:mt-[30px]">
      <div className="flex items-center gap-[12px] md:gap-[25px]">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen((prev) => !prev)}
          aria-label="filter"
          className="flex h-[56px] w-[56px] shrink-0 items-center justify-center border border-(--gray-gray200) rounded-[2px] md:hidden"
        >
          <Image src={icFilter} alt="" width={24} height={24} />
        </button>

        <div className="relative w-full md:max-w-[320px]">
          <input
            type="text"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
            placeholder={'\uAC80\uC0C9'}
            className="w-full h-[56px] pl-[20px] pr-[50px] text-[14px] text-(--white-white) bg-(--black-black) border border-(--gray-gray200) rounded-[2px] outline-none md:h-auto md:py-[9.5px] lg:py-[12px]"
          />

          <Image
            src={icSearch}
            alt=""
            width={24}
            height={24}
            className="absolute top-1/2 -translate-y-1/2 right-[20px]"
          />
        </div>

        <div className="hidden items-center gap-[25px] md:flex">
          {renderFilterDropdowns()}
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="mt-[12px] grid grid-cols-2 gap-[8px] md:hidden">
          {renderFilterDropdowns({ type: 'sort', widthClass: 'w-full' })}
        </div>
      )}
    </div>
  );
};

export default MySalesFilter;
