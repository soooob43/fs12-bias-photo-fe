import SignupForm from './(components)/SignupForm';
import Logo from '../(components)/Logo';
import { Suspense } from 'react';

export default function SignupPage() {
  return (
    <Suspense>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Logo />
        <SignupForm />
      </main>
    </Suspense>
  );
}
