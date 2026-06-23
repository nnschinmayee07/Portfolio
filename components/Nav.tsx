'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Toolkit',    href: '#skills' },
  { label: 'Work',       href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Nav() {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // dark = true when over the dark hero section
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      // Hero section is ~100vh + photo section ~80vh = ~180vh
      // Stay dark until we've scrolled past the photo into the about section
      const heroEnd = window.innerHeight * 1.9
      setDark(y < heroEnd)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.nav-menu-wrap')) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [open])

  return (
    <motion.nav
      initial={reduced ? {} : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 5.05, ease: [0.22, 0.1, 0.36, 1] }}
      aria-label="Main navigation"
      style={{
        position:       'fixed',
        top:            '1.2rem',
        left:           '50%',
        transform:      'translateX(-50%)',
        zIndex:         100,
        display:        'flex',
        alignItems:     'center',
        gap:            '0.5rem',
      }}
    >
      {/* Wordmark pill */}
      <a
        href="#hero"
        className={`nav-pill ${dark ? 'nav-pill-dark-inv' : 'nav-pill-outline'}`}
        aria-label="Back to top"
        style={{
          fontFamily:    'var(--font-mono)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontSize:      '0.6rem',
        }}
      >
        NNSC
      </a>

      {/* Menu pill — expands on click */}
      <div className="nav-menu-wrap" style={{ position: 'relative' }}>
        <button
          className={`nav-pill ${dark ? 'nav-pill-cream' : 'nav-pill-dark'}`}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          style={{ gap: '0.6rem' }}
        >
          <span>Menu</span>
          <svg
            width="10" height="7" viewBox="0 0 10 7"
            fill="none" aria-hidden="true"
            style={{
              transform:  open ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.22s ease',
            }}
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dropdown links */}
        {open && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 0.1, 0.36, 1] }}
            style={{
              position:       'absolute',
              top:            'calc(100% + 0.5rem)',
              left:           '50%',
              transform:      'translateX(-50%)',
              background:     'var(--ink)',
              border:         '1px solid rgba(242,237,230,0.1)',
              minWidth:       '140px',
              display:        'flex',
              flexDirection:  'column',
              overflow:       'hidden',
            }}
          >
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.62rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color:         'rgba(242,237,230,0.7)',
                  textDecoration: 'none',
                  padding:       '0.75rem 1.1rem',
                  borderBottom:  '1px solid rgba(242,237,230,0.06)',
                  transition:    'color 0.15s, padding-left 0.15s',
                  display:       'block',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--cream)'
                  e.currentTarget.style.paddingLeft = '1.4rem'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(242,237,230,0.7)'
                  e.currentTarget.style.paddingLeft = '1.1rem'
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </div>

      {/* Contact pill — shown when scrolled */}
      {scrolled && (
        <motion.a
          href="#contact"
          className="nav-pill nav-pill-outline"
          initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22 }}
          style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
        >
          ✦ Contact
        </motion.a>
      )}
    </motion.nav>
  )
}
