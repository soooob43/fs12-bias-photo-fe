'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import icFilter from '@/assets/icons/ic_filter.svg';
import icSearch from '@/assets/icons/ic_search.svg';
import Dropdown from '@/components/ui/Dropdown';

/*----------------------------------
    백엔드 Enum 변환을 위한 매핑 객체
-----------------------------------*/
const GENRE_VALUE_MAP = {
  앨범: 'ALBUM',
  특전: 'BENEFIT',
  팬싸: 'FAN_SIGN',
  시즌그리팅: 'SEASON_GREETING',
  팬미팅: 'FAN_MEETING',
  콘서트: 'CONCERT',
  MD: 'MD',
  콜라보: 'COLLAB',
  팬클럽: 'FAN_CLUB',
  기타: 'ETC',
};

const GRADE_VALUE_MAP = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  'SUPER RARE': 'SUPER_RARE',
  LEGENDARY: 'LEGENDARY',
};

const MarketFilter = ({
  keyword,
  setKeyword,
  setFilterType,
  setFilterValue,
  setSortBy,
  setSortOrder,
}) => {
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
  const saleStatusOptions = ['판매중', '매진'];
  const sortOptions = ['최신순', '오래된순', '낮은 가격순', '높은 가격순'];

  // 드롭다운 UI에 보여줄 로컬 텍스트 상태
  const [selectedGrade, setSelectedGrade] = useState('등급');
  const [selectedGenre, setSelectedGenre] = useState('장르');
  const [selectedStatus, setSelectedStatus] = useState('판매 상태');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const handleFilterChange = (type, value, setLocalState) => {
    // 1. 모든 드롭다운의 UI 텍스트를 기본값으로 초기화
    setSelectedGrade('등급');
    setSelectedGenre('장르');
    setSelectedStatus('판매 상태');

    // 2. 현재 선택한 드롭다운만 값 변경
    setLocalState(value);

    // 3. 부모(최상위) 컴포넌트로 필터 타입과 값 전달
    setFilterType(type);

    // 판매 상태의 경우 백엔드가 인식하는 'ON_SALE', 'SOLD_OUT'으로 변환해서 전달
    if (type === 'SALE_STATUS') {
      setFilterValue(value === '판매중' ? 'ON_SALE' : 'SOLD_OUT');
    } else if (type === 'GENRE') {
      setFilterValue(GENRE_VALUE_MAP[value] || value);
    } else if (type === 'GRADE') {
      setFilterValue(GRADE_VALUE_MAP[value] || value);
    } else {
      setFilterValue(value);
    }
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (value) => {
    setSelectedSort(value);

    if (value === '최신순') {
      setSortBy('DATE');
      setSortOrder('DESC');
    } else if (value === '오래된순') {
      setSortBy('DATE');
      setSortOrder('ASC');
    } else if (value === '낮은 가격순') {
      setSortBy('PRICE');
      setSortOrder('ASC');
    } else if (value === '높은 가격순') {
      setSortBy('PRICE');
      setSortOrder('DESC');
    }
  };

  // const [grade, setGrade] = useState(gradeOptions[0]);
  // const [genre, setGenre] = useState(genreOptions[0]);
  // const [transaction, setTransaction] = useState(transactionOptions[0]);
  // const [orderBy, setOrderBy] = useState(sortOptions[0]);
  // const [keyword, setKeyword] = useState('');
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
        <Dropdown
          options={gradeOptions}
          value={selectedGrade}
          onChange={(val) => handleFilterChange('GRADE', val, setSelectedGrade)}
        />
        <Dropdown
          options={genreOptions}
          value={selectedGenre}
          onChange={(val) => handleFilterChange('GENRE', val, setSelectedGenre)}
        />
        <Dropdown
          options={saleStatusOptions}
          value={selectedStatus}
          onChange={(val) =>
            handleFilterChange('SALE_STATUS', val, setSelectedStatus)
          }
        />
      </div>
      <Dropdown
        type={'sort'}
        options={sortOptions}
        value={selectedSort}
        onChange={handleSortChange}
      />
    </div>
  );
};

export default MarketFilter;
