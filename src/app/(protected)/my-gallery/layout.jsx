import ConditionalHeader from '@/components/layout/ConditionalHeader';

export const metadata = {
  title: '마이갤러리',
  description: '내가 소유한 포토카드 컬렉션을 확인하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <ConditionalHeader />
      {children}
    </>
  );
}
