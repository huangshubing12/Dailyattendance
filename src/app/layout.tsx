import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '每天一件小事 - 30天重新养自己一遍',
  description: '通过30天持续、低压力的微小行动，帮助你找回生活掌控感，舒缓焦虑、重拾生活热情。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
        {children}
      </body>
    </html>
  );
}
