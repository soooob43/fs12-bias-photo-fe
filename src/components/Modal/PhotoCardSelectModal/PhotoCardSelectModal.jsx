/* 판매하기 및 교환하기 모달 공통 컴포넌트*/

'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CommonModal from '@/components/ui/CommonModal/CommonModal';
import { fetchAvailableCards } from '@/api/transactionApi';
import { DEV_MOCK_PHOTO_CARD } from '@/constants/mockPhotoCard';
import styles from './PhotoCardSelectModal.module.css';

export default function PhotoCardSelectModal({
  isOpen,
  onClose,
  title,
  onSelectCard,
}) {
  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');

  const { data, isPending, isError } = useQuery({
    queryKey: ['available-photo-cards'],
    queryFn: fetchAvailableCards,
    enabled: isOpen,
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

  const handleSelectCard = (card) => {
    if (onSelectCard) {
      onSelectCard(card);
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>마이갤러리</p>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.divider} />

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

        <ul className={styles.cardList}>
          {photoCards.map((card) => (
            <li key={card.cardId}>
              <button
                className={styles.card}
                type="button"
                onClick={() => handleSelectCard(card)}
              >
                <img
                  className={styles.thumbnail}
                  src={card.imageUrl}
                  alt={card.title}
                />

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{card.title}</h2>

                  <div className={styles.meta}>
                    <span
                      className={
                        styles[
                          card.grade.replaceAll(/[\s_]/g, '').toLowerCase()
                        ]
                      }
                    >
                      {card.grade}
                    </span>
                    <span className={styles.genre}>{card.genre}</span>
                  </div>

                  <div className={styles.cardDivider} />

                  <dl className={styles.info}>
                    <div>
                      <dt>가격</dt>
                      <dd>{card.minimumPrice ?? 0} P</dd>
                    </div>
                    <div>
                      <dt>수량</dt>
                      <dd>{card.quantity}</dd>
                    </div>
                  </dl>

                  <p className={styles.logo}>최애의포토</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </CommonModal>
  );
}
