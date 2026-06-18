import SignupForm from './(components)/SignupForm';
import Logo from '../(components)/Logo';

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <SignupForm />
    </main>
  );
}
