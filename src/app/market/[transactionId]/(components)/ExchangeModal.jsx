'use client';

import React, { useState } from 'react';
import { proposeExchangeApi } from '@/api/detailApi';
import PhotoCardSelectModal from '@/components/features/PhotoCardSelectModal/PhotoCardSelectModal.module.css';

export default function ExchangeModal({ transactionId, loginId, cardInfo }) {
  const [exdescription, setExdescription] = useState(''); //입력받은 교환 요청 설명 기입

  if (!cardInfo) {
    alert('카드 정보가 조회되지 않습니다!');
    return null;
  }

  const handleExchange = async () => {
    try {
      await proposeExchangeApi({
        transactionId: transactionId,
        proposerId: loginId,
        offeredCardId: cardInfo.id,
        description: exdescription,
      });
      onClose();
    } catch (error) {
      if (!loginId) {
        alert('교환 제시 실패하였습니다. 다시 시도해주세요.');
      }

      console.error('교환 요청 중 오류 발생: ', error);
    }
  };

  return (
    <div className="p-[4rem] flex flex-col items-center justify-between">
      <div>카드 교환하기</div>
      <div>{cardInfo.title}</div>
      <div className="flex">
        <div className={styles.card}>
          <img
            className={styles.thumbnail}
            src={cardInfo.imageUrl}
            alt={cardInfo.title}
          />

          <div className={styles.cardBody}>
            <h2 className={styles.cardTitle}>{cardInfo.title}</h2>

            <div className={styles.meta}>
              <span
                className={
                  styles[cardInfo.grade.replaceAll(/[\s_]/g, '').toLowerCase()]
                }
              >
                {cardInfo.grade}
              </span>
              <span className={styles.genre}>{cardInfo.genre}</span>
            </div>

            <div className={styles.cardDivider} />

            <dl className={styles.info}>
              <div>
                <dt>가격</dt>
                <dd>{cardInfo.minimumPrice ?? 0} P</dd>
              </div>
              <div>
                <dt>수량</dt>
                <dd>{cardInfo.quantity}</dd>
              </div>
            </dl>

            <p className={styles.logo}>최애의포토</p>
          </div>
        </div>
        <p className="text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold">
          교환 제시 내용
        </p>
        <Input />
        <button
          onClick={handleExchange}
          className="w-[170px] h-[60px] flex justify-center items-center rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
        >
          교환하기
        </button>
      </div>
    </div>
  );
}
