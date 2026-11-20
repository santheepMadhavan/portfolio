import { useLayoutEffect, useRef, useState } from 'react'
import { useDev } from '../lib/devContext'

const px = (v) => (v && v !== 'normal' ? v : '–')

/**
 * Wraps an element. In Dev Mode it draws a selection box with handles, a name
 * tag and the measured size. With `spec`, it also lists the element's real
 * computed CSS, read from the DOM rather than hard-coded.
 */
export default function Inspect({ name, as: Tag = 'div', spec, specClass = '', className = '', children, ...rest }) {
  const { dev } = useDev()
  const ref = useRef(null)
  const [m, setM] = useState(null)

  useLayoutEffect(() => {
    if (!dev) return
    const el = ref.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      const cs = getComputedStyle(el)
      setM({
        w: Math.round(r.width),
        h: Math.round(r.height),
        font: cs.fontFamily.split(',')[0].replace(/["']/g, '').replace(' Variable', ''),
        size: cs.fontSize,
        weight: cs.fontWeight,
        lh: cs.lineHeight,
        ls: cs.letterSpacing,
        color: cs.color,
        radius: cs.borderTopLeftRadius,
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [dev])

  return (
    <Tag ref={ref} className={`inspect ${className}`} {...rest}>
      {children}
      {dev && m && (
        <>
          <span className="inspect-box" aria-hidden="true">
            <i className="h-bl" />
            <i className="h-br" />
            <span className="inspect-tag">{name}</span>
            <span className="inspect-size">
              {m.w} × {m.h}
            </span>
          </span>
          {spec && (
            <span className={`inspect-spec ${specClass}`} aria-hidden="true">
              {spec === 'text'
                ? `font-family: ${m.font}\nfont-size: ${m.size}\nfont-weight: ${m.weight}\nline-height: ${px(m.lh)}\nletter-spacing: ${px(m.ls)}\ncolor: ${m.color}`
                : `width: ${m.w}px\nheight: ${m.h}px\nborder-radius: ${px(m.radius)}`}
            </span>
          )}
        </>
      )}
    </Tag>
  )
}
