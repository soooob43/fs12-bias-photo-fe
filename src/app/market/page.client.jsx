'use client';

import React, { useState } from 'react';
import MarketHeader from './(components)/MarketHeader';
import MarketFilter from './(components)/MarketFilter';
import MarketCardList from './(components)/MarketCardList';
import useDebounce from '@/hooks/useDebounce';
import PhotoCardSelectModal from '@/components/features/PhotoCardSelectModal/PhotoCardSelectModal';
import { MobileFilterSheet } from './(components)/MobileFilterSheet';
import { FILTER_KEY_MAP } from '@/constants/filter';

const ClientPage = () => {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  const [filterType, setFilterType] = useState(null); // 'GRADE' | 'GENRE' | 'SALE_STATUS'
  const [filterValue, setFilterValue] = useState(null);

  const [sortBy, setSortBy] = useState('DATE');
  const [sortOrder, setSortOrder] = useState('DESC');

  const [isOpen, setIsOpen] = useState(false);
  const [isFilterOpen, setFilterIsOpen] = useState(false);

  const handleSaleOpen = () => {
    setFilterIsOpen(false);
    setIsOpen(true);
  };

  const handleSaleClose = () => {
    setIsOpen(false);
  };

  const handleFilterOpen = () => {
    setIsOpen(false);
    setFilterIsOpen(true);
  };

  const handleFilterClose = () => {
    setFilterIsOpen(false);
  };

  // ⭐️ 2. 부모의 상태를 MobileFilterSheet가 읽을 수 있는 객체 형태로 변환
  const getInitialSelection = () => {
    const baseSelection = { grade: null, genre: null, saleStatus: null };

    // 필터가 아예 적용되지 않은 상태면 빈 객체 반환
    if (!filterType || !filterValue) return baseSelection;

    // 백엔드 타입('GENRE')을 프론트엔드 탭 이름('genre')으로 매핑
    const tabKeyMap = {
      GRADE: 'grade',
      GENRE: 'genre',
      SALE_STATUS: 'saleStatus',
    };
    const activeTab = tabKeyMap[filterType];

    // 백엔드 값('ALBUM')을 프론트엔드 한글 글자('앨범')로 역추적
    if (activeTab) {
      const uiLabel = Object.keys(FILTER_KEY_MAP[activeTab]).find(
        (key) => FILTER_KEY_MAP[activeTab][key] === filterValue,
      );
      baseSelection[activeTab] = uiLabel || null;
    }

    return baseSelection;
  };

  // ⭐️ 3. 모바일 시트에서 '확인'을 눌렀을 때 부모 상태를 업데이트하는 함수
  const handleLookupMobileFilter = (draftSelection) => {
    // draftSelection은 { grade: null, genre: '앨범', saleStatus: null } 형태입니다.
    const tabs = ['grade', 'genre', 'saleStatus'];
    const selectedTab = tabs.find((key) => draftSelection[key] !== null);

    if (selectedTab) {
      // 선택된 탭이 있다면 백엔드용 데이터로 변환
      const uiLabel = draftSelection[selectedTab];
      const backendValue = FILTER_KEY_MAP[selectedTab][uiLabel];

      const typeMap = {
        grade: 'GRADE',
        genre: 'GENRE',
        saleStatus: 'SALE_STATUS',
      };

      setFilterType(typeMap[selectedTab]);
      setFilterValue(backendValue);
    } else {
      // 전체 초기화를 눌렀을 경우
      setFilterType(null);
      setFilterValue(null);
    }
  };

  return (
    <>
      <MarketHeader
        keyword={keyword}
        setKeyword={setKeyword}
        onOpen={handleSaleOpen}
      />
      <MarketFilter
        keyword={keyword}
        filterType={filterType}
        filterValue={filterValue}
        setKeyword={setKeyword}
        setFilterType={setFilterType}
        setFilterValue={setFilterValue}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        isOpen={isFilterOpen}
        onOpen={handleFilterOpen}
      />
      <MarketCardList
        keyword={debouncedKeyword}
        filterType={filterType}
        filterValue={filterValue}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <div className="sticky bottom-0 left-0 right-0 py-[15px] mx-auto max-w-[1480px] md:hidden">
        <button
          onClick={handleSaleOpen}
          className="w-full max-h-[60px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px] cursor-pointer hover:bg-[#b8c41a]"
        >
          나의 포토카드 판매하기
        </button>
      </div>
      <PhotoCardSelectModal
        isOpen={isOpen}
        onClose={handleSaleClose}
        title="나의 포토카드 판매하기"
      />
      {isFilterOpen ? (
        <MobileFilterSheet
          tabs={['grade', 'genre', 'saleStatus']}
          onClose={handleFilterClose}
          initialSelection={getInitialSelection()} // 변환된 초기값 주입
          onLookup={handleLookupMobileFilter} // 필터 적용 핸들러 연결
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ClientPage;
