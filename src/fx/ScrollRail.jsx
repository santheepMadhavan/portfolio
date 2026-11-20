import { useEffect, useRef } from 'react'

/** A vertical rail that fills as its parent scrolls through the viewport. */
export default function ScrollRail() {
  const fill = useRef(null)
  useEffect(() => {
    const parent = fill.current.parentElement
    let raf = 0
    const update = () => {
      raf = 0
      const r = parent.getBoundingClientRect()
      const p = (innerHeight * 0.6 - r.top) / r.height
      fill.current.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`
    }
    const schedule = () => raf || (raf = requestAnimationFrame(update))
    update()
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    return () => {
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
    }
  }, [])
  return (
    <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-line md:block">
      <div ref={fill} className="h-full origin-top scale-y-0 bg-select" />
    </div>
  )
}
