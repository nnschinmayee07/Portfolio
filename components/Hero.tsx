'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/* ─────────────────────────────────────────────
   ANIMATION HELPERS
───────────────────────────────────────────── */
const EASE = [0.22, 0.1, 0.36, 1] as const
const fadeUp = (delay = 0, duration = 0.85) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration, delay, ease: EASE } },
})
const fadeIn = (delay = 0, duration = 0.65) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration, delay, ease: EASE } },
})

const NAME_LINES = ['NAGA SAI', 'CHINMAYEE', 'NETI']
const KEY_SKILLS = ['Graphic Design', 'User Experience', 'Frontend Dev']

/* ─────────────────────────────────────────────
   CURTAIN PHOTO SECTION
   A dark curtain covers the photo on load.
   As the user scrolls into this section, the
   curtain slides UP — revealing the photo
   from bottom to top (like Nithin Warrier).
───────────────────────────────────────────── */
function CurtainPhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Curtain translates from 0% (fully covering) to -100% (fully gone)
  // Movement range: when section enters viewport (0) → when it's 55% through
  const curtainY = useTransform(scrollYProgress, [0, 0.55], ['0%', '-101%'])
  // Subtle parallax on the photo itself — moves slower than scroll
  const photoY   = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div
      ref={ref}
      className="hero-photo-section"
      aria-label="Photo of Naga Sai Chinmayee Neti"
    >
      {/* Photo — subtle parallax */}
      <motion.div
        style={{ y: reduced ? 0 : photoY, position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photo.jpg"
          alt=""
          style={{
            width:          '100%',
            height:         '110%',
            objectFit:      'cover',
            objectPosition: '42% 45%',
            display:        'block',
          }}
        />
      </motion.div>

      {/* Top gradient — dark hero bleeds in */}
      <div aria-hidden="true" className="photo-grad-top" />
      {/* Bottom gradient — fades into cream */}
      <div aria-hidden="true" className="photo-grad-bottom" />
      {/* Right edge fade */}
      <div aria-hidden="true" className="photo-grad-right" />

      {/* Key skills panel — bottom right */}
      <div className="hero-skills-panel" aria-label="Key skills">
        {KEY_SKILLS.map((skill, i) => (
          <span
            key={skill}
            className="hero-skill-tag"
            style={{ animationDelay: `${0.4 + i * 0.12}s` }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* THE CURTAIN — slides up on scroll */}
      <motion.div
        aria-hidden="true"
        className="photo-curtain"
        style={{ y: reduced ? '-101%' : curtainY }}
      />
    </div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const a = (fn: (...args: number[]) => object, ...args: number[]) =>
    reduced ? { initial: {}, animate: {} } : fn(...args)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setScrolled(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── DARK HERO ── */}
      <section
        id="hero"
        aria-label="Introduction"
        style={{
          position:       'relative',
          minHeight:      '100dvh',
          background:     'var(--ink)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          overflowX:      'hidden',
        }}
      >
        {/* Vertical grid lines */}
        <div className="grid-lines grid-lines-inv" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>

        {/* Registration marks */}
        <div className="reg-mark reg-tl" aria-hidden="true" />
        <div className="reg-mark reg-tr" aria-hidden="true" />
        <div className="reg-mark reg-bl" aria-hidden="true" />
        <div className="reg-mark reg-br" aria-hidden="true" />

        {/* Top row */}
        <motion.div className="hero-top-row" {...a(fadeIn, 0.1, 0.5)}>
          <span className="hero-top-label">NNSC ✦ Portfolio</span>
          <span className="hero-top-label">2024–2028</span>
        </motion.div>

        {/* Giant name */}
        <div
          className="hero-name-block"
          aria-label="Naga Sai Chinmayee Neti"
          style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}
        >
          {NAME_LINES.map((line, i) => (
            <motion.span
              key={line}
              className={i === 1 ? 'hero-name-line hero-name-line-red' : 'hero-name-line hero-name-line-dark'}
              {...a(fadeUp, 0.14 + i * 0.1, 0.9)}
            >
              {line}
            </motion.span>
          ))}
        </div>

        {/* Discipline line */}
        <motion.div
          className="hero-discipline-line"
          {...a(fadeIn, 0.55, 0.7)}
          style={{ position: 'relative', zIndex: 4 }}
        >
          GRAPHIC DESIGN · USER EXPERIENCE · FRONTEND DEV
        </motion.div>

        {/* Bottom row */}
        <motion.div
          {...a(fadeIn, 0.75, 0.65)}
          style={{
            position: 'absolute',
            bottom: 'clamp(2rem, 4.5vh, 3.5rem)',
            left: 'var(--gutter)', right: 'var(--gutter)',
            zIndex: 4, display: 'flex',
            justifyContent: 'space-between', alignItems: 'flex-end',
          }}
        >
          <div className="hero-avail">
            <span className="hero-avail-dot" aria-hidden="true" />
            <span className="hero-avail-text">Available for internships</span>
          </div>
          <motion.a
            href="#about"
            className="hero-cta hero-cta-dark"
            whileHover={reduced ? {} : { x: 4 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            See my work
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M1 4h10M7 1l4 3-4 3" stroke="var(--red)" strokeWidth="1.2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <div
          className={`hero-scroll-indicator${scrolled ? ' hidden-indicator' : ''}`}
          aria-hidden="true"
        />
      </section>

      {/* ── CURTAIN PHOTO SECTION ── */}
      <CurtainPhoto />
    </>
  )
}
