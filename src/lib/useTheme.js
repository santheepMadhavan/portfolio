import { useCallback, useState } from 'react'

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || (systemPrefersDark() ? 'dark' : 'light'),
  )

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage can be blocked; the theme still applies for this visit */
      }
      return next
    })
  }, [])

  return [theme, toggle]
}
