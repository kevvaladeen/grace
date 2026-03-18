import { motion } from 'framer-motion'
import './Timeline.css'

const EVENTS = [
  {
    icon: '✨',
    period: 'The Beginning',
    title: 'The Day We Found Each Other',
    desc: 'Of all the moments in all of time, this one changed everything. The world tilted on its axis and something deep inside me whispered something beautiful has just begun.',
    side: 'left',
  },
  {
    icon: '💕',
    period: 'The Moment',
    title: 'When I Knew',
    desc: 'It was nothing dramatic just a quiet, ordinary moment. And I thought: "This is her. This is the one." I have never once doubted it since.',
    side: 'right',
  },
  {
    icon: '🎂',
    period: 'March 19th, 2026',
    title: 'Happy Birthday, Grace ♥',
    desc: 'Today the world celebrates you and so do I, with every beat of my heart. You deserve every beautiful thing this life has to offer. I love you more than words can hold.',
    side: 'left',
    highlight: true,
  },
]

function TimelineEntry({ event, index }) {
  const isLeft = event.side === 'left'

  return (
    <motion.div
      className={`tl-entry tl-entry--${event.side}${event.highlight ? ' tl-entry--highlight' : ''}`}
      initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* connector dot */}
      <motion.div
        className="tl-dot"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', delay: 0.2, bounce: 0.5 }}
      >
        <span>{event.icon}</span>
      </motion.div>

      {/* card */}
      <div className="tl-card">
        <div className="tl-period">{event.period}</div>
        <h3 className="tl-title">{event.title}</h3>
        <p className="tl-desc">{event.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section className="tl-section">
      <motion.div
        className="tl-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="tl-eyebrow">❧ &nbsp; Our Story &nbsp; ❧</p>
        <h2 className="tl-title-main">Written in the Stars</h2>
        <p className="tl-sub">A love story worth telling, over and over again</p>
      </motion.div>

      <div className="tl-track">
        {/* central spine */}
        <motion.div
          className="tl-spine"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {EVENTS.map((event, i) => (
          <TimelineEntry key={i} event={event} index={i} />
        ))}
      </div>

      {/* Footer ornament */}
      <motion.div
        className="tl-footer"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', delay: 0.3 }}
      >
        ♥
      </motion.div>
    </section>
  )
}
