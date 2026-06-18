'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction, updateTransaction } from '@/api/transactionApi';
import CommonModal from '@/components/ui/CommonModal/CommonModal';
import styles from './PhotoCardSellModal.module.css';
import { FILTER_CONFIG, FILTER_KEY_MAP } from '@/constants/filter';
import { brBold } from '@/fonts';
import { GENRE_MAP, GRADE_MAP } from '@/constants/card';

const DESCRIPTION_MAX_LENGTH = 300;

export default function PhotoCardSellModal({
  card,
  transactionId,
  initialValues,
  mode = 'create',
  isOpen,
  onClose,
  title = '나의 포토카드 판매하기',
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isEditMode = mode === 'edit';

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode) {
      setQuantity(initialValues?.totalQuantity ?? 1);
      setPrice(String(initialValues?.price ?? ''));
      setGrade(initialValues?.exchangeGrade ?? '');
      setGenre(initialValues?.exchangeGenre ?? '');
      setDescription(
        (initialValues?.exchangeDescription ?? '').slice(
          0,
          DESCRIPTION_MAX_LENGTH,
        ),
      );
    } else {
      setQuantity(1);
      setPrice('');
      setGrade('');
      setGenre('');
      setDescription('');
    }

    setFormError('');
  }, [isOpen, isEditMode, initialValues]);

  const transactionMutation = useMutation({
    mutationFn: (payload) =>
      isEditMode
        ? updateTransaction(transactionId, payload)
        : createTransaction(payload),
    onSuccess: async () => {
      if (isEditMode) {
        await queryClient.invalidateQueries({
          queryKey: ['marketDetail', String(transactionId)],
        });
        await queryClient.invalidateQueries({
          queryKey: ['transactions'],
        });
        onClose();
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ['available-photo-cards'],
      });

      const query = new URLSearchParams({
        title: card.title,
        grade: card.grade,
        quantity: String(quantity),
      });
      router.push(
        `/my-photo-card-sell/${card.cardId}/success?${query.toString()}`,
      );
    },
    onError: (error) => {
      if (isEditMode) {
        setFormError(error.message || '판매글 수정에 실패했습니다.');
        return;
      }

      const query = new URLSearchParams({
        title: card.title,
        grade: card.grade,
        quantity: String(quantity),
        message: error.message,
      });

      router.push(
        `/my-photo-card-sell/${card.cardId}/fail?${query.toString()}`,
      );
    },
  });

  const decreaseQuantity = () => {
    setQuantity((curr) => Math.max(1, curr - 1));
  };

  const increaseQuantity = () => {
    setQuantity((curr) => Math.min(card.quantity, curr + 1));
  };

  const handleSubmit = () => {
    if (!card) {
      setFormError('판매할 포토카드 정보를 찾을 수 없습니다.');
      return;
    }

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

    const payload = {
      price: parsedPrice,
      exchangeGrade: grade,
      exchangeGenre: genre,
      exchangeDescription: description.trim(),
    };

    if (isEditMode) {
      transactionMutation.mutate({
        ...payload,
        totalQuantity: quantity,
      });
      return;
    }

    transactionMutation.mutate({
      ...payload,
      cardId: card.cardId,
      ownershipIds: card.ownershipIds.slice(0, quantity),
    });
  };

  if (!isOpen || !card) return null;

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <p className={`${styles.eyebrow} ${brBold.className}`}>{title}</p>
        <h1 className={styles.title}>{card.title}</h1>

        <section className={styles.cardSection}>
          <img
            className={styles.cardImage}
            src={card.imageUrl}
            alt={card.title}
          />

          <div className={styles.cardInformation}>
            <div className={styles.cardMeta}>
              <span className={styles.grade}>{GRADE_MAP[card.grade]}</span>
              <span className={styles.divider}>|</span>
              <span>{GENRE_MAP[card.genre]}</span>
              {card.creator && (
                <strong className={styles.creator}>{card.creator}</strong>
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
                    disabled={quantity === card.quantity}
                    aria-label="판매 수량 늘리기"
                  >
                    +
                  </button>
                </div>
                <div className={styles.quantityLimit}>
                  <strong>/ {card.quantity}</strong>
                  <small>최대 {card.quantity}장</small>
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

                {FILTER_CONFIG.genre.options.map((label) => (
                  <option key={label} value={FILTER_KEY_MAP.genre[label]}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className={styles.description}>
            <span>교환 희망 설명</span>
            <textarea
              value={description}
              maxLength={DESCRIPTION_MAX_LENGTH}
              onChange={(event) =>
                setDescription(
                  event.target.value.slice(0, DESCRIPTION_MAX_LENGTH),
                )
              }
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
            {transactionMutation.isPending
              ? isEditMode
                ? '수정 중...'
                : '등록 중...'
              : isEditMode
                ? '수정하기'
                : '판매하기'}
          </button>
        </div>
      </div>
    </CommonModal>
  );
}
