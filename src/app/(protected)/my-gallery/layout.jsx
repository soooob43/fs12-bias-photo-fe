import ConditionalHeader from '@/components/layout/ConditionalHeader';

export default function RootLayout({ children }) {
  return (
    <>
      <ConditionalHeader />
      {children}
    </>
  );
}
