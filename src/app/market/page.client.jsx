'use client';

import React, { useState } from 'react';
import MarketHeader from './(components)/MarketHeader';
import MarketFilter from './(components)/MarketFilter';
import MarketCardList from './(components)/MarketCardList';
import useDebounce from '@/hooks/useDebounce';
import PhotoCardSelectModal from '@/components/Modal/PhotoCardSelectModal/PhotoCardSelectModal';
import PhotoCardSellModal from '@/components/Modal/PhotoCardSellModal/PhotoCardSellModal';
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFilterOpen, setFilterIsOpen] = useState(false);

  const handleSaleOpen = () => {
    setFilterIsOpen(false);
    setSelectedCard(null);
    setIsOpen(true);
  };

  const handleSaleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  const handleSelectCard = (card) => {
    setIsOpen(false);
    setSelectedCard(card);
  };

  const handleSellClose = () => {
    setSelectedCard(null);
  };

  const handleFilterOpen = () => {
    setIsOpen(false);
    setSelectedCard(null);
    setFilterIsOpen(true);
  };

  const handleFilterClose = () => {
    setFilterIsOpen(false);
  };

  // 모바일 필터 시트와 태블릿, 데스크탑 드롭다운 동기화
  const getInitialSelection = () => {
    const baseSelection = { grade: null, genre: null, saleStatus: null };

    if (!filterType || !filterValue) return baseSelection;

    const tabKeyMap = {
      GRADE: 'grade',
      GENRE: 'genre',
      SALE_STATUS: 'saleStatus',
    };
    const activeTab = tabKeyMap[filterType];

    if (activeTab) {
      const uiLabel = Object.keys(FILTER_KEY_MAP[activeTab]).find(
        (key) => FILTER_KEY_MAP[activeTab][key] === filterValue,
      );
      baseSelection[activeTab] = uiLabel || null;
    }

    return baseSelection;
  };

  // 모바일 필터 적용 핸들러
  const handleLookupMobileFilter = (currentSelection) => {
    const tabs = ['grade', 'genre', 'saleStatus'];
    const selectedTab = tabs.find((key) => currentSelection[key] !== null);

    if (selectedTab) {
      const uiLabel = currentSelection[selectedTab];
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
      <div className="fixed bottom-0 left-0 right-0 py-[15px] px-[15px] mx-auto w-full max-w-[1480px] md:hidden z-50">
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
        onSelectCard={handleSelectCard}
      />
      <PhotoCardSellModal
        card={selectedCard}
        isOpen={selectedCard !== null}
        onClose={handleSellClose}
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
