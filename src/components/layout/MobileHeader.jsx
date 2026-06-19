'use client';

import { useMe } from '@/hooks/useMe';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MobileHeader.module.css';
import logo from '@/assets/images/img_logo.svg';
import menu from '@/assets/icons/ic_menu.svg';
import notificationIcon from '@/assets/icons/ic_notification.svg';
import { useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import { useQueryClient } from '@tanstack/react-query';
import { readAllNotifications } from '@/api/notificationApi';
import NotificationDropdown from '../Notification/NotificationDropdown';
import { useRecentNotifications } from '@/hooks/useRecentNotifications';
import { useUnreadNotificationCount } from '@/hooks/useUnreadNotificationCount';

const MobileHeader = () => {
  const { data: user, isLoading } = useMe();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const recentQuery = useRecentNotifications();
  const unreadQuery = useUnreadNotificationCount();
  const notifications = recentQuery.data ?? [];
  const unreadCount = unreadQuery.data ?? 0;
  const queryClient = useQueryClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleCloseNotification = async () => {
    // console.log('닫기 전 notifications', notifications);
    if (!isNotificationOpen) {
      return;
    }

    const unreadNotificationIds = notifications
      .filter((notification) => !notification.isRead)
      .map((notification) => notification.id);

    if (unreadNotificationIds.length > 0) {
      try {
        await readAllNotifications(unreadNotificationIds);

        queryClient.setQueryData(['notifications', 'unread-count'], 0);

        queryClient.setQueryData(['notifications', 'recent'], (oldData = []) =>
          oldData.map((notification) => ({
            ...notification,
            isRead: true,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    }

    setIsNotificationOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        handleCloseNotification();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseNotification();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);

      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isNotificationOpen, notifications]);

  return (
    <>
      <header className={`${styles.header} md:hidden`}>
        <div className={styles.inner}>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className={styles.btnIcon}
          >
            <Image src={menu} alt="메뉴" />
          </button>
          <Link href="/">
            <Image src={logo} alt="최애의포토 로고" width={84} />
          </Link>
          {isLoading ? (
            <nav className={styles.nav}>
              <div className={styles.skeletonIcon}></div>
            </nav>
          ) : user ? (
            // <button type="button" className={styles.btnIcon}>
            //   <Image src={notificationIcon} alt="알림" />
            // </button>
            <div ref={notificationRef} className={styles.notificationWrapper}>
              <button
                className={styles.notificationButton}
                onClick={handleToggleNotification}
              >
                <Image src={notificationIcon} alt="알림" />

                {unreadCount > 0 && (
                  <span className={styles.notificationBadge} />
                )}
              </button>

              {isNotificationOpen && (
                <NotificationDropdown notifications={notifications} />
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              로그인
            </Link>
          )}
        </div>
      </header>
      {sidebarOpen && (
        <div className={styles.backdrop} onClick={() => setSidebarOpen(false)}>
          <aside
            className={styles.sidebar}
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileMenu user={user} onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
