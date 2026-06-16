import LoginForm from './(components)/LoginForm';
import Logo from '../(components)/Logo';
import MobileHeader from '@/components/layout/MobileHeader';
import { Suspense } from 'react';

const page = () => {
  return (
    <Suspense>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Logo />
        <LoginForm />
      </main>
    </Suspense>
  );
};

export default page;
