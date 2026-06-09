'use client';

import { fetchTransactions } from '@/api/marketApi';
import Card from '@/components/ui/Card';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MarketCardList = ({
  keyword,
  filterType,
  filterValue,
  sortBy,
  sortOrder,
}) => {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: [
      'transactions',
      { keyword, filterType, filterValue, sortBy, sortOrder },
    ],
    queryFn: ({ pageParam }) =>
      fetchTransactions({
        pageParam,
        keyword,
        filterType,
        filterValue,
        sortBy,
        sortOrder,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') {
    return (
      <div className="mt-20 text-center text-(--white-white)">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mt-20 text-center text-(--red-red)">
        에러가 발생했습니다: {error?.message}
      </div>
    );
  }

  const allCards = data?.pages.flatMap((page) => page.data || []) || [];

  return (
    <>
      <div className="mt-[20px] grid grid-cols-2 gap-[10px] md:mt-[40px] md:gap-[20px] lg:mt-[60px] lg:grid-cols-3 lg:gap-5">
        {allCards.length === 0 ? (
          <div className="col-span-full py-20 text-center text-(--gray-gray400)">
            조건에 맞는 포토카드가 없습니다.
          </div>
        ) : (
          allCards.map((transaction) => (
            <Link key={transaction.id} href={`/market/${transaction.id}`}>
              <Card
                title={transaction.card?.title}
                imageUrl={transaction.card?.imageUrl}
                grade={transaction.card?.grade}
                genre={transaction.card?.genre}
                nickname={transaction.seller?.nickname}
                price={transaction.price}
                remainingQuantity={transaction.remainingQuantity}
                totalQuantity={transaction.totalQuantity}
                isSoldOut={transaction.remainingQuantity === 0}
              />
            </Link>
          ))
        )}
      </div>
      {/* 무한 스크롤 트리거 역할 */}
      <div ref={ref} className="h-10 mt-5 flex justify-center items-center">
        {isFetchingNextPage && (
          <span className="text-(--gray-gray400)">더 불러오는 중...</span>
        )}
      </div>
    </>
  );
};

export default MarketCardList;
