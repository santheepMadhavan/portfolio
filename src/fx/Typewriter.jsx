import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './useInView'

/**
 * Types `lines` one after another. The full text is always laid out (the
 * untyped rest is invisible) so nothing shifts while it types, and the
 * complete string is exposed to assistive tech immediately.
 */
export default function Typewriter({ lines, speed = 42, linePause = 220, startDelay = 350, className = '' }) {
  const total = lines.reduce((a, l) => a + l.length, 0)
  const [n, setN] = useState(() => (prefersReducedMotion() ? total : 0))
  const [caretOn, setCaretOn] = useState(true)

  useEffect(() => {
    if (n >= total) return
    const boundaries = new Set()
    let acc = 0
    lines.forEach((l) => boundaries.add((acc += l.length)))
    const wait = n === 0 ? startDelay : boundaries.has(n) ? linePause : speed * (0.7 + Math.random() * 0.6)
    const t = setTimeout(() => setN((v) => v + 1), wait)
    return () => clearTimeout(t)
  }, [n, total, lines, speed, linePause, startDelay])

  useEffect(() => {
    if (n < total) return
    const t = setTimeout(() => setCaretOn(false), 2600)
    return () => clearTimeout(t)
  }, [n, total])

  let start = 0
  return (
    <span className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => {
        const typed = Math.max(0, Math.min(line.length, n - start))
        const active = n >= start && (n < start + line.length || (i === lines.length - 1 && caretOn))
        start += line.length
        return (
          <span key={line} className="block" aria-hidden="true">
            {line.slice(0, typed)}
            <span className="relative inline-block w-0 align-baseline">
              {active && caretOn && <i className={`caret ${n >= total ? 'caret-idle' : ''}`} />}
            </span>
            <span className="invisible">{line.slice(typed)}</span>
          </span>
        )
      })}
    </span>
  )
}
