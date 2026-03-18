import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './LetterModal.css'

const LETTER_PARAGRAPHS = [
  {
    type: 'greeting',
    text: 'My Dearest Grace,',
  },
  {
    type: 'body',
    text: 'There are moments in life that arrive quietly like the way soft morning light finds its way through curtains, slowly warming everything it touches. That is what you are to me. You arrived in my world not with fanfare, but with a warmth so gentle and so profound that I never want to know a single day without it.',
  },
  {
    type: 'body',
    text: 'On this beautiful day, March 19th  as the world celebrates the gift of your existence, I find myself overwhelmed with gratitude. Grateful that the universe, in all its infinite wonder, decided that our paths should cross. That out of every moment in time, I get to be yours and you get to be mine.',
  },
  {
    type: 'quote',
    text: '"You are the poem I never knew how to write, the song I have always heard in my heart."',
  },
  {
    type: 'body',
    text: 'I love the way your laugh fills a room before you even finish the joke. I love how your eyes light up when you talk about the things you care about. I love your name  Grace  because it suits you perfectly. I love the quiet comfort of simply being beside you, how the whole world feels softer, safer, and infinitely more beautiful with you in it.',
  },
  {
    type: 'body',
    text: 'You are extraordinary, my love. Not just in the grand gestures, but in the everyday magic you create without even realizing it. In every small kindness, every glance, every moment you choose to show up fully, you remind me what it means to truly live.',
  },
  {
    type: 'body',
    text: 'Today I want you to know that you are celebrated, you are cherished, and you are loved so deeply that words even the most beautiful ones fall a little short. But I promise to spend every single day showing you anyway.',
  },
  {
    type: 'closing',
    text: 'Happy Birthday, Grace  my heart, my home, my everything.\nAll my love, always and forever.',
  },
  {
    type: 'signature',
    text: 'Yours,trurly \nLieutenant ♥',
  },
]

function LetterParagraph({ para, index, revealed }) {
  return (
    <motion.div
      className={`letter-para letter-para--${para.type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {para.type === 'quote' ? (
        <blockquote>{para.text}</blockquote>
      ) : (
        <p style={{ whiteSpace: 'pre-line' }}>{para.text}</p>
      )}
    </motion.div>
  )
}

export default function LetterModal({ onClose }) {
  const [revealed, setRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 400)
    const t2 = setTimeout(() => setShowConfetti(true), 600)
    const t3 = setTimeout(() => setShowConfetti(false), 5500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={180}
          recycle={false}
          colors={['#c8496a', '#f4a7b9', '#c9a84c', '#f0d080', '#fff', '#8b1a35']}
          gravity={0.18}
          style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }}
        />
      )}

      {/* Backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      {/* Letter container */}
      <motion.div
        className="modal-container"
        initial={{ opacity: 0, scale: 0.85, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Paper texture overlay */}
        <div className="letter-paper">
          {/* Wax seal */}
          <motion.div
            className="wax-seal"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.4 }}
          >
            <span>♥</span>
          </motion.div>

          {/* Letter header decoration */}
          <motion.div
            className="letter-header-deco"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="deco-ornament">❧</span>
            <div className="deco-line" />
            <span className="deco-ornament" style={{ transform: 'scaleX(-1)' }}>❧</span>
          </motion.div>

          {/* Date */}
          <motion.div
            className="letter-date"
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            March 19th, 2026
          </motion.div>

          {/* Letter body */}
          <div className="letter-body">
            {LETTER_PARAGRAPHS.map((para, i) => (
              <LetterParagraph
                key={i}
                para={para}
                index={i}
                revealed={revealed}
              />
            ))}
          </div>

          {/* Signature */}
          <motion.div
            className="letter-signature"
            initial={{ opacity: 0, y: 10 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: LETTER_PARAGRAPHS.length * 0.18 + 0.3 }}
          >
            <div className="sig-roses">❀ ✿ ❀</div>
            <div className="sig-line" />
          </motion.div>

          {/* Bottom ornament */}
          <motion.div
            className="letter-footer-deco"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="deco-ornament">❧</span>
            <div className="deco-line" />
            <span className="deco-ornament" style={{ transform: 'scaleX(-1)' }}>❧</span>
          </motion.div>

          {/* Close button */}
          <motion.button
            className="close-btn"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Close letter"
          >
            ✕  Close
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}
