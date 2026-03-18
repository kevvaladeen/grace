import { useEffect, useRef } from 'react'

const HEARTS = ['♥', '❤', '✦', '✧', '❦', '✿', '❀', '◆']

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function FloatingParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles = []
    const count = 28

    function createParticle() {
      const el = document.createElement('div')
      const symbol = HEARTS[Math.floor(Math.random() * HEARTS.length)]
      el.textContent = symbol
      el.style.cssText = `
        position: absolute;
        pointer-events: none;
        user-select: none;
        font-size: ${randomBetween(10, 28)}px;
        left: ${randomBetween(0, 100)}%;
        bottom: -60px;
        opacity: 0;
        color: hsl(${randomBetween(340, 360)}, ${randomBetween(70, 100)}%, ${randomBetween(65, 85)}%);
        filter: blur(${Math.random() < 0.3 ? 1 : 0}px);
        will-change: transform, opacity;
      `
      container.appendChild(el)

      const duration = randomBetween(7000, 16000)
      const delay = randomBetween(0, 5000)
      const xDrift = randomBetween(-120, 120)
      const rotation = randomBetween(-360, 360)

      let start = null
      function animate(ts) {
        if (!start) start = ts + delay
        const elapsed = ts - start
        if (elapsed < 0) { requestAnimationFrame(animate); return }
        const progress = Math.min(elapsed / duration, 1)

        const yMove = progress * (window.innerHeight + 100)
        const xMove = Math.sin(progress * Math.PI * 2) * xDrift
        const rot = progress * rotation
        const opacity =
          progress < 0.1 ? progress / 0.1 :
          progress > 0.8 ? 1 - (progress - 0.8) / 0.2 : 1

        el.style.transform = `translateY(-${yMove}px) translateX(${xMove}px) rotate(${rot}deg)`
        el.style.opacity = opacity * 0.7

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          el.remove()
          const idx = particles.indexOf(ctrl)
          if (idx > -1) particles.splice(idx, 1)
          setTimeout(spawnOne, randomBetween(500, 2000))
        }
      }

      const ctrl = { el, raf: requestAnimationFrame(animate) }
      particles.push(ctrl)
    }

    function spawnOne() {
      createParticle()
    }

    for (let i = 0; i < count; i++) {
      setTimeout(spawnOne, randomBetween(0, 6000))
    }

    return () => {
      particles.forEach(p => p.el.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}
