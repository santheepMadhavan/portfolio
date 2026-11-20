import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/*
 * One fixed WebGL canvas for the whole site. A single particle system morphs
 * between five shapes as you scroll through the sections, and drifts sideways
 * so it never sits behind the text you're reading.
 *   hero sphere → experience grid → (torus in transit) → skills lattice → contact galaxy
 */
const N = 4096
const SECTION_IDS = ['hero', 'experience', 'skills', 'contact']
// Morph position (index into the five shapes) each section settles on.
const STOPS = [0, 1, 3, 4]
// Per-shape placement, as fractions of half the visible width (desktop only).
const OFFSET_X = [0.52, -0.55, 0.55, -0.55, 0.45]
const SCALE = [1, 1.15, 1, 1.1, 1.25]
const ALPHA = [1, 0.8, 0.7, 0.65, 0.85]

const cssColor = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const sample = (arr, u) => {
  const i = Math.min(arr.length - 2, Math.max(0, Math.floor(u)))
  const f = smooth(0, 1, Math.min(1, Math.max(0, u - i)))
  return arr[i] + (arr[i + 1] - arr[i]) * f
}
const rng = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const frac = (x) => x - Math.floor(x)

function buildShapes() {
  const rand = rng(7)
  const shapes = Array.from({ length: 5 }, () => new Float32Array(N * 3))
  const G = 64
  const C = 16
  for (let i = 0; i < N; i++) {
    // 0: fibonacci sphere
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = Math.PI * (3 - Math.sqrt(5)) * i
    shapes[0].set([Math.cos(th) * r * 1.5, y * 1.5, Math.sin(th) * r * 1.5], i * 3)

    // 1: tilted grid
    const gx = ((i % G) / (G - 1) - 0.5) * 5.4
    const gz = (Math.floor(i / G) / (G - 1) - 0.5) * 5.4
    const tilt = -1.0
    shapes[1].set([gx, gz * Math.sin(tilt), gz * Math.cos(tilt)], i * 3)

    // 2: torus (low-discrepancy sampling)
    const u = frac(i * 0.7548776662) * Math.PI * 2
    const v = frac(i * 0.5698402910) * Math.PI * 2
    const R = 1.5
    const rr = 0.52
    shapes[2].set([(R + rr * Math.cos(v)) * Math.cos(u), rr * Math.sin(v) * 1.2, (R + rr * Math.cos(v)) * Math.sin(u)], i * 3)

    // 3: cube lattice
    const cx = i % C
    const cy = Math.floor(i / C) % C
    const cz = Math.floor(i / (C * C))
    shapes[3].set([(cx / (C - 1) - 0.5) * 3.2, (cy / (C - 1) - 0.5) * 3.2, (cz / (C - 1) - 0.5) * 3.2], i * 3)

    // 4: spiral galaxy
    const rad = Math.sqrt(rand()) * 2.9
    const arm = (i % 3) * ((Math.PI * 2) / 3)
    const ang = rad * 1.5 + arm + (rand() - 0.5) * 0.55
    const gy = (rand() - 0.5) * 0.35 * (1.2 - rad / 3)
    const gz2 = Math.sin(ang) * rad
    const gt = 0.95 // tilt the disc toward the viewer
    shapes[4].set([Math.cos(ang) * rad, gy * Math.cos(gt) - gz2 * Math.sin(gt), gy * Math.sin(gt) + gz2 * Math.cos(gt)], i * 3)
  }
  return shapes
}

