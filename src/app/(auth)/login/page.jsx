import LoginForm from './(components)/LoginForm';
import Logo from '../(components)/Logo';

const page = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <LoginForm />
    </main>
  );
};

export default page;
