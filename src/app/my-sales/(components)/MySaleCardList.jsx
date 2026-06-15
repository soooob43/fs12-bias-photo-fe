'use client';

import MySaleCard from './MySaleCard';

const MySaleCardList = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        판매 중인 포토카드가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
      {cards.map((sale) => (
        <MySaleCard
          key={sale.transactionId}
          title={sale.title}
          imageUrl={sale.imageUrl}
          grade={sale.grade}
          genre={sale.genre}
          nickname={sale.creatorNickname}
          price={sale.price}
          remainingQuantity={sale.remainingQuantity}
          status={sale.status}
          isSoldOut={sale.status === 'SOLD_OUT'}
        />
      ))}
    </div>
  );
};

export default MySaleCardList;
