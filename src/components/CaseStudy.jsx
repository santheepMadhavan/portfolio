import { Link, Navigate, useParams } from 'react-router'
import { hotstarCase, projects } from '../data/projects'
import Inspect from './Inspect'

const base = import.meta.env.BASE_URL
const slugOf = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function Section({ s }) {
  return (
    <Inspect as="section" name={`Frame / ${s.name}`} id={slugOf(s.name)} className="scroll-mt-24 rounded-frame bg-frame p-6 sm:p-10">
      <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold">{s.name}</h2>
      <div className="mt-5 flex max-w-[66ch] flex-col gap-4 text-muted">
        {s.body?.map((p) => (
          <p key={p}>{p}</p>
        ))}

        {s.lists?.map((l) => (
          <div key={l.title} className="mt-4">
            <h3 className="text-[1.25rem] font-semibold text-ink">{l.title}</h3>
            <ul className="mt-3 flex flex-col gap-2.5">
              {l.items.map(([k, v]) => (
                <li key={k}>
                  <span className="font-medium text-ink">{k}: </span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {s.groups && (
          <div className="mt-2 grid gap-8 sm:grid-cols-3">
            {s.groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-[1.15rem] font-semibold text-ink">{g.title}</h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </Inspect>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug && p.caseStudy)
  if (!project) return <Navigate to="/404" replace />

  const c = hotstarCase
  return (
    <main className="mx-auto max-w-[1240px] px-3 pb-6 pt-24 sm:px-6 sm:pt-28">
      <Link
        to="/"
        state={{ scrollTo: 'work' }}
        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.92rem] transition-colors hover:bg-frame"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        All work
      </Link>

      <h1 className="mt-8 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)] font-semibold">{c.heading}</h1>
      <p className="mt-6 max-w-[56ch] text-[1.15rem] text-muted">{c.intro}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li key={t} className="rounded-full border border-line px-3 py-1 text-[0.82rem]">
            {t}
          </li>
        ))}
      </ul>

      <Inspect as="div" name="Media / Prototype recording" className="mt-10 overflow-hidden rounded-frame bg-frame">
        <video
          src={`${base}hotstar.mp4`}
          poster={`${base}hotstar-poster.jpg`}
          aria-label="Screen recording of the Disney+ Hotstar playlist prototype"
          className="w-full"
          controls
          muted
          loop
          playsInline
          preload="metadata"
        />
      </Inspect>

      <div className="mt-6 grid items-start gap-6 md:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="sticky top-24 hidden flex-col gap-1 md:flex">
          {c.sections.map((s) => (
            <a key={s.name} href={`#/work/${slug}`} onClick={(e) => { e.preventDefault(); document.getElementById(slugOf(s.name))?.scrollIntoView({ behavior: 'smooth' }) }} className="rounded-lg px-3 py-2 text-[0.95rem] text-muted transition-colors hover:bg-frame hover:text-ink">
              {s.name}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4 md:gap-6">
          {c.sections.map((s) => (
            <Section key={s.name} s={s} />
          ))}
        </div>
      </div>
    </main>
  )
}
