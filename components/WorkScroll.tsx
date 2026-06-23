'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PROJECTS = [
  {
    num: '01',
    title: 'Sophix',
    label: 'Student Platform · UI/UX',
    year: '2024',
    discipline: 'Interface Design',
    desc: 'An Unstop-inspired competitive platform for students. Built from first principles — clean flows, intuitive dashboards, pixel-perfect UI throughout.',
    tags: ['UI/UX', 'HTML & CSS', 'JavaScript', 'Figma'],
    live: 'https://sophix-git-main-nnschinmayee07-8534s-projects.vercel.app',
    github: 'https://github.com/nnschinmayee07/Sophix',
    accent: '#D62828',
    diskColor: '#1A0A0A',
    ringColor: 'rgba(214,40,40,0.18)',
    groove: '#D62828',
  },
  {
    num: '02',
    title: 'Home Farm\nDesigning Tool',
    label: 'Spatial Tool · Canvas API',
    year: '2024',
    discipline: 'Tool Design',
    desc: 'Planning and visualizing home farm layouts. Design meets spatial thinking — where agriculture becomes an interface problem.',
    tags: ['Software', 'UI Design', 'Canvas API'],
    live: 'https://homefarm-planner.vercel.app',
    github: 'https://github.com/nnschinmayee07/My-home-farm-designer',
    accent: '#4B7BEC',
    diskColor: '#0A0D1A',
    ringColor: 'rgba(75,123,236,0.18)',
    groove: '#4B7BEC',
  },
  {
    num: '03',
    title: 'Dexpress\nDeployment',
    label: 'Dev Tool · Next.js',
    year: '2024',
    discipline: 'Developer Experience',
    desc: 'Streamlined deployment tool built for developer experience. DX-first from first principles — getting apps from local to live without friction.',
    tags: ['Next.js', 'TypeScript', 'DevOps'],
    live: 'https://zignasa-three.vercel.app',
    github: 'https://github.com/nnschinmayee07/Zignasa',
    accent: '#4B7BEC',
    diskColor: '#080D18',
    ringColor: 'rgba(75,123,236,0.18)',
    groove: '#4B7BEC',
  },
  {
    num: '04',
    title: 'Gesture\nControlled Gloves',
    label: 'Hardware · Arduino IoT',
    year: '2024',
    discipline: 'Physical Computing',
    desc: 'Arduino-based gesture detection using flex sensors. Where hardware meets human-centered thinking — the body as input device.',
    tags: ['Arduino', 'C++', 'IoT'],
    live: null,
    github: 'https://github.com/nnschinmayee07/Gestures-to-speech',
    accent: '#D62828',
    diskColor: '#120808',
    ringColor: 'rgba(214,40,40,0.18)',
    groove: '#D62828',
  },
]

/* ─────────────────────────────────────────────
   DISK — the vinyl record centerpiece
───────────────────────────────────────────── */
function ProjectDisk({
  project,
  isSpinning,
}: {
  project: typeof PROJECTS[0]
  isSpinning: boolean
}) {
  const reduced = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.num}
        initial={{ opacity: 0, scale: 0.88, rotate: reduced ? 0 : -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.94, rotate: reduced ? 0 : 8 }}
        transition={{ duration: 0.65, ease: [0.22, 0.1, 0.36, 1] }}
        className="gallery-disk-wrap"
        aria-hidden="true"
      >
        {/* Outer glow ring */}
        <div
          className="gallery-disk-glow"
          style={{ background: `radial-gradient(circle, ${project.ringColor} 0%, transparent 70%)` }}
        />

        {/* The disk itself */}
        <motion.div
          className="gallery-disk"
          style={{ background: project.diskColor }}
          animate={(!reduced && isSpinning) ? { rotate: 360 } : { rotate: 0 }}
          transition={(!reduced && isSpinning) ? {
            repeat: Infinity,
            duration: 8,
            ease: 'linear',
          } : { duration: 0.4 }}
        >
          {/* Concentric groove rings */}
          {[82, 72, 62, 52, 42, 35, 28].map((r, i) => (
            <div
              key={r}
              className="gallery-disk-groove"
              style={{
                width: `${r}%`,
                height: `${r}%`,
                borderColor: i === 0
                  ? `${project.groove}22`
                  : i === 1
                  ? `${project.groove}14`
                  : 'rgba(242,237,230,0.04)',
              }}
            />
          ))}

          {/* Label area — center circle */}
          <div className="gallery-disk-label" style={{ borderColor: `${project.groove}30` }}>
            <div className="gallery-disk-label-num" style={{ color: project.accent }}>
              {project.num}
            </div>
            <div className="gallery-disk-label-title">
              {project.title.replace('\n', ' ')}
            </div>
            <div className="gallery-disk-label-year" style={{ color: `${project.groove}99` }}>
              {project.year}
            </div>
          </div>

          {/* Spindle hole */}
          <div className="gallery-disk-hole" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────
   COMMENTARY PANEL — the museum placard
