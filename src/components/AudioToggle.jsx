import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AudioToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio('/beele.mp3')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  async function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (!playing) {
      try {
        audio.currentTime = audio.currentTime || 0
        audio.volume = 0.75
        await audio.play()
        setPlaying(true)
      } catch (err) {
        console.error('Audio play failed:', err)
      }
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <motion.button
      onClick={toggle}
      title={playing ? 'Mute ambient music' : 'Play ambient music'}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 200,
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        border: '1px solid rgba(201, 168, 76, 0.4)',
        background: 'rgba(26, 10, 18, 0.85)',
        backdropFilter: 'blur(8px)',
        color: playing ? '#c9a84c' : '#554040',
        fontSize: '1.1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.3s',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
    >
      {playing ? '♪' : '♩'}
    </motion.button>
  )
}
