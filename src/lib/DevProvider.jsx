import { useCallback, useEffect, useMemo, useState } from 'react'
import { DevContext } from './devContext'

export default function DevProvider({ children }) {
  const [dev, setDev] = useState(false)
  const toggle = useCallback(() => setDev((d) => !d), [])

  // "D" toggles Dev Mode, unless the person is typing somewhere.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target
      if (t instanceof HTMLElement && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName))) return
      if (e.key.toLowerCase() === 'd') setDev((d) => !d)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const value = useMemo(() => ({ dev, toggle }), [dev, toggle])
  return <DevContext.Provider value={value}>{children}</DevContext.Provider>
}
