import './globals.css';

import type { Metadata } from 'next';
import Head from 'next/head';

import { AuthCheck } from '@/components/AuthCheck/AuthCheck';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider/ReactQueryClientProvider';
import ThemeClient from '@/components/ThemeClient/ThemeClient';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'Нутримания',
  description: 'New platform',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
      href: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/favicon/android-chrome-192x192.png',
      href: '/favicon/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/favicon/android-chrome-512x512.png',
      href: '/favicon/android-chrome-512x512.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'mask-icon',
      sizes: '150x150',
      url: '/favicon/safari-pinned-tab.svg',
      href: '/favicon/safari-pinned-tab.svg',
    },
    {
      rel: 'apple-touch-startup-image',
      url: '/favicon/apple-touch-icon.png',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon/favicon.ico',
      href: '/favicon/favicon.ico',
    },
  ],
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="ru">
        <Head>
          <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicon/android-chrome-512x512.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#19c152" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
        </Head>

        <body>
          <main>
            <StyledComponentsRegistry>
              <ThemeClient>
                <AuthCheck>{children}</AuthCheck>
              </ThemeClient>
            </StyledComponentsRegistry>
          </main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
