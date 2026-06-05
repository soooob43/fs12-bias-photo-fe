import React from 'react';
import MarketHeader from './(components)/MarketHeader';
import MarketFilter from './(components)/MarketFilter';
import MarketCardList from './(components)/MarketCardList';

const MarketPlacePage = () => {
  return (
    <div className="w-full max-w-[1480px] mx-auto px-[15px]">
      <MarketHeader />
      <MarketFilter />
      <MarketCardList />
      <div className="sticky bottom-0 left-0 right-0 py-[15px] mx-auto max-w-[1480px] md:hidden">
        <button className="w-full max-h-[60px] py-[17px] bg-(--main-main) text-(--black-black) font-semibold text-[16px] rounded-[2px]">
          나의 포토카드 판매하기
        </button>
      </div>
    </div>
  );
};

export default MarketPlacePage;
