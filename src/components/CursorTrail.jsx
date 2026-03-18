import { useEffect } from 'react'

const SYMBOLS = ['♥', '✦', '❤', '✿', '❀', '✧', '❦']

export default function CursorTrail() {
  useEffect(() => {
    // Inject the keyframe animation once
    const style = document.createElement('style')
    style.id = 'cursor-trail-styles'
    style.textContent = `
      @keyframes trailFly {
        0%   { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        100% { opacity: 0; transform: translate(-50%, calc(-50% - 55px)) scale(0.2) rotate(40deg); }
      }
    `
    document.head.appendChild(style)

    let lastX = 0
    let lastY = 0
    let active = true

    function spawnHeart(x, y) {
      if (!active) return
      const el = document.createElement('span')
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      const size = 10 + Math.random() * 14
      const duration = 0.55 + Math.random() * 0.4
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        user-select: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        line-height: 1;
        color: hsl(${338 + Math.random() * 22}, ${75 + Math.random() * 20}%, ${62 + Math.random() * 22}%);
        animation: trailFly ${duration}s ease-out forwards;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), duration * 1000 + 50)
    }

    function onMove(e) {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (dx * dx + dy * dy > 120) {
        spawnHeart(e.clientX, e.clientY)
        lastX = e.clientX
        lastY = e.clientY
      }
    }

    // Touch support
    function onTouch(e) {
      const t = e.touches[0]
      if (t) spawnHeart(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      active = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      style.remove()
    }
  }, [])

  return null
}
