import LoginForm from './(components)/LoginForm';
import Logo from '../(components)/Logo';
import Header from '@/components/layout/Header';

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <Logo />
      <LoginForm />
    </main>
  );
};

export default page;
