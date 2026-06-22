/* 판매하기 및 교환하기 모달 공통 컴포넌트*/

'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import CommonModal from '@/components/ui/CommonModal/CommonModal';
import { fetchAvailableCards } from '@/api/transactionApi';
import { FILTER_CONFIG, FILTER_KEY_MAP } from '@/constants/filter';
import icSearch from '@/assets/icons/ic_search.svg';
import icFilter from '@/assets/icons/ic_filter.svg';
import { brBold } from '@/fonts';
import styles from './PhotoCardSelectModal.module.css';
import { GENRE_MAP, GRADE_MAP } from '@/constants/card';

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
    const cards = data?.data ?? [];
    const normalizedKeyword = keyword.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesKeyword =
        !normalizedKeyword ||
        card.title.toLowerCase().includes(normalizedKeyword);
      const matchesGrade = !grade || card.grade === grade;
      const matchesGenre = !genre || card.genre === genre;

      return matchesKeyword && matchesGrade && matchesGenre;
    });
  }, [data, grade, genre, keyword]);

  const handleSelectCard = (card) => {
    if (onSelectCard) {
      onSelectCard(card);
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={`${styles.eyebrow} ${brBold.className}`}>마이갤러리</p>
        <h1 className={`${styles.title} ${brBold.className}`}>{title}</h1>

        <div className={styles.divider} />

        <div className={styles.controls}>
          <button
            className={styles.filterButton}
            type="button"
            aria-label="필터"
          >
            <Image src={icFilter} alt="" width={24} height={24} />
            필터
          </button>

          <label className={styles.search}>
            <Image
              className={styles.searchIcon}
              src={icSearch}
              alt=""
              width={20}
              height={20}
            />
            <input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="검색"
            />
            <span>검색</span>
          </label>

          <select
            className={`${styles.select} ${grade ? styles.selectedSelect : ''}`}
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
            className={`${styles.select} ${genre ? styles.selectedSelect : ''}`}
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option value="">장르</option>
            {FILTER_CONFIG.genre.options.map((label) => (
              <option key={label} value={FILTER_KEY_MAP.genre[label]}>
                {label}
              </option>
            ))}
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
                  <h2 className={`${styles.cardTitle} truncate`}>
                    {card.title}
                  </h2>

                  <div className={styles.meta}>
                    <span
                      className={
                        styles[
                          card.grade.replaceAll(/[\s_]/g, '').toLowerCase()
                        ]
                      }
                    >
                      {GRADE_MAP[card.grade]}
                    </span>
                    <span className={styles.genre}>
                      {GENRE_MAP[card.genre]}
                    </span>
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
