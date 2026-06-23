'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './Loader'

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!done && <Loader onComplete={() => setDone(true)} />}
      </AnimatePresence>

      {/* Page content fades in after loader exits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}
