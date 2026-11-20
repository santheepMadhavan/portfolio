import { Link, useLocation } from 'react-router'
import { profile } from '../data/profile'
import { useDev } from '../lib/devContext'
import { scrollToSection } from '../lib/scroll'
import { useTheme } from '../lib/useTheme'

const nav = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function SectionLink({ id, children }) {
  const { pathname } = useLocation()
  return (
    <Link
      to="/"
      state={{ scrollTo: id }}
      onClick={(e) => {
        if (pathname === '/') {
          e.preventDefault()
          scrollToSection(id)
        }
      }}
      className="rounded-full px-3 py-1.5 text-[0.9rem] text-muted transition-colors hover:text-ink"
    >
      {children}
    </Link>
  )
}

export default function Header() {
  const { dev, toggle } = useDev()
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'dark'

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <div className="pointer-events-auto flex max-w-full items-center gap-1 rounded-full border border-line bg-frame/85 p-1.5 pl-4 shadow-[0_10px_30px_-18px_rgba(10,12,24,0.45)] backdrop-blur-xl">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0 })}
          className="mr-1 font-display text-[1.15rem] font-semibold tracking-tight sm:mr-3"
          aria-label="Santheep Madhavan, home"
        >
          Santheep Madhavan<span className="text-select">.</span>
        </Link>

        <nav aria-label="Sections" className="hidden items-center md:flex">
          {nav.map((n) => (
            <SectionLink key={n.id} id={n.id}>
              {n.label}
            </SectionLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={dev}
          title="Toggle Dev Mode (D)"
          className={`ml-1 flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[0.78rem] transition-colors ${
            dev ? 'bg-select text-select-ink' : 'bg-frame2 text-ink hover:bg-line'
          }`}
        >
          <span aria-hidden="true">{'</>'}</span>
          Dev mode
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-frame2"
        >
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            {dark ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
              </>
            ) : (
              <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
            )}
          </svg>
        </button>

        <a
          href={profile.links.resume}
          target="_blank"
          rel="noreferrer"
          className="ml-0.5 hidden rounded-full bg-ink px-4 py-2 text-[0.88rem] font-medium text-canvas transition-opacity hover:opacity-85 sm:block"
        >
          Resume
        </a>
      </div>
    </header>
  )
}
