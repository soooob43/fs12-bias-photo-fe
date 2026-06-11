import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/assets/images/img_logo.svg';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={logoImage}
        alt="최애의포토"
        priority
        className={styles.logo}
      ></Image>
    </Link>
  );
};

export default Logo;
