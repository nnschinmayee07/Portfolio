import type { Metadata } from 'next'
import ClientScripts from '@/components/ClientScripts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chinmayee · UI/UX Designer & Developer',
  description: 'Portfolio of Naga Sai Chinmayee Neti — UI/UX Designer, Frontend Developer, CSE Student',
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
            <span className="loader-tagline">UI/UX Designer · Developer</span>
            <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
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
