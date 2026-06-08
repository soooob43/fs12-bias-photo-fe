'use client';

import { useState } from 'react';
import CommonModal from '@/components/ui/CommonModal/CommonModal';
import styles from './PhotoCardSellModal.module.css';

export default function PhotoCardSellModal({
  card,
  isOpen,
  onClose,
  title = '나의 포토카드 판매하기',
}) {
  const mockCard = card ?? {
    title: '우리집 앞마당',
    imageUrl: '/images/mock-card.png',
    grade: 'LEGENDARY',
    genre: '풍경',
    creator: '윤디',
    quantity: 3,
  };

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');

  const decreaseQuantity = () => {
    setQuantity((curr) => Math.max(1, curr - 1));
  };

  const increaseQuantity = () => {
    setQuantity((curr) => Math.min(mockCard.quantity, curr + 1));
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>나의 포토카드 판매하기</p>
        <h1 className={styles.title}>{mockCard.title}</h1>

        <section className={styles.cardSection}>
          <img
            className={styles.cardImage}
            src={mockCard.imageUrl}
            alt={mockCard.title}
          />

          <div className={styles.cardInformation}>
            <div className={styles.cardMeta}>
              <span className={styles.grade}>{mockCard.grade}</span>
              <span className={styles.divider}>|</span>
              <span>{mockCard.genre}</span>
              <strong>{mockCard.creator}</strong>
            </div>

            <div className={styles.optionRow}>
              <span>총 판매 수량</span>
              <div className={styles.quantityArea}>
                <div className={styles.stepper}>
                  <button type="button" onClick={decreaseQuantity}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button type="button" onClick={increaseQuantity}>
                    +
                  </button>
                </div>
                <small>/ {mockCard.quantity}장</small>
              </div>
            </div>

            <div className={styles.optionRow}>
              <span>장당 가격</span>
              <label className={styles.priceInput}>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <strong>P</strong>
              </label>
            </div>
          </div>
        </section>

        <section className={styles.exchangeSection}>
          <h3>교환 희망 정보</h3>

          <div className={styles.selectGrid}>
            <label>
              <span>등급</span>
              <select
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
              >
                <option value="" disabled>
                  등급을 선택해 주세요
                </option>
                <option value="COMMON">COMMON</option>
                <option value="RARE">RARE</option>
                <option value="SUPER RARE">SUPER RARE</option>
                <option value="LEGENDARY">LEGENDARY</option>
              </select>
            </label>

            <label>
              <span>장르</span>
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              >
                <option value="" disabled>
                  장르를 선택해 주세요
                </option>
                <option value="풍경">풍경</option>
                <option value="인물">인물</option>
                <option value="사물">사물</option>
              </select>
            </label>
          </div>

          <label className={styles.description}>
            <span>교환 희망 설명</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </section>

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} type="button">
            취소하기
          </button>
          <button className={styles.submitButton} type="button">
            판매하기
          </button>
        </div>
      </div>
    </CommonModal>
  );
}
