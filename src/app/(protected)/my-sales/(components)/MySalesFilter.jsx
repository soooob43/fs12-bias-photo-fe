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
import RefreshIcon from '@/components/icons/RefreshIcon';

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

  const handleReset = () => {
    setKeyword('');
    setGrade('');
    setGenre('');
    setSaleMethod('');
    setSoldOut('');

    setSelectedGrade(MY_SALES_FILTER_CONFIG.grade.label);
    setSelectedGenre(MY_SALES_FILTER_CONFIG.genre.label);
    setSelectedSaleMethod(MY_SALES_FILTER_CONFIG.saleMethod.label);
    setSelectedSoldOut(MY_SALES_FILTER_CONFIG.soldOut.label);
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
      <button
        type="button"
        onClick={handleReset}
        className="group p-[0.125rem] cursor-pointer"
      >
        <RefreshIcon className="text-(--gray-gray400) transition-colors duration-150 group-hover:text-(--white-white)" />
      </button>
    </>
  );

  return (
    <div className="mt-[1.25rem]">
      <div className="flex items-center gap-[0.75rem] md:gap-[1.5625rem]">
        <button
          type="button"
          onClick={() => setIsMobileFilterOpen((prev) => !prev)}
          aria-label="filter"
          className="flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center border border-(--gray-gray200) rounded-[0.125rem] md:hidden"
        >
          <Image src={icFilter} alt="" width={24} height={24} />
        </button>

        <div className="relative w-full md:max-w-[20rem]">
          <input
            type="text"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
            }}
            placeholder={'\uAC80\uC0C9'}
            className="w-full h-[3.5rem] pl-[1.25rem] pr-[3.125rem] text-[0.875rem] text-(--white-white) bg-(--black-black) border border-(--gray-gray200) rounded-[0.125rem] outline-none md:h-auto md:py-[0.5938rem] lg:py-[0.75rem]"
          />

          <Image
            src={icSearch}
            alt=""
            width={24}
            height={24}
            className="absolute top-1/2 -translate-y-1/2 right-[1.25rem]"
          />
        </div>

        <div className="hidden items-center gap-[1.5625rem] md:flex">
          {renderFilterDropdowns()}
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="mt-[0.75rem] grid grid-cols-2 gap-[0.5rem] md:hidden">
          {renderFilterDropdowns({ type: 'sort', widthClass: 'w-full' })}
        </div>
      )}
    </div>
  );
};

export default MySalesFilter;
