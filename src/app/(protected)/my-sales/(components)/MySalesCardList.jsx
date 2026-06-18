'use client';

import { useQuery } from '@tanstack/react-query';
import MySaleCard from './MySaleCard';
import Spinner from '@/components/ui/Spinner';
import styles from './MySaleCardList.module.css';
import MySalesFilter from './MySalesFilter';
import MySaleGradeStats from './MySaleGradeStats';
import { useMe } from '@/hooks/useMe';
import { useEffect, useState } from 'react';
import { fetchMySales } from '@/api/mySaleApi';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';

const MySalesCardList = () => {
  const { data: user } = useMe();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [saleMethod, setSaleMethod] = useState('');
  const [soldOut, setSoldOut] = useState('');

  const debouncedKeyword = useDebounce(keyword, 400);

  useEffect(() => {
    setPage(1);
  }, [debouncedKeyword, grade, genre, saleMethod, soldOut]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      'my-sales',
      page,
      debouncedKeyword,
      grade,
      genre,
      saleMethod,
      soldOut,
    ],
    queryFn: () =>
      fetchMySales({
        page,
        limit: 6,
        keyword: debouncedKeyword,
        grade,
        genre,
        saleMethod,
        soldOut,
      }),
  });

  const photoCards = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 0;
  const totalQuantity = data?.totalQuantity ?? 0;
  const gradeCounts = data?.gradeCounts ?? {};

  return (
    <>
      <MySaleGradeStats
        nickname={user?.nickname}
        totalQuantity={totalQuantity}
        gradeCounts={gradeCounts}
      />

      <MySalesFilter
        keyword={keyword}
        setKeyword={setKeyword}
        setGrade={setGrade}
        setGenre={setGenre}
        setSaleMethod={setSaleMethod}
        setSoldOut={setSoldOut}
      />
      <div className="py-[2.5rem]">
        {isPending && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5 mt-10">
            <Spinner />
            <p className="text-(--gray-gray300) text-[1rem] font-medium animate-pulse">
              포토카드를 불러오는 중입니다...
            </p>
          </div>
        )}

        {isError && (
          <p className={`${styles.status} ${styles.error}`}>
            {error?.message || '포토카드를 불러오지 못했습니다.'}
          </p>
        )}

        {!isPending && !isError && photoCards.length === 0 && (
          <p className={styles.status}>조건에 맞는 포토카드가 없습니다.</p>
        )}

        {!isPending && !isError && photoCards.length > 0 && (
          <ul className="grid grid-cols-2 gap-[10px] md:gap-[20px] lg:grid-cols-3">
            {photoCards.map((card, index) => (
              <li key={`${card.transactionId}-${index}`}>
                {card.status === 'SOLD_OUT' ? (
                  <MySaleCard
                    title={card.title}
                    imageUrl={card.imageUrl}
                    grade={card.grade}
                    genre={card.genre}
                    nickname={card.creatorNickname}
                    price={card.price}
                    remainingQuantity={card.remainingQuantity}
                    status={card.status}
                    isSoldOut={card.status === 'SOLD_OUT'}
                  />
                ) : (
                  <Link href={`/market/${card.transactionId}`}>
                    <MySaleCard
                      title={card.title}
                      imageUrl={card.imageUrl}
                      grade={card.grade}
                      genre={card.genre}
                      nickname={card.creatorNickname}
                      price={card.price}
                      remainingQuantity={card.remainingQuantity}
                      status={card.status}
                      isSoldOut={card.status === 'SOLD_OUT'}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="페이지 이동">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            aria-label="이전 페이지"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={page === pageNumber ? styles.currentPage : ''}
                aria-current={page === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => current + 1)}
            aria-label="다음 페이지"
          >
            ›
          </button>
        </nav>
      )}
    </>
  );
};

export default MySalesCardList;
