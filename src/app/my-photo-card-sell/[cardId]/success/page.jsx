'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function MyPhotoCardSellDetailPage() {
  const photoCard = {
    id: 1,
    title: '우리집 앞마당',
    grade: 'LEGENDARY',
    count: 2,
  };

  return (
    <div className={styles.container}>
      <Link className={styles.closeButton} href="/my-photo-card-sell">
        <span>&times;</span> {/*닫기 버튼 X */}
      </Link>

      <h2 className={styles.mainTitle}>
        판매 등록 <span>성공</span>
      </h2>

      <p className={styles.description}>
        [{photoCard.grade} | {photoCard.title}] {photoCard.count}장 판매 등록에
        성공했습니다!
      </p>

      <Link className={styles.btn} href="/my-photo-card-sell">
        나의 판매 포토카드에서 확인하기
      </Link>
    </div>
  );
}
