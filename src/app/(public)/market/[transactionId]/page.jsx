'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketDetail } from '@/api/detailApi.js';
import { getMe } from '@/api/authApi'; // useMe 대신 직접 사용
import SellerDetail from './(components)/SellerDetail';
import BuyerDetail from './(components)/BuyerDetail';
import ErrorPage from '@/components/layout/ErrorPage';
import DetailHeader from './(components)/DetailHeader';
import Spinner from '@/components/ui/Spinner';

export default function CardDetailPage({ params }) {
  const { transactionId } = React.use(params); //URL 내 거래 게시글 Id

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem('accessToken') ||
      document.cookie.includes('refreshToken');

    setIsLoggedIn(!!token);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      // useMe 사용 시 로그인전에는 무조건 401에러로 페이지 연결이 안되는 오류가 발생하여 직접 로그인정보호출 API 사용
      const data = await getMe();
      return data?.user;
    },
    enabled: isLoggedIn, // 로그인 시에만 인증 정보 로드
    retry: false,
    throwOnError: false,
  });

  const loginId = userData?.id; //로그인한 사용자 id(로그인 전이면 undefined)

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['marketDetail', transactionId], // transactionId가 바뀔 때마다 리렌더링
    queryFn: () => fetchMarketDetail(transactionId),
    enabled: typeof transactionId !== 'undefined' && transactionId !== null,
    retry: false,
  });

  //판매 게시글의 판매자id 조회
  const sellerId = data?.sellerId;

  const isSeller = loginId && sellerId ? loginId === sellerId : false; // true:판매자, false:구매자

  //에러 상태 화면 처리
  if (isError) {
    return (
      <div>
        <ErrorPage
          title="오류가 발생했습니다!"
          content={error.message}
          btnName="마켓플레이스로 돌아가기"
          href="/market"
        />
      </div>
    );
  }

  return (
    <>
      <DetailHeader />
      <div className="w-full max-w-[1480px] mx-auto px-[15px] pb-[90px] md:pb-0">
        {/* 조건부 렌더링 분기 */}
        {isSeller ? (
          <SellerDetail
            transactionId={transactionId}
            loginId={loginId}
            data={data}
          />
        ) : (
          <BuyerDetail
            transactionId={transactionId}
            loginId={loginId}
            data={data}
          />
        )}
      </div>
    </>
  );
}
