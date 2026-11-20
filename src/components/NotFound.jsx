import { Link } from 'react-router'

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[80vh] max-w-[1240px] place-content-center gap-6 px-6 pt-24 text-center">
      <h1 className="text-[clamp(3rem,10vw,7rem)] font-semibold">Page not found</h1>
      <p className="mx-auto max-w-[40ch] text-muted">That link doesn't lead anywhere on this site. Head back to the portfolio.</p>
      <Link to="/" className="mx-auto w-fit rounded-full bg-select px-6 py-3.5 font-medium text-select-ink">
        Back to home
      </Link>
    </main>
  )
}
