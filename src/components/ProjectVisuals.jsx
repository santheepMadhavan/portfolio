import { useEffect, useRef, useState } from 'react'
import CountUp from '../fx/CountUp'

/* Visual headers for the project cards. The chat and scorecard are
   illustrations of the product idea, not screenshots. */

export function MetricsVisual({ metrics }) {
  return (
    <dl className="grid h-full grid-cols-2 gap-px bg-line md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col justify-end gap-2 bg-frame2 p-6 sm:p-8">
          <dd className="font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-none tracking-tight"><CountUp value={m.value} /></dd>
          <dt className="min-h-[2.6em] max-w-[18ch] text-[0.92rem] leading-snug text-muted">{m.label}</dt>
        </div>
      ))}
    </dl>
  )
}

export function ChatVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 bg-frame2 p-6 sm:p-8" role="img" aria-label="Illustration of a chat where a question about a PDF is answered with a page reference.">
      <div className="w-fit rounded-full border border-line bg-frame px-3 py-1 font-mono text-[0.75rem] text-muted">lecture-notes.pdf</div>
      <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-select px-4 py-3 text-[0.95rem] text-select-ink">
        What are the three stages of the water cycle?
      </div>
      <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-frame px-4 py-3 text-[0.95rem] shadow-[0_1px_0_var(--line)]">
        Evaporation, condensation and precipitation. The notes describe each stage with an example.
        <span className="mt-2 block w-fit rounded-md bg-frame2 px-2 py-0.5 font-mono text-[0.72rem] text-muted">Source: page 12</span>
      </div>
    </div>
  )
}

export function VideoVisual({ src, poster, label }) {
  const ref = useRef(null)
  const [still, setStill] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setStill(reduce)
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      className="h-full w-full object-cover"
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={!still}
    />
  )
}

export function CopilotVisual() {
  const rows = [
    ['Problem solving', 82],
    ['Communication', 70],
    ['Code quality', 90],
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-4 bg-frame2 p-6 sm:p-8" role="img" aria-label="Illustration of an interview scorecard with three rated criteria.">
      {rows.map(([label, v]) => (
        <div key={label}>
          <div className="mb-1.5 flex justify-between text-[0.9rem]">
            <span>{label}</span>
            <span className="font-mono text-muted">{v}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-select" style={{ width: `${v}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
