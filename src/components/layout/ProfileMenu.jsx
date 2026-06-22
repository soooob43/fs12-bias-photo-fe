'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/api/authApi';
import styles from './ProfileMenu.module.css';
import { useState } from 'react';
import RandomBoxIcon from '../icons/RandomBoxIcon';
import { brBold } from '@/fonts';
import RandomBoxModal from '../features/RandomBoxModal/RandomBoxModal';

const ProfileMenu = ({ user, onClose }) => {
  const [isRandomBoxOpen, setIsRandomBoxOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('accessToken');
    queryClient.setQueryData(['me'], null);

    onClose?.();

    router.push('/');
  };

  return (
    <>
      <nav className={styles.nav}>
        {user ? (
          <>
            <div className={styles.profile}>
              <h2 className={styles.greeting}>
                안녕하세요, {user.nickname}님!
              </h2>

              <div className={styles.pointBox}>
                <p className={styles.pointLabel}>보유 포인트</p>
                <p className={styles.pointValue}>{user.points} P</p>
              </div>
            </div>

            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <button
                  className={`${styles.randomBox} ${brBold.className}`}
                  onClick={() => setIsRandomBoxOpen(true)}
                >
                  <RandomBoxIcon size={18} />
                  랜덤박스
                </button>
              </li>
              <li className={styles.menuItem}>
                <Link href="/market" onClick={onClose}>
                  마켓플레이스
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link href="/my-gallery" onClick={onClose}>
                  마이갤러리
                </Link>
              </li>

              <li className={styles.menuItem}>
                <Link href="/my-sales" onClick={onClose}>
                  판매 중인 포토카드
                </Link>
              </li>
            </ul>

            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <div className={styles.guestBox}>
              <h2 className={styles.title}>안녕하세요!</h2>
              <p className={styles.guideText}>
                서비스를 이용하려면 로그인이 필요합니다.
              </p>
            </div>
            <ul className={styles.menuList}>
              <li className={styles.menuItem}>
                <Link href="/login" onClick={onClose}>
                  로그인
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/signup" onClick={onClose}>
                  회원가입
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link href="/market" onClick={onClose}>
                  마켓플레이스
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
      <RandomBoxModal
        isOpen={isRandomBoxOpen}
        onClose={() => setIsRandomBoxOpen(false)}
      />
    </>
  );
};

export default ProfileMenu;
