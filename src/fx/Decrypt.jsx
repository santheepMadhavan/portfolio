import { useRef, useState } from 'react'
import { prefersReducedMotion } from './useInView'

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789#%&*+<>'

/** Scrambles then resolves its text on hover. The real text stays in layout, so width never jumps. */
export default function Decrypt({ text }) {
  const [view, setView] = useState(null)
  const timer = useRef(0)

  const run = () => {
    if (prefersReducedMotion()) return
    clearInterval(timer.current)
    let frame = 0
    const frames = 14
    timer.current = setInterval(() => {
      frame++
      const keep = Math.floor((frame / frames) * text.length)
      setView(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < keep ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(''),
      )
      if (frame >= frames) {
        clearInterval(timer.current)
        setView(null)
      }
    }, 28)
  }

  return (
    <span className="relative inline-block" onPointerEnter={run}>
      <span className={view ? 'invisible' : ''}>{text}</span>
      {view && (
        <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
          {view}
        </span>
      )}
    </span>
  )
}
