import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './useInView'

/** Moves the element against the scroll direction, proportional to its distance from screen centre. */
export default function Parallax({ speed = 0.06, as: Tag = 'div', className = '', children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let raf = 0
    let y = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > innerHeight + 200) return
      const centre = r.top - y + r.height / 2 - innerHeight / 2
      y = -centre * speed
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
    }
    const schedule = () => raf || (raf = requestAnimationFrame(update))
    update()
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    return () => {
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [speed])
  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </Tag>
  )
}
