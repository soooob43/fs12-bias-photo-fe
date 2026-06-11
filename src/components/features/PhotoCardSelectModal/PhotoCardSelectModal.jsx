/* 판매하기 및 교환하기 모달 공통 컴포넌트*/
'use client';

import CommonModal from '@/components/ui/CommonModal/CommonModal';
import styles from './PhotoCardSelectModal.module.css';

const photoCards = [
  {
    id: 1,
    title: '스페인 여행',
    grade: 'RARE',
    genre: '풍경',
    creator: '프로여행러',
    price: 4,
    count: 1,
    imageClassName: 'spain',
  },
  {
    id: 2,
    title: '스페인 여행',
    grade: 'RARE',
    genre: '풍경',
    creator: '프로여행러',
    price: 4,
    count: 1,
    imageClassName: 'spain',
  },
  {
    id: 3,
    title: '스페인 여행',
    grade: 'RARE',
    genre: '풍경',
    creator: '프로여행러',
    price: 4,
    count: 1,
    imageClassName: 'spain',
  },
  {
    id: 4,
    title: '스페인 여행',
    grade: 'RARE',
    genre: '풍경',
    creator: '프로여행러',
    price: 4,
    count: 1,
    imageClassName: 'spain',
  },
];

export default function PhotoCardSelectModal({
  isOpen,
  onClose,
  title = '나의 포토카드 판매하기',
  onSelectCard,
}) {
    
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
            <input type="text" placeholder="검색" />
            <span>검색</span>
          </label>

          <select className={styles.select} defaultValue="">
            <option value="" disabled>
              등급
            </option>
            <option value="COMMON">COMMON</option>
            <option value="RARE">RARE</option>
            <option value="SUPER RARE">SUPER RARE</option>
            <option value="LEGENDARY">LEGENDARY</option>
          </select>

          <select className={styles.select} defaultValue="">
            <option value="" disabled>
              장르
            </option>
            <option value="풍경">풍경</option>
            <option value="인물">인물</option>
            <option value="사물">사물</option>
          </select>
        </div>

        <ul className={styles.cardList}>
          {photoCards.map((card) => (
            <li key={card.id}>
              <button
                className={styles.card}
                type="button"
                onClick={() => handleSelectCard(card)}
              >
                <div
                  className={`${styles.thumbnail} ${styles[card.imageClassName]}`}
                />

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{card.title}</h2>

                  <div className={styles.meta}>
                    <span
                      className={
                        styles[card.grade.replace(' ', '').toLowerCase()]
                      }
                    >
                      {card.grade}
                    </span>
                    <span className={styles.genre}>{card.genre}</span>
                    <span className={styles.creator}>{card.creator}</span>
                  </div>

                  <div className={styles.cardDivider} />

                  <dl className={styles.info}>
                    <div>
                      <dt>가격</dt>
                      <dd>{card.price} P</dd>
                    </div>
                    <div>
                      <dt>수량</dt>
                      <dd>{card.count}</dd>
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
