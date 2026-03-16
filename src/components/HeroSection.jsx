import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import './HeroSection.css'

const TITLE_CHARS = "Happy Birthday,".split('')
const NAME_CHARS  = "Grace".split('')
const SUB_TEXT = "My Love, My Light, My Everything"

function GlowOrb({ x, y, color, size }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(80px)',
        opacity: 0.18,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

function AnimatedHeart() {
  return (
    <motion.div
      className="hero-heart"
      animate={{
        scale: [1, 1.12, 1],
        filter: [
          'drop-shadow(0 0 12px #c8496a88)',
          'drop-shadow(0 0 28px #c8496acc)',
          'drop-shadow(0 0 12px #c8496a88)',
        ],
      }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      ♥
    </motion.div>
  )
}

function FloatingRoses() {
  const roses = ['❀', '✿', '❁', '❃']
  return (
    <div className="floating-roses">
      {roses.map((r, i) => (
        <motion.span
          key={i}
          className="floating-rose"
          style={{ '--i': i }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, i % 2 === 0 ? 12 : -12, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          {r}
        </motion.span>
      ))}
    </div>
  )
}

export default function HeroSection({ onOpenLetter }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    function onMove(e) {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.set((e.clientX - cx) * 0.012)
      mouseY.set((e.clientY - cy) * 0.012)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section className="hero">
      {/* ambient orbs */}
      <GlowOrb x={15}  y={20}  color="#c8496a" size="500px" />
      <GlowOrb x={85}  y={70}  color="#8b1a35" size="400px" />
      <GlowOrb x={50}  y={90}  color="#c9a84c" size="350px" />

      {/* parallax container */}
      <motion.div
        className="hero-inner"
        style={{ rotateX: springY, rotateY: springX }}
      >
        {/* top ornament */}
        <motion.div
          className="ornament-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* subtitle top */}
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ✦ &nbsp; A message from the heart &nbsp; ✦
        </motion.p>

        {/* main heading */}
        <h1 className="hero-title">
          {TITLE_CHARS.map((ch, i) => (
            <motion.span
              key={i}
              className="hero-title-char"
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.8 + i * 0.045,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </motion.span>
          ))}
        </h1>

        {/* name — Grace */}
        <motion.div
          className="hero-name-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="hero-name">
            {NAME_CHARS.map((ch, i) => (
              <motion.span
                key={i}
                className="hero-name-char"
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.6 + i * 0.08,
                  type: 'spring',
                  bounce: 0.4,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* animated heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.1, type: 'spring', bounce: 0.5 }}
        >
          <AnimatedHeart />
        </motion.div>

        {/* sub text */}
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3 }}
        >
          {SUB_TEXT}
        </motion.p>

        {/* floating roses */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <FloatingRoses />
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
          className="cta-wrapper"
        >
          <motion.button
            className={`cta-btn${hovered ? ' hovered' : ''}`}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={onOpenLetter}
            whileTap={{ scale: 0.96 }}
          >
            <span className="cta-icon">✉</span>
            <span className="cta-text">Open My Letter to You</span>
            <motion.span
              className="cta-shine"
              animate={{ x: hovered ? '200%' : '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </motion.button>
          <p className="cta-hint">( tap the envelope to read my heart )</p>
        </motion.div>

        {/* bottom ornament */}
        <motion.div
          className="ornament-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* decorative corner flourishes */}
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <motion.div
            key={pos}
            className={`corner-flourish corner-${pos}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 0.8, delay: 3.2, type: 'spring' }}
          >
            ❧
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
