import type { Metadata, Viewport } from 'next';
import { Poppins, PT_Sans } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from "@/components/ui/toaster";

// Optimize font loading with next/font
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1DBA6F', // Primary color
};

export const metadata: Metadata = {
  title: {
    default: 'NourishNet - Food Rescue Platform',
    template: '%s | NourishNet',
  },
  description: 'Intelligently matching surplus food with those in need.',
  keywords: ['food rescue', 'donation', 'food waste', 'charity', 'volunteer'],
  authors: [{ name: 'NourishNet Team' }],
  creator: 'NourishNet',
  publisher: 'NourishNet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nourishnet.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'NourishNet - Food Rescue Platform',
    description: 'Intelligently matching surplus food with those in need.',
    siteName: 'NourishNet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NourishNet - Food Rescue Platform',
    description: 'Intelligently matching surplus food with those in need.',
    creator: '@nourishnet',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${poppins.variable} ${ptSans.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
