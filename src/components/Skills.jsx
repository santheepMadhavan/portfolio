import { useState } from 'react'
import { credentials } from '../data/credentials'
import { skills } from '../data/skills'
import Decrypt from '../fx/Decrypt'
import RevealText from '../fx/RevealText'
import Inspect from './Inspect'
import SkillGraph from './SkillGraph'

const HUES = [222, 338, 158, 38, 272]
const dot = (i) => ({ background: `hsl(${HUES[i]} 80% 60%)` })

function SkillList() {
  return (
    <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((g, i) => (
        <div key={g.group}>
          <h3 className="flex items-center gap-2.5 text-[1.35rem] font-semibold">
            <span className="size-2.5 rounded-full" style={dot(i)} aria-hidden="true" />
            {g.group}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s} className="rounded-full bg-frame2 px-3 py-1.5 text-[0.88rem]">
                <Decrypt text={s} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ViewToggle({ view, setView }) {
  const opts = [
    ['list', 'List'],
    ['graph', 'Graph'],
  ]
  return (
    <div role="group" aria-label="Skills view" className="flex w-fit gap-1 rounded-full border border-line bg-frame p-1">
      {opts.map(([id, label]) => (
        <button
          key={id}
          type="button"
          aria-pressed={view === id}
          onClick={() => setView(id)}
          className={`rounded-full px-4 py-1.5 text-[0.9rem] font-medium transition-colors ${
            view === id ? 'bg-select text-select-ink' : 'text-muted hover:text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default function Skills() {
  const [view, setView] = useState('list')
  const [hoverGroup, setHoverGroup] = useState(null)
  const [pinned, setPinned] = useState(null)
  const focus = hoverGroup ?? pinned

  return (
    <section id="skills" className="mx-auto max-w-[1240px] scroll-mt-20 px-3 pt-24 sm:px-6 md:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <RevealText text="Design, code and AI in one toolkit" className="max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold" />
        <ViewToggle view={view} setView={setView} />
      </div>

      <Inspect as="div" name="Frame / Skills" className="mt-12 rounded-frame bg-frame p-4 sm:p-8 md:p-10">
        {view === 'graph' ? (
          <>
            <ul className="mb-4 flex flex-wrap gap-2" aria-label="Highlight a skill group">
              {skills.map((g, i) => (
                <li key={g.group}>
                  <button
                    type="button"
                    aria-pressed={pinned === i}
                    onPointerEnter={() => setHoverGroup(i)}
                    onPointerLeave={() => setHoverGroup(null)}
                    onFocus={() => setHoverGroup(i)}
                    onBlur={() => setHoverGroup(null)}
                    onClick={() => setPinned((p) => (p === i ? null : i))}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.88rem] transition-colors ${
                      pinned === i ? 'border-ink bg-frame2' : 'border-line hover:bg-frame2'
                    }`}
                  >
                    <span className="size-2.5 rounded-full" style={dot(i)} aria-hidden="true" />
                    {g.group}
                  </button>
                </li>
              ))}
            </ul>
            <SkillGraph focus={focus} className="h-[560px] w-full overflow-hidden rounded-2xl bg-frame2 sm:h-[620px]" />
            <p className="mt-3 text-[0.85rem] text-muted">Hover a skill to trace what it connects to. Drag any node to pull the cluster around.</p>
            <div className="sr-only">
              <SkillList />
            </div>
          </>
        ) : (
          <SkillList />
        )}
      </Inspect>

      <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        {credentials.map((c) => (
          <Inspect key={c.title} as="div" name={`Card / ${c.date}`} className="flex flex-col gap-2 rounded-frame bg-frame p-6 sm:p-10">
            <p className="font-mono text-[0.85rem] text-muted">{c.date}</p>
            <h3 className="text-[1.6rem] font-semibold leading-tight">{c.title}</h3>
            <p className="text-muted">{c.issuer}</p>
            {c.href && (
              <a href={c.href} target="_blank" rel="noreferrer" className="mt-3 w-fit font-medium text-select underline-offset-4 hover:underline">
                {c.linkLabel}
              </a>
            )}
          </Inspect>
        ))}
      </div>
    </section>
  )
}
