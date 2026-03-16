import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './PhotoGallery.css'

// ─────────────────────────────────────────────────────
// Replace the `gradient` with an `img` path when you
// have real photos, e.g.:  img: '/photos/us1.jpg'
// ─────────────────────────────────────────────────────
const PHOTOS = [
  {
    img: '/p.jpeg',
    caption: 'Beautiful',
    note: 'beautiful smile',
    rot: -2.5,
  },
  {
    gradient: 'linear-gradient(135deg, #1a3a5c 0%, #2a6090 50%, #60a8d8 100%)',
    emoji: '🌙',
    caption: 'Under the Stars',
    note: 'A night I\'ll never forget',
    rot: 1.8,
  },
  {
    gradient: 'linear-gradient(135deg, #6b3a1f 0%, #c9a84c 60%, #f0d080 100%)',
    emoji: '🌻',
    caption: 'Golden Days',
    note: 'Every day brighter with you',
    rot: -1.2,
  },
  {
    gradient: 'linear-gradient(135deg, #1a4a2a 0%, #3a8a4a 55%, #70c080 100%)',
    emoji: '🌿',
    caption: 'Our Happy Place',
    note: 'Home is wherever you are',
    rot: 2.8,
  },
  {
    gradient: 'linear-gradient(135deg, #4a1a5c 0%, #9a3ab0 55%, #d080e0 100%)',
    emoji: '✨',
    caption: 'Adventures Together',
    note: 'More to come, I promise',
    rot: -2.0,
  },
  {
    gradient: 'linear-gradient(135deg, #8b1a35 0%, #c8496a 40%, #c9a84c 100%)',
    emoji: '♥',
    caption: 'Happy Birthday, Grace',
    note: 'March 19th, 2026',
    rot: 1.4,
  },
]

function PolaroidCard({ photo, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="polaroid"
      style={{ '--rot': `${photo.rot}deg` }}
      initial={{ opacity: 0, y: 70, rotate: photo.rot }}
      animate={inView ? { opacity: 1, y: 0, rotate: photo.rot } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        rotate: 0,
        scale: 1.07,
        y: -8,
        zIndex: 20,
        transition: { duration: 0.25 },
      }}
    >
      <div className="polaroid-img" style={{ background: photo.gradient || '#1a0a12' }}>
        {photo.img
          ? <img src={photo.img} alt={photo.caption} />
          : <span className="polaroid-emoji">{photo.emoji}</span>
        }
      </div>
      <div className="polaroid-caption">
        <p className="polaroid-title">{photo.caption}</p>
        <p className="polaroid-note">{photo.note}</p>
      </div>
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
        <p className="gallery-eyebrow">❧ &nbsp; Our Moments &nbsp; ❧</p>
        <h2 className="gallery-title">Memories With You</h2>
        <p className="gallery-sub">Every photo tells a story — ours is my favourite</p>
      </motion.div>

      <div className="polaroid-grid">
        {PHOTOS.map((photo, i) => (
          <PolaroidCard key={i} photo={photo} index={i} />
        ))}
      </div>

      <motion.p
        className="gallery-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        ✦ &nbsp; Replace placeholders with our real photos in PhotoGallery.jsx &nbsp; ✦
      </motion.p>
    </section>
  )
}
