'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function MyPhotoCardSellDetailPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') ?? '';
  const grade = searchParams.get('grade') ?? '';
  const quantity = searchParams.get('quantity') ?? '0';

  return (
    <div className={styles.container}>
      <Link className={styles.closeButton} href="/market">
        <span>&times;</span> {/*닫기 버튼 X */}
      </Link>

      <h2 className={styles.mainTitle}>
        판매 등록 <span>성공</span>
      </h2>

      <p className={styles.description}>
        [{grade} | {title}] {quantity}장 판매 등록에 성공했습니다!
      </p>

      {/* 나의 판매 포토카드 프론트 작업 완료하면 경로 수정할 예정 */}
      <Link className={styles.btn} href="/market">
        나의 판매 포토카드에서 확인하기
      </Link>
    </div>
  );
}
