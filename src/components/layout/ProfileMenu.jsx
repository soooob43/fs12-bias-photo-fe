'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '@/api/authApi';
import styles from './ProfileMenu.module.css';

const ProfileMenu = ({ user, onClose }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
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

  return (
    <>
      {user ? (
        <aside>
          <nav>
            <div>
              <h2>안녕하세요, {user.nickname}님!</h2>

              <div>
                <p>보유 포인트</p>
                <p>{user.points} P</p>
              </div>
            </div>

            <ul className={styles.menuList}>
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
                <Link href="/my-photo-card-sell" onClick={onClose}>
                  판매 중인 포토카드
                </Link>
              </li>
            </ul>

            <button type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </nav>
        </aside>
      ) : (
        <aside>
          <p>
            안녕하세요!
            <br />
            서비스를 이용하려면 로그인이 필요합니다.
          </p>
          <nav>
            <Link href="/login" onClick={onClose}>
              로그인
            </Link>
            <Link href="/signup" onClick={onClose}>
              회원가입
            </Link>
            <Link href="/market" onClick={onClose}>
              마켓플레이스
            </Link>
          </nav>
        </aside>
      )}
    </>
  );
};

export default ProfileMenu;
