'use client';

import ErrorPage from '@/components/layout/ErrorPage';
import ResultPage from '@/components/layout/ResultPage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const FailClientPage = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState(null);
  const [isInvalidAccess, setIsInvalidAccess] = useState(false);
  const [errorValue, setErrorValue] = useState({ title: '', content: '' });
  const hasCheckedSession = useRef(false);

  useEffect(() => {
    if (hasCheckedSession.current) return;
    hasCheckedSession.current = true;

    const resultString = sessionStorage.getItem('createCardResult');

    if (!resultString) {
      setErrorValue({
        title: '잘못된 접근!',
        content: '잘못된 접근으로 페이지에 접근하였습니다.',
      });
      setIsInvalidAccess(true);
      return;
    }

    try {
      const parsedData = JSON.parse(resultString);
      setCardData(parsedData);
    } catch (error) {
      console.error('데이터 처리 중 오류가 발생했습니다.');
      setErrorValue({
        title: '데이터 처리 중 오류!',
        content: '데이터 처리 중 오류가 발생했습니다.',
      });
      setIsInvalidAccess(true);
    } finally {
      sessionStorage.removeItem('createCardResult');
    }
  }, [router]);

  if (isInvalidAccess) {
    return (
      <ErrorPage
        title={errorValue.title}
        content={errorValue.content}
        btnName="홈으로 돌아가기"
        href="/"
      />
    );
  }

  if (!cardData) return null;

  const text = `[ ${cardData?.grade} | ${cardData?.title} ] 포토카드 생성`;

  return (
    <ResultPage
      success={false}
      title="포토 카드 생성"
      content={text}
      btnName="마이갤러리로 돌아가기"
      href="/my-gallery"
    />
  );
};

export default FailClientPage;
