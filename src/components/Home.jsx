import { useEffect } from 'react'
import { useLocation } from 'react-router'
import Contact from './Contact'
import Experience from './Experience'
import Hero from './Hero'
import Skills from './Skills'

export default function Home() {
  const { state } = useLocation()

  useEffect(() => {
    const id = state?.scrollTo
    if (!id) return
    // Wait a frame so the section exists before scrolling to it.
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(raf)
  }, [state])

  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
