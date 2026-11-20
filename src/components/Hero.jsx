import { profile } from '../data/profile'
import Typewriter from '../fx/Typewriter'
import Inspect from './Inspect'
import { scrollToSection } from '../lib/scroll'

export default function Hero() {
  return (
    <section id="hero" className="mx-auto flex min-h-[100svh] max-w-[1240px] flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <div className="max-w-[760px]">
        <p className="font-display text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-none tracking-tight">{profile.name}</p>
        <p className="mb-10 mt-3 text-[1.1rem] text-muted">
          {profile.role} in {profile.location}
        </p>
        <Inspect
          as="h1"
          name="Heading / Display"
          spec="text"
          specClass="left-full top-0 ml-4 hidden xl:block"
          className="text-[clamp(2.7rem,7.2vw,6rem)] font-semibold leading-[1.02]"
        >
          <Typewriter lines={profile.headline} />
        </Inspect>

        <p className="mt-9 max-w-[54ch] text-[1.15rem] leading-relaxed text-muted">{profile.intro}</p>
        <p className="mt-4 text-[0.98rem]">
          <span className="text-muted">Now: </span>
          Frontend Lead &amp; UX Product Designer at Hitachi Digital
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Inspect as="div" name="Button / Primary" className="rounded-full">
            <button
              type="button"
              onClick={() => scrollToSection('experience')}
              className="inline-flex items-center gap-2 rounded-full bg-select px-6 py-3.5 font-medium text-select-ink transition-transform hover:-translate-y-0.5"
            >
              See my experience
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </button>
          </Inspect>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-line bg-frame px-6 py-3.5 font-medium transition-colors hover:bg-frame2"
          >
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}
