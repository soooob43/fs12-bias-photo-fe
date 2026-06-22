import LoginForm from './(components)/LoginForm';
import Logo from '../(components)/Logo';
import MobileHeader from '@/components/layout/MobileHeader';

export const metadata = {
  title: '로그인',
  description: '최애의 포토에 로그인하고 최애의 포토를 이용해보세요.',
  openGraph: {
    title: '로그인 | 최애의 포토',
    description: '최애의 포토에 로그인하고 최애의 포토를 이용해보세요.',
    url: '/login',
  },
};

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <LoginForm />
    </main>
  );
};

export default page;
