import Image from 'next/image';
import google from '@/assets/images/img_google.svg';
import styles from './GoogleLoginButton.module.css';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button onClick={handleGoogleLogin} className={styles.button} type="button">
      <Image src={google} alt="구글" width={32} height={32} />
      Google로 시작하기
    </button>
  );
};

export default GoogleLoginButton;
