import React from 'react';
import MarketClientPage from './page.client';
import MarketPlaceHeader from './(components)/MarketPlaceHeader';

export const metadata = {
  title: '마켓플레이스',
  description:
    '다양한 장르와 등급의 포토카드를 탐색하고 원하는 카드를 구매 및 교환해보세요.',
  openGraph: {
    title: '마켓플레이스 | 최애의 포토',
    description:
      '다양한 장르와 등급의 포토카드를 탐색하고 원하는 카드를 구매 및 교환해보세요.',
    url: '/market',
  },
};

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
