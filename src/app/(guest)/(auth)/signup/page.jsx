import SignupForm from './(components)/SignupForm';
import Logo from '../(components)/Logo';

export const metadata = {
  title: '회원가입',
  description:
    '간단하게 최애의 포토에 회원가입하고 최애의 포토를 이용해보세요.',
  openGraph: {
    title: '회원가입 | 최애의 포토',
    description:
      '간단하게 최애의 포토에 회원가입하고 최애의 포토를 이용해보세요.',
    url: '/signup',
  },
};

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Logo />
      <SignupForm />
    </main>
  );
}
