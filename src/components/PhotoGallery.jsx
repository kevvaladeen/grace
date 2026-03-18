import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './PhotoGallery.css'

const REASONS = [
  {
    icon: '🌹',
    title: 'Your Smile',
    note: 'It lights up every room you walk into and every corner of my heart.',
  },
  {
    icon: '✨',
    title: 'Your Kindness',
    note: 'The way you care for others without a second thought is one of the most beautiful things about you.',
  },
  {
    icon: '💫',
    title: 'Your Strength',
    note: 'You face every challenge with a grace that leaves me in awe every single time.',
  },
  {
    icon: '🌙',
    title: 'Your Laughter',
    note: 'I would do anything to hear it — it is genuinely my favourite sound in the world.',
  },
  {
    icon: '🌸',
    title: 'Your Heart',
    note: 'Loving and pure. You make everyone around you feel seen, safe, and special.',
  },
  {
    icon: '♥',
    title: 'Simply You',
    note: 'There is no one else like you. There never could be. Happy Birthday, Grace.',
  },
]

function ReasonCard({ reason, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="reason-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <span className="reason-icon">{reason.icon}</span>
      <p className="reason-title">{reason.title}</p>
      <p className="reason-note">{reason.note}</p>
    </motion.div>
  )
}

export default function PhotoGallery() {
  return (
    <section className="gallery-section">
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="gallery-eyebrow">❧ &nbsp; For You &nbsp; ❧</p>
        <h2 className="gallery-title">Reasons I Love You</h2>
        <p className="gallery-sub">Just a few of the countless reasons you mean the world to me</p>
      </motion.div>

      <div className="reason-grid">
        {REASONS.map((reason, i) => (
          <ReasonCard key={i} reason={reason} index={i} />
        ))}
      </div>
    </section>
  )
}
