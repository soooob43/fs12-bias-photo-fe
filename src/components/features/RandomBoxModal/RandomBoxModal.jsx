'use client';

import AlertModal from '@/components/ui/AlertModal/AlertModal';
import Image from 'next/image';
import { brBold } from '@/fonts';
import styles from './RandomBoxModal.module.css';
import blueBox from '@/assets/images/img_landing_box01.webp';
import redBox from '@/assets/images/img_landing_box02.webp';
import purpleBox from '@/assets/images/img_box.webp';
import PrimaryButton from '@/components/ui/Button/PrimaryButton';
import { drawRandomBox, getRandomBoxStatus } from '@/api/pointApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ResultModal from './ResultModal';

const RandomBoxModal = ({ isOpen, onClose }) => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');

  const handleClose = () => {
    setSelectedBox(null);
    onClose();
  };

  const boxes = [
    { id: 'blue', image: blueBox },
    { id: 'purple', image: purpleBox },
    { id: 'red', image: redBox },
  ];

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['randomBox'],
    queryFn: getRandomBoxStatus,
    enabled: isOpen,
  });

  const drawMutation = useMutation({
    mutationFn: drawRandomBox,
    onSuccess: () => {
      handleClose();
      setIsResultOpen(true);

      queryClient.invalidateQueries({
        queryKey: ['randomBox'],
      });

      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });

  useEffect(() => {
    if (!data?.nextAvailableAt) {
      setRemainingTime('사용 가능');
      return;
    }

    const updateTimer = () => {
      const diff = new Date(data.nextAvailableAt).getTime() - Date.now();

      if (diff <= 0) {
        setRemainingTime('사용 가능');
        return;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingTime(`${minutes}분 ${seconds}초`);
    };

    // 모달 열자마자 바로 계산
    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [data?.nextAvailableAt]);

  const canOpen =
    !isLoading &&
    (!data?.nextAvailableAt || new Date(data.nextAvailableAt) <= new Date());

  const handleDrawRandomBox = () => {
    if (!selectedBox || !canOpen) return;

    drawMutation.mutate();
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={handleClose}
        modalClassName={styles.randomBoxModal}
        contentClassName={styles.randomBoxContent}
      >
        <div>
          <div className={styles.textBox}>
            <h2 className={`${brBold.className} ${styles.title}`}>
              랜덤<strong>포인트</strong>
            </h2>
            <p className={styles.description}>
              1시간마다 돌아오는 기회!
              <br />
              랜덤 상자 뽑기를 통해 포인트를 획득하세요!
            </p>
            <p>
              다음 기회까지 남은 시간{' '}
              <span className={styles.time}>{remainingTime}</span>
            </p>
          </div>
          <div className={styles.boxs}>
            {boxes.map((box) => (
              <button
                key={box.id}
                onClick={() => setSelectedBox(box.id)}
                disabled={!canOpen || drawMutation.isPending}
                className={
                  selectedBox && selectedBox !== box.id ? styles.dimmed : ''
                }
              >
                <Image src={box.image} alt="RandomBox" />
              </button>
            ))}
          </div>
          {selectedBox && canOpen && (
            <PrimaryButton
              className={styles.seletButton}
              onClick={handleDrawRandomBox}
              disabled={drawMutation.isPending}
            >
              선택완료
            </PrimaryButton>
          )}
        </div>
      </AlertModal>
      {
        <ResultModal
          isOpen={isResultOpen}
          earnedPoints={drawMutation.data?.earnedPoints}
          remainingTime={remainingTime}
          onClose={() => setIsResultOpen(false)}
        ></ResultModal>
      }
    </>
  );
};

export default RandomBoxModal;
