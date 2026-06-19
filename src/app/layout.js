import { Noto_Sans_KR } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import NotificationSseProvider from '@/components/layout/NotificationSseProvider';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://fs12-bias-photo-fe.vercel.app'),
  title: {
    template: '%s | 최애의 포토',
    default: '최애의 포토 - 포토카드 거래의 모든 것',
  },
  description: '최애의 포토카드를 안전하고 빠르게 거래 및 교환해보세요.',
  openGraph: {
    title: '최애의 포토',
    description: '최애의 포토카드를 안전하고 빠르게 거래 및 교환해보세요.',
    url: '/',
    siteName: '최애의 포토',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full">
        <QueryProvider>
          <NotificationSseProvider />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
