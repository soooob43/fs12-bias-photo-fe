'use client';

import React, { useState } from 'react';
import { proposeExchangeApi } from '@/api/detailApi';
import { useQueryClient } from '@tanstack/react-query';
import { brBold } from '@/fonts';
import styles from '@/components/features/PhotoCardSelectModal/PhotoCardSelectModal.module.css';

export default function ExchangeModal({
  transactionId,
  loginId,
  cardInfo,
  onClose,
}) {
  const [exdescription, setExdescription] = useState(''); //입력받은 교환 요청 설명 기입
  const queryClient = useQueryClient();

  if (!cardInfo) {
    alert('카드 정보가 조회되지 않습니다!');
    return null;
  }

  const handleExchange = async () => {
    if (!exdescription || !exdescription.trim()) {
      alert('교환 제시 내용을 입력해주세요.');
      return;
    }

    // 해당 카드의 첫번째 1장의 소유권 ID(ownershipId) 대입
    const targetOfferedId =
      cardInfo.ownershipIds && cardInfo.ownershipIds.length > 0
        ? cardInfo.ownershipIds[0]
        : cardInfo.cardId || cardInfo.id;

    try {
      await proposeExchangeApi({
        transactionId: transactionId,
        proposerId: loginId,
        offeredCardId: targetOfferedId,
        description: exdescription,
      });

      alert('교환 요청 성공!');
      await queryClient.invalidateQueries({
        queryKey: ['exchangeList', transactionId],
      });

      onClose();
    } catch (error) {
      alert('교환 요청 카드에 문제가 있습니다!');
      console.error('교환 요청 중 오류 발생: ', error);
    }
  };

  return (
    <div className="w-[70rem] mx-auto my-auto flex flex-col gap-[3.2rem] items-center">
      <div className="w-full flex flex-col gap-[2.5rem]">
        <p className="font-['brBold'] text-[#A4A4A4] text-[1.5rem] font-bold">
          포토카드 교환하기
        </p>
        <p className="pb-[1.25rem] font-['Noto_Sans_KR'] font-bold text-[#FFF] text-[2.5rem] border-b border-[#EEE] ">
          {cardInfo.title}
        </p>
      </div>

      <div className="flex justify-between w-full h-full">
        <div className="w-[34rem] h-[43rem] px-[1.5rem] py-[2rem] border border-white/10 rounded-[0.125rem] bg-[#161616]">
          <img
            className={`${styles.thumbnail} object-cover`}
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
        <div className="flex flex-col w-[34rem]">
          <p className="mb-[0.62rem] text-[#FFF] font-['Noto_Sans_KR'] text-[1.25rem] font-bold">
            교환 제시 내용
          </p>
          <textarea
            type="text"
            value={exdescription}
            onChange={(e) => setExdescription(e.target.value)}
            placeholder="내용을 입력해주세요."
            className="w-[34rem] h-[7.9rem] px-[1.125rem] py-[1.25rem] rounded-[0.125rem] text-[#FFF] border border-[#DDD] font-['Noto_Sans_KR'] text-[1rem] focus:outline-none focus:border-[#EFFF04]"
          />
          <div className="flex gap-[1.25rem]">
            <button
              onClick={onClose}
              className="w-full h-[60px] flex justify-center items-center mt-[3.75rem] rounded-[0.125rem] border boder-[#EEE] cursor-pointer text-[#FFF] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
            >
              취소하기
            </button>

            <button
              onClick={handleExchange}
              className="w-full h-[60px] flex justify-center items-center mt-[3.75rem] rounded-[0.125rem] bg-[#EFFF04] cursor-pointer text-[#0F0F0F] font-['Noto_Sans_KR'] text-[1.125rem] font-bold"
            >
              교환하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
