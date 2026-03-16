import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import LetterModal from './components/LetterModal'
import FloatingParticles from './components/FloatingParticles'
import AudioToggle from './components/AudioToggle'
import CursorTrail from './components/CursorTrail'
import CountdownSection from './components/CountdownSection'
import PhotoGallery from './components/PhotoGallery'
import Timeline from './components/Timeline'
import './App.css'

function SectionDivider() {
  return (
    <div className="section-divider">
      <div className="divider-line" />
      <span className="divider-ornament">❧ ♥ ❧</span>
      <div className="divider-line" />
    </div>
  )
}

export default function App() {
  const [letterOpen, setLetterOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="app-root">
      <FloatingParticles />
      <CursorTrail />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="content-wrapper"
          >
            <HeroSection onOpenLetter={() => setLetterOpen(true)} />
            <SectionDivider />
            <CountdownSection />
            <SectionDivider />
            <PhotoGallery />
            <SectionDivider />
            <Timeline />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {letterOpen && (
          <LetterModal onClose={() => setLetterOpen(false)} />
        )}
      </AnimatePresence>

      <AudioToggle />
    </div>
  )
}
