'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icFilter from '@/assets/icons/ic_filter.svg';
import icSearch from '@/assets/icons/ic_search.svg';
import Dropdown from '@/components/ui/Dropdown';
import { FILTER_KEY_MAP, FILTER_CONFIG } from '@/constants/filter';

const MarketFilter = ({
  keyword,
  filterType,
  filterValue,
  setKeyword,
  setFilterType,
  setFilterValue,
  setSortBy,
  setSortOrder,
  onOpen,
}) => {
  const gradeOptions = FILTER_CONFIG.grade.options;
  const genreOptions = FILTER_CONFIG.genre.options;
  const saleStatusOptions = FILTER_CONFIG.saleStatus.options;
  const sortOptions = FILTER_CONFIG.sort.options;

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const getUiLabel = (tabKey, backValue) => {
    if (!backValue) return null;
    const map = FILTER_KEY_MAP[tabKey];
    return Object.keys(map).find((key) => map[key] === backValue) || backValue;
  };

  const displayGrade =
    filterType === 'GRADE' && filterValue
      ? getUiLabel('grade', filterValue)
      : '등급';
  const displayGenre =
    filterType === 'GENRE' && filterValue
      ? getUiLabel('genre', filterValue)
      : '장르';
  const displayStatus =
    filterType === 'SALE_STATUS' && filterValue
      ? getUiLabel('saleStatus', filterValue)
      : '판매 상태';

  const handleFilterChange = (type, value) => {
    setFilterType(type);

    if (type === 'SALE_STATUS') {
      setFilterValue(FILTER_KEY_MAP.saleStatus[value] || value);
    } else if (type === 'GENRE') {
      setFilterValue(FILTER_KEY_MAP.genre[value] || value);
    } else if (type === 'GRADE') {
      setFilterValue(FILTER_KEY_MAP.grade[value] || value);
    } else {
      setFilterValue(value);
    }
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (value) => {
    setSelectedSort(value);

    const sortConfig = FILTER_KEY_MAP.sort[value];
    if (sortConfig) {
      setSortBy(sortConfig.sortBy);
      setSortOrder(sortConfig.sortOrder);
    }
  };

  return (
    <>
      <div className="mt-[15px] flex justify-between items-center md:mt-[20px]">
        <button
          onClick={onOpen}
          className="p-[6.5px] border border-(--gray-gray200) rounded-[2px] cursor-pointer md:hidden"
        >
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
          <Dropdown
            options={gradeOptions}
            value={displayGrade}
            onChange={(val) => handleFilterChange('GRADE', val)}
          />
          <Dropdown
            options={genreOptions}
            value={displayGenre}
            onChange={(val) => handleFilterChange('GENRE', val)}
          />
          <Dropdown
            options={saleStatusOptions}
            value={displayStatus}
            onChange={(val) => handleFilterChange('SALE_STATUS', val)}
          />
        </div>
        <Dropdown
          type={'sort'}
          options={sortOptions}
          value={selectedSort}
          onChange={handleSortChange}
        />
      </div>
    </>
  );
};

export default MarketFilter;
