import { useInView } from './useInView'

/** Word-by-word mask reveal, triggered once when the heading scrolls into view. */
export default function RevealText({ as: Tag = 'h2', text, className = '' }) {
  const [ref, seen] = useInView(0.4)
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="reveal-word">
            <span data-in={seen} style={{ transitionDelay: `${i * 55}ms` }}>
              {w}
            </span>
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}