export default function Scene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // no WebGL: the page works fine on its plain background
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 7
    const group = new THREE.Group()
    scene.add(group)

    const shapes = buildShapes()
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(shapes[0], 3))
    shapes.forEach((s, i) => geo.setAttribute(`aS${i}`, new THREE.BufferAttribute(s, 3)))
    const seeds = new Float32Array(N)
    const r = rng(3)
    for (let i = 0; i < N; i++) seeds[i] = r()
    geo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1))

    const uniforms = {
      uTime: { value: 0 },
      uU: { value: 0 },
      uPointer: { value: new THREE.Vector2(9, 9) },
      uPush: { value: 0 },
      uAlpha: { value: 1 },
      uSize: { value: 3 * renderer.getPixelRatio() },
      uA: { value: new THREE.Color() },
      uB: { value: new THREE.Color() },
    }
    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        attribute vec3 aS0, aS1, aS2, aS3, aS4;
        attribute float seed;
        uniform float uTime, uU, uPush, uSize;
        uniform vec2 uPointer;
        varying float vMix;
        float n(vec3 p){ return sin(p.x*2.1+uTime*.6)*sin(p.y*2.3-uTime*.5)*sin(p.z*2.0+uTime*.4); }
        void main(){
          vec3 p = aS0;
          p = mix(p, aS1, smoothstep(0.,1.,clamp(uU,     0.,1.)));
          p = mix(p, aS2, smoothstep(0.,1.,clamp(uU-1.,  0.,1.)));
          p = mix(p, aS3, smoothstep(0.,1.,clamp(uU-2.,  0.,1.)));
          p = mix(p, aS4, smoothstep(0.,1.,clamp(uU-3.,  0.,1.)));
          // gentle breathing; strongest on the hero sphere, calm elsewhere
          float amt = mix(.2, .06, smoothstep(0.,1.,clamp(uU,0.,1.)));
          float d = n(p*1.4) * amt;
          // the grid ripples
          float gridW = smoothstep(.2,1.,uU) * (1.-smoothstep(1.,1.8,uU));
          p.y += sin(p.x*1.6+uTime*.9) * cos(p.z*1.3+uTime*.7) * .22 * gridW;
          vec3 pos = p + normalize(p+1e-4) * d;

          vec4 mv = modelViewMatrix * vec4(pos,1.);
          vec4 clip = projectionMatrix * mv;
          float dist = distance(clip.xy/clip.w, uPointer);
          float f = smoothstep(.4, 0., dist) * uPush;
          pos += normalize(pos+1e-4) * f * .5;
          mv = modelViewMatrix * vec4(pos,1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * (.8 + seed*1.1 + f*2.) * (6.5 / -mv.z);
          vMix = clamp(seed*.55 + d*1.5 + f + (pos.y*.12+.25), 0., 1.);
        }`,
      fragmentShader: /* glsl */ `
        uniform vec3 uA, uB;
        uniform float uAlpha;
        varying float vMix;
        void main(){
          float r = length(gl_PointCoord - .5);
          if (r > .5) discard;
          gl_FragColor = vec4(mix(uA, uB, vMix), smoothstep(.5,.12,r) * uAlpha);
        }`,
    })
    group.add(new THREE.Points(geo, mat))

    const tint = () => {
      uniforms.uA.value.set(cssColor('--select', '#3b5bff'))
      uniforms.uB.value.set(cssColor('--redline', '#ff3d81'))
    }
    tint()
    const themeObs = new MutationObserver(tint)
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    let W = 1
    let H = 1
    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      renderer.setSize(W, H)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    resize()
    addEventListener('resize', resize)

    const target = new THREE.Vector2(9, 9)
    const onMove = (e) => target.set((e.clientX / W) * 2 - 1, -((e.clientY / H) * 2 - 1))
    const onLeave = () => target.set(9, 9)
    addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)

    // Scroll → morph position `u`, derived from where the sections sit on the page.
    let tops = []
    let frameNo = 0
    const measure = () => {
      const els = SECTION_IDS.map((id) => document.getElementById(id))
      tops = els.every(Boolean) ? els.map((el) => el.getBoundingClientRect().top + scrollY) : []
    }
    const targetU = () => {
      // Near the page end the reading line slides to the bottom so the last (short) section still gets its shape.
      const max = Math.max(1, document.documentElement.scrollHeight - H)
      const anchor = scrollY + H * (0.55 + 0.45 * Math.pow(Math.min(1, scrollY / max), 4))
      if (!tops.length) {
        // Sub-pages (case studies): a slow drift through the shapes.
        return 1 + (scrollY / max) * 2
      }
      let i = 0
      while (i < tops.length - 1 && anchor >= tops[i + 1]) i++
      if (i === tops.length - 1) return STOPS[i]
      const f = (anchor - tops[i]) / (tops[i + 1] - tops[i])
      return STOPS[i] + (STOPS[i + 1] - STOPS[i]) * smooth(0.62, 1, f)
    }

    let u = 0
    let x = 0
    let raf = 0
    let last = performance.now()
    const clock = new THREE.Clock()
    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (document.hidden) return
      if (frameNo++ % 20 === 0) measure()

      const k = reduced ? 1 : 1 - Math.pow(0.0008, dt)
      u += (targetU() - u) * k
      const mobile = W < 820
      const t = clock.getElapsedTime()
      uniforms.uTime.value = reduced ? 0 : t
      uniforms.uU.value = u
      uniforms.uAlpha.value = sample(ALPHA, u) * (mobile ? 0.55 : 1)
      uniforms.uPointer.value.lerp(target, 0.1)
      uniforms.uPush.value += ((reduced ? 0 : 1) - uniforms.uPush.value) * 0.05

      const halfW = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect
      const targetX = mobile ? 0 : sample(OFFSET_X, u) * halfW * 0.78
      x += (targetX - x) * Math.min(1, dt * 6)
      group.position.x = x
      // Parallax: the whole system rises slower than the page scrolls.
      group.position.y = Math.min(scrollY, 4000) * 0.0001 + (mobile ? 1.2 : 0)
      const s = sample(SCALE, u) * (mobile ? 0.7 : 1)
      group.scale.setScalar(s)
      const pv = uniforms.uPointer.value
      const px = Math.abs(pv.x) > 2 ? 0 : pv.x
      const py = Math.abs(pv.y) > 2 ? 0 : pv.y
      group.rotation.y = reduced ? 0.5 : t * 0.1 + u * 0.9 + px * 0.25
      group.rotation.x = py * -0.15
      renderer.render(scene, camera)
    }
    measure()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      themeObs.disconnect()
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
}
