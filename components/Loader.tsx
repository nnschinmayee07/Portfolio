'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const GREETINGS = [
  { word: 'Hello',       lang: 'English'  },
  { word: 'Bonjour',     lang: 'Français' },
  { word: 'Hola',        lang: 'Español'  },
  { word: 'こんにちは',   lang: '日本語'   },
  { word: '안녕하세요',   lang: '한국어'   },
  { word: '你好',         lang: '中文'     },
  { word: 'नमस्ते',       lang: 'हिन्दी'    },
  { word: 'నమస్కారం',     lang: 'తెలుగు'   },
] as const

// How long each greeting is visible (ms). Telugu holds longer.
const HOLD_MS = (i: number) => (i === GREETINGS.length - 1 ? 1800 : 600)
// Soft ease-out for enter (word settles naturally), sharper exit
const EASE_OUT  = [0.0, 0.0, 0.2, 1] as const   // cubic-bezier ease-out
const EASE_EXIT = [0.4, 0,   1,   1] as const   // accelerate out

interface LoaderProps {
  onComplete?: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [index,   setIndex]   = useState(0)
  const [exiting, setExiting] = useState(false)
  const prefersReduced        = useReducedMotion()
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const isLast = index === GREETINGS.length - 1

    timerRef.current = setTimeout(() => {
      if (isLast) {
        // Begin exit of the whole loader
        setExiting(true)
        setTimeout(() => onComplete?.(), prefersReduced ? 0 : 700)
      } else {
        setIndex(i => i + 1)
      }
    }, HOLD_MS(index))

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, onComplete, prefersReduced])

  const isAnchor = index === GREETINGS.length - 1
  const { word, lang } = GREETINGS[index]

  // Word variants — anchor word uses a slower, weightier entrance
  const wordVariants = {
    enter: {
      opacity: 0,
      y: prefersReduced ? 0 : (isAnchor ? 20 : 10),
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : (isAnchor ? 0.7 : 0.45),
        ease: EASE_OUT,
      },
    },
    exit: {
      opacity: 0,
      y: prefersReduced ? 0 : -8,
      transition: {
        duration: prefersReduced ? 0 : 0.25,
        ease: EASE_EXIT,
      },
    },
  }

  const containerVariants = {
    visible: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.55,
        ease: EASE_OUT,
      },
    },
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          variants={containerVariants}
          initial="visible"
          animate="visible"
          exit="exit"
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         9000,
            backgroundColor: '#0A0A0A',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '0.75rem',
          }}
          aria-label="Loading"
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Language label */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`lang-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.14, ease: EASE_EXIT } }}
              style={{
                fontFamily:    '"Geist Mono", "DM Mono", monospace',
                fontSize:      '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         isAnchor ? '#D90429' : '#4A4A46',
                display:       'block',
                height:        '1rem',
              }}
              aria-hidden="true"
            >
              {lang}
            </motion.span>
          </AnimatePresence>

          {/* Greeting word */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`word-${index}`}
              variants={wordVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              style={{
                fontFamily:    '"Playfair Display", Georgia, serif',
                fontSize:      isAnchor
                  ? 'clamp(2.8rem, 9vw, 6.5rem)'
                  : 'clamp(2rem, 7vw, 5rem)',
                fontWeight:    isAnchor ? 700 : 400,
                fontStyle:     'italic',
                letterSpacing: isAnchor ? '-0.02em' : '-0.01em',
                lineHeight:    1.1,
                color:         '#F0EBE1',
                margin:        0,
                textAlign:     'center',
              }}
            >
              {word}
            </motion.p>
          </AnimatePresence>

          {/* Hairline rule — draws in only on Telugu */}
          <AnimatePresence>
            {isAnchor && (
              <motion.div
                key="rule"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { duration: 0.7, delay: 0.25, ease: EASE_OUT },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                style={{
                  height:          '1px',
                  width:           'clamp(80px, 18vw, 160px)',
                  background:      '#D90429',
                  transformOrigin: 'left center',
                  marginTop:       '0.5rem',
                  opacity:         0.7,
                }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          {/* Screen-reader text: announce current greeting */}
          <span className="sr-only">{word}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
