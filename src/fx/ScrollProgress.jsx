import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`
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
  return <div ref={ref} aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-select" />
}
