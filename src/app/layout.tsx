import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '中国方言地图 - Chinese Dialect Map',
  description: 'Interactive map of Chinese dialects and their regional distributions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
