'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '@/api/transactionApi';
import CommonModal from '@/components/ui/CommonModal/CommonModal';
import styles from './PhotoCardSellModal.module.css';

export default function PhotoCardSellModal({
  card,
  isOpen,
  onClose,
  title = '나의 포토카드 판매하기',
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mockCard = card ?? {
    cardId: 1,
    title: '우리집 앞마당',
    imageUrl: '../../images/img_photo_card_test.svg',
    grade: 'LEGENDARY',
    genre: '풍경',
    creator: '유디',
    quantity: 3,
    ownershipIds: [1, 2, 3],
  };

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  const transactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['available-photo-cards'],
      });

      const query = new URLSearchParams({
        title: mockCard.title,
        grade: mockCard.grade,
        quantity: String(quantity),
      });
      router.push(
        `/my-photo-card-sell/${mockCard.cardId}/success?${query.toString()}`,
      );
    },
    onError: (error) => {
      const query = new URLSearchParams({
        title: mockCard.title,
        grade: mockCard.grade,
        quantity: String(quantity),
        message: error.message,
      });
      router.push(
        `/my-photo-card-sell/${mockCard.cardId}/fail?${query.toString()}`,
      );
    },
  });

  const decreaseQuantity = () => {
    setQuantity((curr) => Math.max(1, curr - 1));
  };

  const increaseQuantity = () => {
    setQuantity((curr) => Math.min(mockCard.quantity, curr + 1));
  };

  const handleSubmit = () => {
    const parsedPrice = Number(price);

    if (!Number.isInteger(parsedPrice) || parsedPrice <= 0) {
      setFormError('장당 가격을 1 이상의 숫자로 입력해 주세요.');
      return;
    }

    if (!grade || !genre || !description.trim()) {
      setFormError('교환 희망 정보를 모두 입력해 주세요.');
      return;
    }

    setFormError('');

    if (mockCard.isMock) {
      const mockTransaction = {
        id: `mock-${Date.now()}`,
        cardId: mockCard.cardId,
        title: mockCard.title,
        grade: mockCard.grade,
        quantity,
        price: parsedPrice,
        exchangeGrade: grade,
        exchangeGenre: genre,
        exchangeDescription: description.trim(),
        createdAt: new Date().toISOString(),
      };
      const previousTransactions = JSON.parse(
        localStorage.getItem('mockTransactions') ?? '[]',
      );
      localStorage.setItem(
        'mockTransactions',
        JSON.stringify([mockTransaction, ...previousTransactions]),
      );

      const query = new URLSearchParams({
        title: mockCard.title,
        grade: mockCard.grade,
        quantity: String(quantity),
        mock: 'true',
      });
      router.push(
        `/my-photo-card-sell/${mockCard.cardId}/success?${query.toString()}`,
      );
      return;
    }

    transactionMutation.mutate({
      cardId: mockCard.cardId,
      ownershipIds: mockCard.ownershipIds.slice(0, quantity),
      price: parsedPrice,
      exchangeGrade: grade,
      exchangeGenre: genre,
      exchangeDescription: description.trim(),
    });
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{title}</p>
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
              {mockCard.creator && (
                <strong className={styles.creator}>{mockCard.creator}</strong>
              )}
            </div>

            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>총 판매 수량</span>
              <div className={styles.quantityArea}>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    aria-label="판매 수량 줄이기"
                  >
                    &minus;
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity === mockCard.quantity}
                    aria-label="판매 수량 늘리기"
                  >
                    +
                  </button>
                </div>
                <div className={styles.quantityLimit}>
                  <strong>/ {mockCard.quantity}</strong>
                  <small>최대 {mockCard.quantity}장</small>
                </div>
              </div>
            </div>

            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>장당 가격</span>
              <label className={styles.priceInput}>
                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="숫자만 입력"
                />
                <strong>P</strong>
              </label>
            </div>
          </div>
        </section>

        <section className={styles.exchangeSection}>
          <h2 className={styles.subtitle}>교환 희망 정보</h2>
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
                <option value="SUPER_RARE">SUPER RARE</option>
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
              placeholder="설명을 입력해 주세요"
            />
          </label>
        </section>

        {formError && <p className={styles.formError}>{formError}</p>}

        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onClose}
          >
            취소하기
          </button>
          <button
            className={styles.submitButton}
            type="button"
            onClick={handleSubmit}
            disabled={transactionMutation.isPending}
          >
            {transactionMutation.isPending ? '등록 중...' : '판매하기'}
          </button>
        </div>
      </div>
    </CommonModal>
  );
}
