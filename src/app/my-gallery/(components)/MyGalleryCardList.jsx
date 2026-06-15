'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMyGallery } from '@/api/galleryApi';
import Card from '@/components/ui/Card';
import useDebounce from '@/hooks/useDebounce';
import { FILTER_CONFIG, FILTER_KEY_MAP } from '@/constants/filter';
import icFilter from '@/assets/icons/ic_filter.svg';
import icSearch from '@/assets/icons/ic_search.svg';
import styles from './MyGalleryCardList.module.css';
import { useMe } from '@/hooks/useMe';

/*---------------------------
 마이갤러리 MyGalleryCardList 작업 
  add : 2026.06.15 윤소정
----------------------------*/

const GRADE_STYLES = {
  COMMON: styles.common,
  RARE: styles.rare,
  SUPER_RARE: styles.superRare,
  LEGENDARY: styles.legendary,
};

const MyGalleryCardList = () => {
  const { data: user } = useMe();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const debouncedKeyword = useDebounce(keyword, 400);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['my-gallery', { page, keyword: debouncedKeyword, grade, genre }],
    queryFn: () =>
      fetchMyGallery({
        page,
        limit: 6,
        keyword: debouncedKeyword,
        grade,
        genre,
      }),
  });

  const photoCards = data?.data ?? [];
  const gradeCounts = data?.gradeCounts ?? {};
  const totalQuantity = data?.totalQuantity ?? 0;
  const totalPages = data?.pagination?.totalPages ?? 0;

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handleGradeChange = (value) => {
    setGrade(value);
    setPage(1);
  };

  const handleGenreChange = (value) => {
    setGenre(value);
    setPage(1);
  };

  const handleGradeBadgeClick = (value) => {
    handleGradeChange(grade === value ? '' : value);
  };

  return (
    <section>
      <div className={styles.summary}>
        <h2 className={styles.summaryTitle}>
          {user?.nickname ?? '사용자'}님이 보유한 포토카드
          <span>({totalQuantity}장)</span>
        </h2>

        <div className={styles.gradeBadges}>
          {FILTER_CONFIG.grade.options.map((label) => {
            const value = FILTER_KEY_MAP.grade[label];

            return (
              <button
                key={value}
                type="button"
                onClick={() => handleGradeBadgeClick(value)}
                className={`${styles.gradeBadge} ${GRADE_STYLES[value]} ${
                  grade === value ? styles.selectedBadge : ''
                }`}
              >
                {label} {gradeCounts[value] ?? 0}장
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => setIsFilterOpen((current) => !current)}
          className={styles.filterButton}
          aria-label="필터 열기"
        >
          <Image src={icFilter} alt="" width={20} height={20} />
        </button>

        <label className={styles.search}>
          <input
            type="search"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="검색"
          />

          <Image
            src={icSearch}
            alt=""
            width={20}
            height={20}
            className={styles.searchIcon}
          />
        </label>

        <div className={styles.desktopFilters}>
          <select
            value={grade}
            onChange={(event) => handleGradeChange(event.target.value)}
          >
            <option value="">등급</option>

            {FILTER_CONFIG.grade.options.map((label) => (
              <option key={label} value={FILTER_KEY_MAP.grade[label]}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={genre}
            onChange={(event) => handleGenreChange(event.target.value)}
          >
            <option value="">장르</option>

            {FILTER_CONFIG.genre.options.map((label) => (
              <option key={label} value={FILTER_KEY_MAP.genre[label]}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isFilterOpen && (
        <div className={styles.mobileFilters}>
          <select
            value={grade}
            onChange={(event) => handleGradeChange(event.target.value)}
          >
            <option value="">등급</option>

            {FILTER_CONFIG.grade.options.map((label) => (
              <option key={label} value={FILTER_KEY_MAP.grade[label]}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={genre}
            onChange={(event) => handleGenreChange(event.target.value)}
          >
            <option value="">장르</option>

            {FILTER_CONFIG.genre.options.map((label) => (
              <option key={label} value={FILTER_KEY_MAP.genre[label]}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {isPending && (
        <p className={styles.status}>포토카드를 불러오는 중입니다.</p>
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
        <ul className={styles.cardList}>
          {photoCards.map((card) => (
            <li key={card.cardId}>
              <Card
                type="my"
                imageUrl={card.imageUrl}
                title={card.title}
                grade={card.grade}
                genre={card.genre}
                nickname={card.creatorNickname}
                price={card.minimumPrice}
                quantity={card.quantity}
              />
            </li>
          ))}
        </ul>
      )}

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
    </section>
  );
};

export default MyGalleryCardList;
