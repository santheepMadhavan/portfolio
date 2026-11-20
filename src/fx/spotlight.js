/** Spread onto a `.spot` element: tracks the pointer for the CSS spotlight. */
export const spotlight = {
  onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  },
}
