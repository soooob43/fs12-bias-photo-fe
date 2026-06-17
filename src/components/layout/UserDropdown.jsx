import Link from 'next/link';
import styles from './UserDropdown.module.css';

const UserDropdown = ({ user }) => {
  if (!user) return null;
  return (
    <nav className={styles.dropdown}>
      <div className={styles.userInfo}>
        <p className={styles.greeting}>안녕하세요, {user.nickname}님!</p>

        <div className={styles.pointBox}>
          <span className={styles.pointLabel}>보유 포인트</span>

          <span className={styles.pointValue}>{user.points} P</span>
        </div>
      </div>

      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/market">마켓플레이스</Link>
        </li>

        <li className={styles.menuItem}>
          <Link href="/my-gallery">마이갤러리</Link>
        </li>

        <li className={styles.menuItem}>
          <Link href="/my-sales">판매 중인 포토카드</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserDropdown;
