'use client';

import MySaleCard from './MySaleCard';

const mockData = [
  {
    transactionId: 1,
    title: '스페인 여행',
    imageUrl: '',
    grade: 'COMMON',
    genre: 'ETC',
    creatorNickname: '프로여행러',
    price: 4,
    remainingQuantity: 1,
    status: 'ON_SALE',
  },
  {
    transactionId: 2,
    title: 'How Far I’ll Go',
    imageUrl: '',
    grade: 'RARE',
    genre: 'ETC',
    creatorNickname: '랍스타',
    price: 4,
    remainingQuantity: 1,
    status: 'ON_EXCHANGE',
  },
  {
    transactionId: 3,
    title: '우리집 앞마당',
    imageUrl: '',
    grade: 'LEGENDARY',
    genre: 'ETC',
    creatorNickname: '미쓰손',
    price: 4,
    remainingQuantity: 0,
    status: 'SOLD_OUT',
  },
];

const mySaleCardList = () => {
  return (
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3">
      {mockData.map((sale) => (
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

export default mySaleCardList;