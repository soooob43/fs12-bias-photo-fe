'use client';

import { useEffect, useMemo, useRef } from 'react';

import NotificationItem from './NotificationItem';
import { useMe } from '@/hooks/useMe';
import { useInfiniteNotifications } from '@/hooks/useInfiniteNotifications';
import { readAllNotifications } from '@/api/notificationApi';

const NotificationList = () => {
  const observerRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteNotifications();

  const notifications = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      },
    );

    const current = observerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const unreadIds = notifications
        .filter((notification) => !notification.isRead)
        .map((notification) => notification.id);

      if (unreadIds.length > 0) {
        readAllNotifications(unreadIds);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

      const unreadIds = notifications
        .filter((notification) => !notification.isRead)
        .map((notification) => notification.id);

      if (unreadIds.length > 0) {
        readAllNotifications(unreadIds);
      }
    };
  }, [notifications]);

  if (notifications.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-gray-400">알림이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden border border-[#333333]">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}

      <div ref={observerRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="py-6 text-center text-sm text-gray-400">
          불러오는 중...
        </div>
      )}
    </div>
  );
};

export default NotificationList;
