import { Link } from 'react-router'
import { projects } from '../data/projects'
import Parallax from '../fx/Parallax'
import RevealText from '../fx/RevealText'
import { spotlight } from '../fx/spotlight'
import Inspect from './Inspect'
import { ChatVisual, CopilotVisual, MetricsVisual, VideoVisual } from './ProjectVisuals'

const base = import.meta.env.BASE_URL

function Visual({ project }) {
  switch (project.kind) {
    case 'metrics':
      return <MetricsVisual metrics={project.metrics} />
    case 'chat':
      return <ChatVisual />
    case 'video':
      return (
        <VideoVisual
          src={`${base}hotstar.mp4`}
          poster={`${base}hotstar-poster.jpg`}
          label="Screen recording of the Disney+ Hotstar playlist prototype"
        />
      )
    default:
      return <CopilotVisual />
  }
}

function ProjectCard({ project, wide }) {
  const { slug, title, org, summary, tags, caseStudy, note } = project
  return (
    <Inspect
      as="article"
      name={`Card / ${title}`}
      spec="box"
      specClass="right-4 top-4"
      className="spot group relative flex h-full flex-col rounded-frame bg-frame"
      {...spotlight}
    >
      <div className={`overflow-hidden rounded-t-frame ${wide ? 'h-[260px] md:h-[240px]' : 'h-[260px]'}`}>
        <Visual project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div>
          <p className="text-[0.92rem] text-muted">{org}</p>
          <h3 className="mt-1 text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            {caseStudy ? (
              <Link to={`/work/${slug}`} className="after:absolute after:inset-0">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
        </div>
        <p className="max-w-[60ch] text-muted">{summary}</p>
        {note && <p className="max-w-[60ch] text-[0.95rem] text-muted">{note}</p>}
        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-[0.82rem]">
              {t}
            </li>
          ))}
        </ul>
        {caseStudy && (
          <span className="inline-flex items-center gap-2 font-medium text-select transition-[gap] group-hover:gap-3">
            Read the case study
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        )}
      </div>
    </Inspect>
  )
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1240px] scroll-mt-20 px-3 pt-24 sm:px-6 md:pt-40">
      <RevealText text="Work I've designed and built" className="max-w-[18ch] text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold" />
      <p className="mt-5 max-w-[54ch] text-muted">
        From an award-winning learning platform to AI tools built for people who aren't engineers.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
        {projects.map((p, i) => {
          const wide = i === 0 || i === projects.length - 1
          return (
            <Parallax key={p.slug} speed={wide ? 0 : i % 2 ? 0.05 : -0.02} className={wide ? 'md:col-span-2' : ''}>
              <ProjectCard project={p} wide={wide} />
            </Parallax>
          )
        })}
      </div>
    </section>
  )
}
