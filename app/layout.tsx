import type { Metadata } from 'next'
import ClientScripts from '@/components/ClientScripts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinmayee · UI/UX Designer & Full Stack Developer',
  description: 'Portfolio of Naga Sai Chinmayee Neti — UI/UX Designer, Full Stack Developer & CSE Student at MLR Institute of Technology. Building interfaces that feel right.',
  metadataBase: new URL('https://portfolio-nnschinmayee07-8534s-projects.vercel.app'),
  openGraph: {
    title: 'Chinmayee · UI/UX Designer & Full Stack Developer',
    description: 'Building interfaces that feel right — from the first pixel to the last commit.',
    url: 'https://portfolio-nnschinmayee07-8534s-projects.vercel.app',
    siteName: 'Chinmayee Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinmayee · UI/UX Designer & Full Stack Developer',
    description: 'Building interfaces that feel right — from the first pixel to the last commit.',
  },
  keywords: ['UI/UX Designer', 'Full Stack Developer', 'Portfolio', 'Naga Sai Chinmayee', 'CSE Student', 'MLR Institute'],
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="page-loader" id="pageLoader">
          <div className="loader-particles" id="loaderParticles"></div>
          <div className="loader-inner">
            <span className="loader-name">Chinmayee ✦</span>
            <span className="loader-tagline">UI/UX Designer · Full Stack Developer</span>
            <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
            <span className="loader-status" id="loaderStatus">Designing...</span>
            <div className="loader-dots">
              <div className="loader-dot-el"></div>
              <div className="loader-dot-el"></div>
              <div className="loader-dot-el"></div>
            </div>
          </div>
        </div>
        {children}
        <ClientScripts />
      </body>
    </html>
  )
}
