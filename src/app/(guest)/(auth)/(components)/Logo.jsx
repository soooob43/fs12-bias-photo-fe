import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/assets/images/img_logo.svg';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link href="/market">
      <Image
        src={logoImage}
        alt="최애의포토"
        priority
        width={330}
        height={60}
        className={styles.logo}
      ></Image>
    </Link>
  );
};

export default Logo;
