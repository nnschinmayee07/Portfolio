import type { Metadata } from 'next'
import ClientScripts from '@/components/ClientScripts'
import LoaderWrapper from '@/components/LoaderWrapper'
import Nav from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinmayee · Frontend Developer & UI Designer',
  description: 'Portfolio of Naga Sai Chinmayee Neti — Frontend Developer, UI Designer, and Creative Technologist based in Hyderabad.',
  metadataBase: new URL('https://portfolio-nnschinmayee07-8534s-projects.vercel.app'),
  openGraph: {
    title: 'Chinmayee · Frontend Developer & UI Designer',
    description: 'Design with the hands of a maker. The eye of an editor. The mind of an engineer.',
    url: 'https://portfolio-nnschinmayee07-8534s-projects.vercel.app',
    siteName: 'Chinmayee Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinmayee · Frontend Developer & UI Designer',
    description: 'Design with the hands of a maker. The eye of an editor. The mind of an engineer.',
  },
  keywords: ['Frontend Developer', 'UI Designer', 'Portfolio', 'Naga Sai Chinmayee', 'UI/UX', 'Creative Technologist'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ── Font loading ──
            League Gothic  → condensed display grotesque (hero name)
            DM Sans        → neutral editorial body
            Playfair Display → italic accent in about title
            Geist Mono     → monospace labels
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Playfair+Display:ital@1&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <LoaderWrapper>
          {children}
          <ClientScripts />
        </LoaderWrapper>
      </body>
    </html>
  )
}
