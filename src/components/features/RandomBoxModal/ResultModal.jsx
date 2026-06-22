'use client';

import AlertModal from '@/components/ui/AlertModal/AlertModal';
import { brRegular } from '@/fonts';
import Image from 'next/image';
import point from '@/assets/images/img_point.webp';
import styles from './ResultModal.module.css';

const ResultModal = ({ isOpen, earnedPoints, remainingTime, onClose }) => {
  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName={styles.resultModal}
      contentClassName={styles.resultContent}
    >
      <h2 className={`${brRegular.className} ${styles.title}`}>
        랜덤<strong>포인트</strong>
      </h2>
      <Image src={point} alt="point" />
      <div className={styles.textbox}>
        <p className={styles.point}>
          <span>{earnedPoints}P</span> 획득!
        </p>
        <p className={styles.remainingTime}>
          다음 기회까지 남은 시간 <span>{remainingTime}</span>
        </p>
      </div>
    </AlertModal>
  );
};

export default ResultModal;
