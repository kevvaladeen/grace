import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CountdownSection.css'

// Grace's birthday: March 19 2026
const BIRTHDAY = new Date(2026, 2, 19) // month is 0-indexed

function getTimeLeft() {
  const now = new Date()
  const target = new Date(BIRTHDAY)
  target.setHours(0, 0, 0, 0)
  const diff = target - now

  if (diff <= 0) return null // it's her birthday!

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

function CountUnit({ value, label, delay }) {
  return (
    <motion.div
      className="cd-unit"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="cd-number">{String(value).padStart(2, '0')}</div>
      <div className="cd-label">{label}</div>
    </motion.div>
  )
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="cd-section">
      <motion.div
        className="cd-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="cd-eyebrow"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ✦ &nbsp; counting down to &nbsp; ✦
        </motion.p>

        <motion.h2
          className="cd-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Grace's Birthday
        </motion.h2>

        <motion.p
          className="cd-date"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          March 19th, 2026
        </motion.p>

        {time ? (
          <div className="cd-grid">
            <CountUnit value={time.days}    label="Days"    delay={0.25} />
            <div className="cd-colon">:</div>
            <CountUnit value={time.hours}   label="Hours"   delay={0.35} />
            <div className="cd-colon">:</div>
            <CountUnit value={time.minutes} label="Minutes" delay={0.45} />
            <div className="cd-colon">:</div>
            <CountUnit value={time.seconds} label="Seconds" delay={0.55} />
          </div>
        ) : (
          <motion.div
            className="cd-birthday-now"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            🎂 &nbsp; Today is your day, Grace! &nbsp; 🎂
          </motion.div>
        )}

        <motion.p
          className="cd-sub"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          Every second brings us closer to celebrating you
        </motion.p>
      </motion.div>
    </section>
  )
}
