import Header from '@/components/layout/Header';
import MobileGNB from '@/components/ui/GNB/MobileGNB';
import React from 'react';

const MySaleCommonHeader = () => {
  return (
    <>
      <MobileGNB title="나의 판매 포토카드" href="/my-sales" />
      <Header />
    </>
  );
};

export default MySaleCommonHeader;
