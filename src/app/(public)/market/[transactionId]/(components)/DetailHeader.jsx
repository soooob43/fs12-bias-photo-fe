import Header from '@/components/layout/Header';
import MobileGNB from '@/components/ui/GNB/MobileGNB';
import React from 'react';

const DetailHeader = () => {
  return (
    <>
      <MobileGNB title="마켓플레이스" href="/market" />
      <Header />
    </>
  );
};

export default DetailHeader;
