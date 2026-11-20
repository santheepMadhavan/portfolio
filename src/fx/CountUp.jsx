import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from './useInView'

/** Animates the number inside strings like "30,000+", "$1.3M" or "8" once visible. */
export default function CountUp({ value, duration = 1400 }) {
  const m = /^(\D*)([\d,.]+)(.*)$/.exec(value)
  const [ref, seen] = useInView(0.5)
  const [t, setT] = useState(prefersReducedMotion() ? 1 : 0)

  useEffect(() => {
    if (!seen || !m || prefersReducedMotion()) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      setT(1 - Math.pow(1 - p, 4))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, duration]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!m) return <span>{value}</span>
  const [, pre, num, post] = m
  const target = parseFloat(num.replace(/,/g, ''))
  const dec = (num.split('.')[1] || '').length
  const shown = (target * t).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      <span aria-hidden="true">
        {pre}
        {shown}
        {post}
      </span>
    </span>
  )
}
