import { useMe } from '@/hooks/useMe';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MobileHeader.module.css';
import logo from '@/assets/images/img_logo.svg';
import menu from '@/assets/images/ic_menu.svg';
import notificationIcon from '@/assets/icons/ic_notification.svg';
import { useState } from 'react';

const MobileHeader = () => {
  const { data: user, isLoading } = useMe();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <button type="button" onClick={() => setSidebarOpen(true)}>
            <Image src={menu} alt="메뉴" />
          </button>
          <Link href="/market">
            <Image src={logo} alt="최애의포토 로고" />
          </Link>
          {isLoading ? (
            <nav className={styles.nav}>
              <div className={styles.skeletonIcon}></div>
            </nav>
          ) : user ? (
            <button type="button">
              <Image src={notificationIcon} alt="알림" />
            </button>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
      </header>
      {sidebarOpen && <ProfileMenu onClose={() => setSidebarOpen(false)} />}
    </>
  );
};

export default MobileHeader;
