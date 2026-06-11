'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function MyPhotoCardSellDetailPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') ?? '';
  const grade = searchParams.get('grade') ?? '';
  const quantity = searchParams.get('quantity') ?? '0';
  const message = searchParams.get('message');

  return (
    <div className={styles.container}>
      <Link className={styles.closeButton} href="/my-photo-card-sell">
        <span>&times;</span> {/*닫기 버튼 X */}
      </Link>

      <h2 className={styles.mainTitle}>
        판매 등록 <span>실패</span>
      </h2>

      <p className={styles.description}>
        [{grade} | {title}] {quantity}장 판매 등록에 실패했습니다.
      </p>
      {message && <p className={styles.description}>{message}</p>}

      <Link className={styles.btn} href="/my-photo-card-sell">
        마켓플레이스로 돌아가기
      </Link>
    </div>
  );
}
