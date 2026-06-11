'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketDetail } from '@/api/detailApi.js';
import { getMe } from '@/api/authApi'; // useMe 대신 직접 사용
import SellerDetail from './(components)/SellerDetail';
import BuyerDetail from './(components)/BuyerDetail';

export default function CardDetailPage({ params }) {
  const { transactionId } = React.use(params); //URL 내 거래 게시글 Id

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(transactionId);

  useEffect(() => {
    const token =
      localStorage.getItem('accessToken') ||
      document.cookie.includes('refreshToken');

    setIsLoggedIn(!!token);
  }, []);

  console.log('isLoggedIn: ', isLoggedIn);

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
  console.log('로그인ID:', loginId);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['marketDetail', transactionId], // transactionId가 바뀔 때마다 리렌더링
    queryFn: () => fetchMarketDetail(transactionId),
    enabled: typeof transactionId !== 'undefined' && transactionId !== null,
    retry: false,
  });

  console.log('판매카드 data: ', data);
  console.log('현재 fetching 상태: ', isFetching);
  console.log('현재 에러 상태: ', error);

  //판매 게시글의 판매자id 조회
  const sellerId = data?.sellerId;
  console.log('sellerId: ', sellerId);

  const isSeller = loginId && sellerId ? loginId === sellerId : false; // true:판매자, false:구매자

  //로딩 상태 화면 처리
  if (isLoading || (!data && !isError)) {
    return (
      <div className="text-white text-center py-20 font-['Noto_Sans_KR']">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  //에러 상태 화면 처리
  if (isError) {
    return (
      <div className="text-red-500 text-center py-20 font-['Noto_Sans_KR']">
        오류가 발생했습니다: {error.message}
      </div>
    );
  }

  console.log('현재 에러 상태: ', error);

  return (
    <div className="container mx-auto py-[3.75rem] flex flex-col justify-center items-center">
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
  );
}
