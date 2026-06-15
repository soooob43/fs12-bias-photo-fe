import { Noto_Sans_KR } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: '최애의 포토',
  description: 'Bias photo sharing app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
