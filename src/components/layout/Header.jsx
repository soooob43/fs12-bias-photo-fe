'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { brBold } from '@/fonts';
import { useMe } from '@/hooks/useMe';
import { logout } from '@/api/authApi';
import logo from '@/assets/images/img_logo.svg';
import notificationIcon from '@/assets/icons/ic_notification.svg';
import UserDropdown from './UserDropdown';
import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user, isLoading } = useMe();

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('accessToken');
    queryClient.setQueryData(['me'], null);

    router.push('/');
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

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
            <button className={styles.notificationButton}>
              <Image src={notificationIcon} alt="알림" />
            </button>
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
