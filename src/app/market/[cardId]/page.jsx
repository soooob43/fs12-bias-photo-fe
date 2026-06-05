'use client';

import React, { useState } from 'react';
import SellerDetail from './(components)/SellerDetail';
import BuyerDetail from './(components)/BuyerDetail';

export default function CardDetailPage({ params }) {
  const { cardId } = React.use(params); //URL 내 cardID

  const [isSeller, setIsSeller] = useState(true); // true:판매자, false:구매자

  return (
    <div className="container mx-auto py-[3.75rem] flex flex-col justify-center items-center">
      {/* 조건부 렌더링 분기 */}
      {isSeller ? (
        <SellerDetail cardId={cardId} />
      ) : (
        <BuyerDetail cardId={cardId} />
      )}
    </div>
  );
}
