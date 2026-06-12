import LoginForm from './(components)/LoginForm';
import Logo from '../(components)/Logo';
import MobileHeader from '@/components/layout/MobileHeader';

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <MobileHeader />
      <Logo />
      <LoginForm />
    </main>
  );
};

export default page;
