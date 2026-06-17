'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { brBold, brRegular } from '@/fonts/index';
import styles from './page.module.css';

export default function purchaseModalResult() {
  const searchParams = useSearchParams();

  // URL에서 전달된 값들 추출하기
  const isSuccess = searchParams.get('isSuccess') === 'true';
  const grade = searchParams.get('grade') || '';
  const title = searchParams.get('title') || '';
  const quantity = searchParams.get('quantity') || '0';

  const { transactionId } = useParams();

  return isSuccess ? (
    <div className={styles.container}>
      <Link className={styles.closeButton} href={`/market/${transactionId}`}>
        <span>&times;</span>
      </Link>

      <h2 className={`${styles.mainTitle} ${brBold.className}`}>
        구매 <span className={styles.success}>성공</span>
      </h2>

      <p className={styles.description}>
        [{grade} | {title}] {quantity}장 구매에 성공했습니다!
      </p>

      <Link className={styles.btn} href="/my-gallery">
        마이갤러리에서 확인하기
      </Link>
    </div>
  ) : (
    <div className={styles.container}>
      <Link className={styles.closeButton} href={`/market/${transactionId}`}>
        <span>&times;</span>
      </Link>

      <h2 className={`${styles.mainTitle} ${brBold.className}`}>
        구매 <span className={styles.fail}>실패</span>
      </h2>

      <p className={styles.description}>
        [{grade} | {title}] {quantity}장 구매에 실패했습니다.
      </p>

      <Link className={styles.btn} href="/market">
        마켓플레이스로 돌아가기
      </Link>
    </div>
  );
}
