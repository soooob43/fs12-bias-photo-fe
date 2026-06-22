'use client';

import { getMe } from '@/api/authApi';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

const OAuthPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOAuth = async () => {
      const accessToken = searchParams.get('accessToken');

      if (!accessToken) {
        router.replace('/login');
        return;
      }

      localStorage.setItem('accessToken', accessToken);

      const data = await getMe();

      queryClient.setQueryData(['me'], data.user);

      router.replace('/market');
    };
    handleOAuth();
  }, [router, searchParams, queryClient]);

  return (
    <div
      className="
        fixed inset-0
        flex items-center justify-center
      "
    >
      <div
        className="
          w-10 h-10
          border-4
          border-gray-400
          border-t-white
          rounded-full
          animate-spin
        "
      />
    </div>
  );
};

const OAuthPage = () => {
  return (
    <Suspense fallback={<p>로딩중...</p>}>
      <OAuthPageContent />
    </Suspense>
  );
};

export default OAuthPage;
