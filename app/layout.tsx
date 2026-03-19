import type { Metadata } from 'next'
import { Comfortaa, Caveat, Darumadrop_One } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const comfortaa = Comfortaa({ 
  subsets: ["latin"],
  variable: '--font-comfortaa',
  weight: ['400', '700']
});
const caveat = Caveat({ 
  subsets: ["latin"],
  variable: '--font-caveat',
  weight: ['400', '700']
});
const darumadropOne = Darumadrop_One({
  subsets: ["latin"],
  variable: '--font-darumadrop',
  weight: ['400']
});

export const metadata: Metadata = {
  title: '4 of a Kind - Group Wishlist',
  description: 'Shared gift wishlists and travel plans for your close group of friends',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable} ${caveat.variable} ${darumadropOne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
