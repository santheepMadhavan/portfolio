import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router'
import Header from './components/Header'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ScrollProgress from './fx/ScrollProgress'
import DevProvider from './lib/DevProvider'

function ScrollToTop() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    if (!state?.scrollTo) window.scrollTo({ top: 0 })
  }, [pathname, state])
  return null
}

const Scene = lazy(() => import('./components/Scene'))

export default function App() {
  return (
    <HashRouter>
      <DevProvider>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <ScrollProgress />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DevProvider>
    </HashRouter>
  )
}