───────────────────────────────────────────── */
function Commentary({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.num}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.5, ease: [0.22, 0.1, 0.36, 1], delay: 0.1 }}
        className="gallery-commentary"
      >
        {/* Exhibit number */}
        <div className="gallery-commentary-eyebrow">
          <span style={{ color: project.accent }}>{project.num}</span>
          <span className="gallery-commentary-slash">/</span>
          <span>0{PROJECTS.length}</span>
          <span className="gallery-commentary-sep" />
          <span>{project.discipline}</span>
        </div>

        {/* Accent rule */}
        <motion.div
          className="gallery-commentary-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 0.1, 0.36, 1] }}
          style={{ background: project.accent, transformOrigin: 'left' }}
        />

        {/* Title */}
        <h3 className="gallery-commentary-title">
          {project.title.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </h3>

        {/* Year + label */}
        <div className="gallery-commentary-label">{project.label}</div>

        {/* Description */}
        <p className="gallery-commentary-desc">{project.desc}</p>

        {/* Tags */}
        <div className="gallery-commentary-tags">
          {project.tags.map(t => (
            <span key={t} className="gallery-commentary-tag">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="gallery-commentary-links">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener"
              className="gallery-link gallery-link-primary"
              style={{ color: project.accent, borderColor: `${project.accent}40` }}
            >
              ↗ View Live
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener"
            className="gallery-link gallery-link-ghost"
          >
            GitHub ↗
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────
   EXHIBIT PROGRESS — the spine tracker
───────────────────────────────────────────── */
function ExhibitProgress({
  total,
  active,
  projects,
  onSelect,
}: {
  total: number
  active: number
  projects: typeof PROJECTS
  onSelect: (i: number) => void
}) {
  return (
    <div className="gallery-progress">
      {projects.map((p, i) => (
        <button
          key={i}
          className={`gallery-progress-pip${i === active ? ' active' : ''}`}
          onClick={() => onSelect(i)}
          aria-label={`Go to project ${i + 1}: ${p.title.replace('\n', ' ')}`}
          style={i === active ? { background: p.accent } : {}}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN GALLERY — scroll-driven exhibit hall
───────────────────────────────────────────── */
export default function WorkScroll() {
  const reduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([])
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastActiveRef = useRef(0)

  const triggerSpin = useCallback((nextIdx: number) => {
    if (nextIdx === lastActiveRef.current) return
    lastActiveRef.current = nextIdx
    setActiveIdx(nextIdx)
    if (!reduced) {
      setIsSpinning(true)
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current)
      spinTimerRef.current = setTimeout(() => setIsSpinning(false), 1200)
    }
  }, [reduced])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sentinelRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) triggerSpin(i)
        },
        { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => {
      observers.forEach(o => o.disconnect())
      if (spinTimerRef.current) clearTimeout(spinTimerRef.current)
    }
  }, [triggerSpin])

  // Jump to sentinel on pip click
  const handlePipSelect = (i: number) => {
    const sentinel = sentinelRefs.current[i]
    if (sentinel) {
      sentinel.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const active = PROJECTS[activeIdx]

  return (
    <div className="gallery-root" ref={containerRef}>

      {/* ── STICKY STAGE ── */}
      <div className="gallery-stage-wrap">
        <div className="gallery-stage">

          {/* Background wash tied to active project */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-${activeIdx}`}
              className="gallery-stage-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `radial-gradient(ellipse 60% 60% at 35% 50%, ${active.ringColor}, transparent 70%)`
              }}
            />
          </AnimatePresence>

          {/* Left — disk */}
          <div className="gallery-disk-col">
            <ProjectDisk project={active} isSpinning={isSpinning} />
          </div>

          {/* Right — commentary */}
          <div className="gallery-commentary-col">
            <Commentary project={active} />
          </div>

          {/* Progress spine */}
          <ExhibitProgress
            total={PROJECTS.length}
            active={activeIdx}
            projects={PROJECTS}
            onSelect={handlePipSelect}
          />

          {/* Exhibit count — bottom left */}
          <div className="gallery-exhibit-count" aria-live="polite">
            <span style={{ color: active.accent }}>{String(activeIdx + 1).padStart(2, '0')}</span>
            <span className="gallery-exhibit-count-sep"> / </span>
            <span>0{PROJECTS.length}</span>
          </div>

          {/* Scroll hint — only on first exhibit */}
          <AnimatePresence>
            {activeIdx === 0 && (
              <motion.div
                className="gallery-scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                aria-hidden="true"
              >
                <div className="gallery-scroll-hint-line" />
                <span>scroll</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* ── SCROLL SENTINELS — trigger exhibit changes ── */}
      <div className="gallery-sentinels" aria-hidden="true">
        {PROJECTS.map((p, i) => (
          <div
            key={p.num}
            ref={el => { sentinelRefs.current[i] = el }}
            className="gallery-sentinel"
            data-index={i}
          />
        ))}
      </div>

    </div>
  )
}
