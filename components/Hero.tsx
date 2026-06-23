'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AuroraBlob from './AuroraBlob'

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
  const nameBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setScrolled(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cursor-tinted text: track pointer over the name block, paint a
  // radial red spotlight via CSS custom properties on each line.
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return
    const block = nameBlockRef.current
    if (!block) return
    const lines = block.querySelectorAll<HTMLElement>('.hero-name-spotlight')
    lines.forEach(line => {
      const r = line.getBoundingClientRect()
      // Distance from cursor to the vertical center of this line
      const lineCenterY = r.top + r.height / 2
      const distY = Math.abs(e.clientY - lineCenterY)
      // Only paint blue if cursor is within ~half a line-height of this line
      const threshold = r.height * 0.9
      if (distY > threshold) {
        // Too far — clear tint on this line
        line.style.removeProperty('--cx')
        line.style.removeProperty('--cy')
        line.dataset.active = 'off'
      } else {
        const x = ((e.clientX - r.left) / r.width  * 100).toFixed(2)
        const y = ((e.clientY - r.top)  / r.height * 100).toFixed(2)
        line.style.setProperty('--cx', `${x}%`)
        line.style.setProperty('--cy', `${y}%`)
        line.dataset.active = 'on'
      }
    })
    block.dataset.spotlight = 'on'
  }, [reduced])

  const onPointerLeave = useCallback(() => {
    const block = nameBlockRef.current
    if (!block) return
    block.dataset.spotlight = 'off'
    block.querySelectorAll<HTMLElement>('.hero-name-spotlight').forEach(line => {
      line.dataset.active = 'off'
    })
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
        {/* Aurora ambient layer */}
        <AuroraBlob />

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

        {/* Giant name — cursor spotlight tints text on hover */}
        <div
          ref={nameBlockRef}
          className="hero-name-block"
          aria-label="Naga Sai Chinmayee Neti"
          data-spotlight="off"
          style={{ position: 'relative', zIndex: 3, textAlign: 'center' }}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          {NAME_LINES.map((line, i) => (
            <motion.span
              key={line}
              className={i === 1 ? 'hero-name-line hero-name-line-red' : 'hero-name-line hero-name-line-dark hero-name-spotlight'}
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
