import { experience } from '../data/experience'
import RevealText from '../fx/RevealText'
import ScrollRail from '../fx/ScrollRail'
import Inspect from './Inspect'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1240px] scroll-mt-20 px-3 pt-24 sm:px-6 md:pt-40">
      <RevealText text="Seven years, three companies" className="max-w-[16ch] text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold" />

      <ol className="relative mt-12 flex flex-col gap-4 md:gap-6 md:pl-10">
        <ScrollRail />
        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span aria-hidden="true" className="absolute -left-10 top-10 hidden size-2.5 -translate-x-[4.5px] rounded-full border-2 border-select bg-canvas md:block" />
            <Inspect
              as="div"
              name={`Frame / ${job.company}`}
              className="grid gap-6 rounded-frame bg-frame p-6 sm:p-10 md:grid-cols-[280px_1fr] md:gap-12"
            >
              <div className="self-start md:sticky md:top-28">
                <p className="font-mono text-[0.85rem] text-muted">{job.period}</p>
                <h3 className="mt-3 text-[1.7rem] font-semibold leading-tight">{job.company}</h3>
                {job.former && <p className="text-[0.92rem] text-muted">{job.former}</p>}
                <p className="mt-3 font-medium text-select">{job.role}</p>
                {i === 0 && <p className="mt-4 inline-block rounded-full bg-frame2 px-3 py-1 text-[0.82rem]">Current role</p>}
              </div>
              <ul className="flex max-w-[68ch] flex-col gap-3.5">
                {job.points.map((p) => (
                  <li key={p} className="relative pl-5 text-muted before:absolute before:left-0 before:top-[0.72em] before:size-1.5 before:rounded-full before:bg-select">
                    {p}
                  </li>
                ))}
              </ul>
            </Inspect>
          </li>
        ))}
      </ol>
    </section>
  )
}
