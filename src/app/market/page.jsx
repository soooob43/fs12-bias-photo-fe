import React from 'react';
import MarketClientPage from './page.client';
import MarketPlaceHeader from './(components)/MarketPlaceHeader';

const MarketPlacePage = () => {
  return (
    <>
      <MarketPlaceHeader />
      <div className="w-full max-w-[1480px] mx-auto px-[15px] pb-[90px] md:pb-0">
        <MarketClientPage />
      </div>
    </>
  );
};

export default MarketPlacePage;
