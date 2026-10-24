import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
const font = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' });
const title = 'Free 1-Hour AI Marketing Consultation | Get a Customized Marketing Plan';
const description = 'Book a free one-to-one AI marketing consultation and get a customized digital marketing plan in PDF format for your business.';
export const metadata: Metadata = { title, description, ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}), openGraph: {title, description, type:'website', ...(process.env.NEXT_PUBLIC_SITE_URL ? {url:process.env.NEXT_PUBLIC_SITE_URL} : {})}, twitter:{card:'summary',title,description} };
// TODO: Add a branded favicon and public/og.png.
export const viewport: Viewport = {width:'device-width',initialScale:1,themeColor:'#071510'};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {return <html lang="en"><body className={font.className}>{children}</body></html>}
