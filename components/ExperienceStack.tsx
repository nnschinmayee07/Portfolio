'use client'

import { useLayoutEffect, useRef, useCallback } from 'react'

const EXPERIENCES = [
  {
    index: '01',
    period: 'May 15 – June 15, 2026',
    badge: 'RECENT',
    role: 'UI/UX Intern',
    org: 'DecodeLabs',
    detail: 'Designed and iterated on user interfaces and experience flows. Contributed to product design research, wireframing, and high-fidelity prototyping within an agile team environment.',
    tags: ['UI Design', 'Wireframing', 'Prototyping'],
    accent: '#D62828',
    bg: '#F2EDE6',
  },
  {
    index: '02',
    period: 'Current — Present',
    badge: null,
    role: 'Graphic Designer & Team Lead',
    org: 'College Website Development Internship',
    detail: 'Leading design direction and production for a college-wide website initiative. Visual identity, component systems, editorial layout.',
    tags: ['Visual Identity', 'Design Systems', 'Layout'],
    accent: '#0E0E0E',
    bg: '#E8E3DC',
  },
  {
    index: '03',
    period: '2024 — Present',
    badge: null,
    role: 'Hackathon Participant',
    org: 'Multiple Events',
    detail: 'Participated in multiple hackathons — rapidly prototyping ideas under constraints, collaborating across disciplines, and shipping working products within 24–48 hour windows.',
    tags: ['Rapid Prototyping', 'Collaboration', 'Shipping'],
    accent: '#0E0E0E',
    bg: '#DDD8D0',
  },
]

const STACK_OFFSET = 24    // px each deeper card peeks below the one above
const PIN_RATIO    = 0.18  // fraction from top of viewport where cards lock

export default function ExperienceStack() {
  const rootRef     = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLElement[]>([])
  // Stable offsetTops measured once at mount — no reflow on every scroll tick
  const offsetsRef  = useRef<number[]>([])
  const endTopRef   = useRef(0)
  const rafRef      = useRef<number | null>(null)
  const pendingRef  = useRef(false)

  const applyTransforms = useCallback(() => {
    pendingRef.current = false
    const cards   = cardsRef.current
    const offsets = offsetsRef.current
    if (!cards.length) return

    const scrollTop = window.scrollY
    const vh        = window.innerHeight
    const pinY      = vh * PIN_RATIO
    const endTop    = endTopRef.current

    cards.forEach((card, i) => {
      const cardTop  = offsets[i]
      const pinStart = cardTop - pinY - STACK_OFFSET * i
      const pinEnd   = endTop - vh / 2

      // Gradually scale cards that are buried deeper in the stack
      const scaleProgress = Math.min(1, Math.max(0,
        (scrollTop - pinStart) / (vh * 0.3)
      ))
      const targetScale = 1 - (EXPERIENCES.length - 1 - i) * 0.03
      const scale = i < cards.length - 1
        ? 1 - scaleProgress * (1 - targetScale)
        : 1

      // Translate to simulate pinning
      let ty = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        ty = scrollTop - cardTop + pinY + STACK_OFFSET * i
      } else if (scrollTop > pinEnd) {
        ty = pinEnd - cardTop + pinY + STACK_OFFSET * i
      }

      card.style.transform = `translate3d(0,${ty.toFixed(2)}px,0) scale(${scale.toFixed(4)})`
    })
  }, [])

  const onScroll = useCallback(() => {
    // Coalesce multiple scroll events into one rAF paint
    if (!pendingRef.current) {
      pendingRef.current = true
      rafRef.current = requestAnimationFrame(applyTransforms)
    }
  }, [applyTransforms])

  const measureOffsets = useCallback(() => {
    const root = rootRef.current
    if (!root) return
    const cards  = cardsRef.current
    const rootTop = root.getBoundingClientRect().top + window.scrollY

    // Read all layout in one batch — no interleaved reads/writes
    offsetsRef.current = cards.map(c =>
      rootTop + (c as HTMLElement).offsetTop
    )
    const endEl = root.querySelector('.exp-stack-end') as HTMLElement
    endTopRef.current = endEl ? rootTop + endEl.offsetTop : 0
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll('.exp-stack-card')) as HTMLElement[]
    cardsRef.current = cards

    cards.forEach((card, i) => {
      card.style.transformOrigin    = 'top center'
      card.style.willChange         = 'transform'
      card.style.backfaceVisibility = 'hidden'
      if (i < cards.length - 1) card.style.marginBottom = '120px'
    })

    measureOffsets()
    applyTransforms()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measureOffsets, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measureOffsets)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      cardsRef.current = []
      offsetsRef.current = []
      pendingRef.current = false
    }
  }, [applyTransforms, onScroll, measureOffsets])

  return (
    <div ref={rootRef} className="exp-stack-root">
      {EXPERIENCES.map((exp) => (
        <div key={exp.index} className="exp-stack-card" style={{ background: exp.bg }}>

          {/* Top bar */}
          <div className="exp-stack-top">
            <span className="exp-stack-index" style={{ color: exp.accent }}>{exp.index} / 03</span>
            {exp.badge && (
              <span className="exp-stack-badge">
                <span className="exp-stack-badge-dot" style={{ background: exp.accent }} />
                {exp.badge}
              </span>
            )}
          </div>

          <div className="exp-stack-period">{exp.period}</div>

          <h3 className="exp-stack-role" style={{ color: exp.accent === '#D62828' ? exp.accent : '#0E0E0E' }}>
            {exp.role}
          </h3>

          <div className="exp-stack-org">{exp.org}</div>

          <div className="exp-stack-rule" style={{
            background: exp.accent === '#D62828' ? exp.accent : 'rgba(14,14,14,0.15)'
          }} />

          <p className="exp-stack-detail">{exp.detail}</p>

          <div className="exp-stack-tags">
            {exp.tags.map(t => (
              <span key={t} className="exp-stack-tag" style={{
                borderColor: exp.accent === '#D62828' ? `${exp.accent}40` : 'rgba(14,14,14,0.15)',
                color: exp.accent === '#D62828' ? exp.accent : '#888880',
              }}>
                {t}
              </span>
            ))}
          </div>

        </div>
      ))}
      {/* End sentinel — where pinning releases */}
      <div className="exp-stack-end" />
    </div>
  )
}
