'use client';

import Link from 'next/link';
import NotificationItem from './NotificationItem';

const NotificationDropdown = ({ notifications = [] }) => {
  // console.log('Dropdown notifications', notifications);
  return (
    <div className="absolute top-12 right-0 z-50 flex max-h-[500px] w-[460px] flex-col overflow-hidden rounded-xl border border-[#333333] bg-[#1A1A1A] shadow-xl">
      {notifications.length === 0 ? (
        <>
          <div className="flex h-[160px] flex-col items-center justify-center gap-4">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />

            <p className="text-sm text-[#999999]">새로운 알림이 없습니다.</p>
          </div>

          <Link
            href="/notifications"
            className="border-t border-[#333333] px-4 py-4 text-center text-sm font-semibold text-[#FFFF00] transition-opacity hover:opacity-80"
          >
            전체 알림 보기
          </Link>
        </>
      ) : (
        <>
          <div className="scrollbar-hide max-h-[420px] overflow-y-auto">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>

          <Link
            href="/notifications"
            className="border-t border-[#333333] px-4 py-4 text-center text-sm font-semibold text-[#FFFF00] transition-opacity hover:opacity-80"
          >
            전체 알림 보기
          </Link>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
