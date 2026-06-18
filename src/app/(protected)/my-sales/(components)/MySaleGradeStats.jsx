'use client';

import styles from '@/app/(protected)/my-gallery/(components)/MyGalleryCardList.module.css';

const GRADE_STYLES = {
  COMMON: styles.common,
  RARE: styles.rare,
  SUPER_RARE: styles.superRare,
  LEGENDARY: styles.legendary,
};

const MySaleGradeStats = ({
  nickname = '',
  totalQuantity = 0,
  gradeCounts = {},
}) => {
  return (
    <div className={styles.summary}>
      <h2 className={styles.summaryTitle}>
        {nickname}님이 보유한 포토카드
        <span>({totalQuantity}장)</span>
      </h2>

      <div className={styles.gradeBadges}>
        {Object.keys(GRADE_STYLES).map((grade) => (
          <div
            key={grade}
            className={`${styles.gradeBadge} ${GRADE_STYLES[grade]}`}
          >
            {grade.replaceAll('_', ' ')} {gradeCounts[grade] ?? 0}장
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySaleGradeStats;
