import { profile } from '../data/profile'
import RevealText from '../fx/RevealText'
import Inspect from './Inspect'

const linkClass =
  'rounded-full border border-line bg-frame px-5 py-2.5 text-[0.95rem] font-medium transition-colors hover:bg-ink hover:text-canvas'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1240px] scroll-mt-20 px-3 pb-6 pt-24 sm:px-6 md:pt-40">
      <Inspect as="div" name="Frame / Contact" className="pb-8 pt-4">
        <RevealText text="Have something to build?" className="max-w-[14ch] text-[clamp(2.6rem,6.5vw,5.4rem)] font-semibold" />
        <p className="mt-5 max-w-[48ch] text-muted">
          I'm open to conversations about product design, frontend leadership and AI-native products.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block break-all font-display text-[clamp(1.4rem,3.4vw,2.6rem)] font-medium tracking-tight underline decoration-select decoration-2 underline-offset-[10px]"
        >
          {profile.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
            LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={profile.links.resume} target="_blank" rel="noreferrer" className={linkClass}>
            Resume
          </a>
        </div>
      </Inspect>
      <p className="px-2 pb-10 pt-6 text-[0.88rem] text-muted">
        © {new Date().getFullYear()} {profile.name}. Designed and built by me with React, Tailwind CSS and Vite. Press D to see how.
      </p>
    </section>
  )
}
