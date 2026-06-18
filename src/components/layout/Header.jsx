'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { brBold } from '@/fonts';
import { useMe } from '@/hooks/useMe';
import { logout } from '@/api/authApi';
import { readAllNotifications } from '@/api/notificationApi';
import { useUnreadNotificationCount } from '@/hooks/useUnreadNotificationCount';
import { useRecentNotifications } from '@/hooks/useRecentNotifications';
import { useNotificationSse } from '@/hooks/useNotificationSse';

import logo from '@/assets/images/img_logo.svg';
import notificationIcon from '@/assets/icons/ic_notification.svg';

import UserDropdown from './UserDropdown';
import NotificationDropdown from '@/components/notification/NotificationDropdown';

import styles from './Header.module.css';

const Header = () => {
  useNotificationSse();

  const [isOpen, setIsOpen] = useState(false);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notificationRef = useRef(null);

  const { data: user, isLoading } = useMe();

  const { data: unreadCount = 0 } = useUnreadNotificationCount();

  const { data: notifications = [] } = useRecentNotifications();

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('accessToken');

    queryClient.setQueryData(['me'], {
      user: null,
    });

    router.push('/');
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleCloseNotification = async () => {
    console.log('닫기 전 notifications', notifications);
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
    <header className={`hidden md:block ${styles.header}`}>
      <div className={styles.inner}>
        <Link href="/market" className={styles.logo}>
          <Image src={logo} alt="최애의포토 로고" priority height={25} />
        </Link>

        {isLoading ? (
          <nav className={styles.nav}>
            <div className={styles.skeletonIcon}></div>
          </nav>
        ) : user ? (
          <nav className={styles.nav}>
            <p className={styles.point}>{user?.points} P</p>

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

            <div className={styles.userMenu}>
              <button
                className={`${styles.nicknameButton} ${brBold.className}`}
                onClick={toggleDropdown}
              >
                {user?.nickname}
              </button>

              {isOpen && <UserDropdown user={user} />}
            </div>

            <p className={styles.divider}>|</p>

            <button className={styles.logoutButton} onClick={handleLogout}>
              로그아웃
            </button>
          </nav>
        ) : (
          <nav className={styles.nav}>
            <Link href="/login" className={styles.loginButton}>
              로그인
            </Link>

            <Link href="/signup" className={styles.logoutButton}>
              회원가입
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
