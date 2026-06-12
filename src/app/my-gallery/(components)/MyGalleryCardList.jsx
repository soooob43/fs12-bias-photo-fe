'use client';

import { fetchAvailableCards } from '@/api/transactionApi';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import styles from '@/components/Modal/PhotoCardSelectModal/PhotoCardSelectModal.module.css';
import { DEV_MOCK_PHOTO_CARD } from '@/constants/mockPhotoCard';
import Card from '@/components/ui/Card';

const MyGalleryCardList = () => {
  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');

  const { data, isPending, isError } = useQuery({
    queryKey: ['available-photo-cards'],
    queryFn: fetchAvailableCards,
  });

  const photoCards = useMemo(() => {
    const availableCards = data?.data ?? [];
    const cards =
      !isPending && !isError && availableCards.length === 0
        ? [DEV_MOCK_PHOTO_CARD]
        : availableCards;
    const normalizedKeyword = keyword.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesKeyword =
        !normalizedKeyword ||
        card.title.toLowerCase().includes(normalizedKeyword);
      const matchesGrade = !grade || card.grade === grade;
      const matchesGenre = !genre || card.genre === genre;

      return matchesKeyword && matchesGrade && matchesGenre;
    });
  }, [data, grade, genre, isError, isPending, keyword]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button className={styles.filterButton} type="button">
          필터
        </button>

        <label className={styles.search}>
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="검색"
          />
          <span>검색</span>
        </label>

        <select
          className={styles.select}
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
        >
          <option value="">등급</option>
          <option value="COMMON">COMMON</option>
          <option value="RARE">RARE</option>
          <option value="SUPER_RARE">SUPER RARE</option>
          <option value="LEGENDARY">LEGENDARY</option>
        </select>

        <select
          className={styles.select}
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value="">장르</option>
          <option value="풍경">풍경</option>
          <option value="인물">인물</option>
          <option value="사물">사물</option>
        </select>
      </div>

      {isPending && (
        <p className={styles.status}>포토카드를 불러오는 중입니다.</p>
      )}
      {isError && (
        <p className={styles.status}>
          판매 가능한 포토카드를 불러오지 못했습니다.
        </p>
      )}
      {!isPending && !isError && photoCards.length === 0 && (
        <p className={styles.status}>판매 가능한 포토카드가 없습니다.</p>
      )}

      <ul className="mt-[20px] grid grid-cols-2 gap-[10px] md:mt-[40px] md:gap-[20px] lg:mt-[60px] lg:grid-cols-3 lg:gap-5">
        {photoCards.map((card) => (
          <li key={card.cardId}>
            <Card
              type="my"
              imageUrl={card.imageUrl}
              title={card.title}
              grade={card.grade}
              genre={card.genre}
              nickname={card.nickname}
              price={card.minimumPrice}
              quantity={card.quantity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyGalleryCardList;
