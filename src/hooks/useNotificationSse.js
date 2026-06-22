'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const MAX_RECENT_NOTIFICATIONS = 5;

export const useNotificationSse = (isLoggedIn) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // console.log('useNotificationSse 실행');

    // console.log('SSE 토큰:', token);

    // if (!token) {
    //   console.log('토큰 없음');
    //   return;
    // }

    // console.log('SSE 연결 시도');
    if (!isLoggedIn) {
      return;
    }
    const token = localStorage.getItem('accessToken');

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/stream?token=${token}`,
    );

    eventSource.onopen = () => {
      // console.log('SSE 연결 성공');
    };

    eventSource.onmessage = (event) => {
      // console.log('SSE 메시지 수신:', event.data);

      const notification = JSON.parse(event.data);

      if (notification.type === 'CONNECTED') {
        // console.log('CONNECTED 수신');
        return;
      }

      queryClient.setQueryData(['notifications', 'recent'], (oldData = []) => {
        return [notification, ...oldData].slice(0, MAX_RECENT_NOTIFICATIONS);
      });

      queryClient.setQueryData(
        ['notifications', 'unread-count'],
        (oldCount = 0) => oldCount + 1,
      );
    };

    eventSource.onerror = (error) => {
      console.error('SSE 연결 오류', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn, queryClient]);
};
