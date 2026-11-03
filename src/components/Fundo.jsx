import { useEffect, useRef } from 'react'

// Fundo animado: grade isométrica de "projeto" com módulos em arame flutuando.
// A grade acende perto do mouse/dedo. Leve no celular e parado com movimento reduzido.
const EX = [0.92, 0.27]
const EZ = [-0.56, 0.33]

export default function Fundo() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let caixas = []
    const ponteiro = { x: -999, y: -999, tx: -999, ty: -999 }

    const novaCaixa = (inicio) => ({
      x: Math.random() * w,
      y: inicio ? Math.random() * h : h + 80,
      l: 20 + Math.random() * 46,
      a: 16 + Math.random() * 40,
      p: 14 + Math.random() * 26,
      v: 0.12 + Math.random() * 0.22,
      fase: Math.random() * Math.PI * 2,
      tom: Math.random() < 0.22 ? 'acento' : 'tinta',
    })

    const ajustar = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const qtd = w < 700 ? 7 : 14
      caixas = Array.from({ length: qtd }, () => novaCaixa(true))
    }

    const rgb = {}
    const lerCores = () => {
      const estilo = getComputedStyle(document.documentElement)
      rgb.acento = estilo.getPropertyValue('--acento-rgb').trim() || '184,70,42'
      rgb.tinta = estilo.getPropertyValue('--tinta-rgb').trim() || '40,30,24'
    }
    const cor = (nome, alfa) => `rgba(${rgb[nome]},${alfa})`

    const grade = () => {
      const passo = 46
      const desloc = (performance.now() / 120) % passo
      ctx.lineWidth = 1
      const raio = Math.min(w, h) * 0.35
      const g = ctx.createRadialGradient(ponteiro.x, ponteiro.y, 0, ponteiro.x, ponteiro.y, raio)
      g.addColorStop(0, cor('acento', 0.32))
      g.addColorStop(1, cor('tinta', 0.05))
      ctx.strokeStyle = g
      const desenharFamilia = (dir) => {
        const [dx, dy] = dir
        const nx = -dy
        const ny = dx
        const comp = Math.hypot(w, h)
        const n = Math.ceil(comp / passo) + 2
        ctx.beginPath()
        for (let i = -n; i <= n; i++) {
          const ox = w / 2 + nx * (i * passo + (reduzir ? 0 : desloc))
          const oy = h / 2 + ny * (i * passo + (reduzir ? 0 : desloc))
          const x1 = ox - dx * comp
          const y1 = oy - dy * comp
          const x2 = ox + dx * comp
          const y2 = oy + dy * comp
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
        }
      }
      const norm = (v) => {
        const m = Math.hypot(v[0], v[1])
        return [v[0] / m, v[1] / m]
      }
      desenharFamilia(norm(EX))
      ctx.stroke()
      desenharFamilia(norm(EZ))
      ctx.stroke()
    }

    const caixaArame = (c, t) => {
      const y = c.y + Math.sin(t / 1400 + c.fase) * 6
      const P = (x, yy, z) => [c.x + x * EX[0] + z * EZ[0], y + x * EX[1] + z * EZ[1] - yy]
      const v = [P(0, 0, 0), P(c.l, 0, 0), P(c.l, 0, c.p), P(0, 0, c.p), P(0, c.a, 0), P(c.l, c.a, 0), P(c.l, c.a, c.p), P(0, c.a, c.p)]
      const arestas = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]
      const perto = Math.max(0, 1 - Math.hypot(c.x - ponteiro.x, y - ponteiro.y) / 260)
      ctx.strokeStyle = cor(c.tom, 0.16 + perto * 0.4)
      ctx.lineWidth = 1.1
      ctx.beginPath()
      for (const [a, b] of arestas) {
        ctx.moveTo(...v[a])
        ctx.lineTo(...v[b])
      }
      ctx.stroke()
      ctx.fillStyle = cor(c.tom, 0.04 + perto * 0.08)
      ctx.beginPath()
      ;[4, 5, 6, 7].forEach((k, i) => (i ? ctx.lineTo(...v[k]) : ctx.moveTo(...v[k])))
      ctx.fill()
    }

    const quadro = (t) => {
      ponteiro.x += (ponteiro.tx - ponteiro.x) * 0.08
      ponteiro.y += (ponteiro.ty - ponteiro.y) * 0.08
      ctx.clearRect(0, 0, w, h)
      grade()
      for (const c of caixas) {
        if (!reduzir) c.y -= c.v
        if (c.y < -100) Object.assign(c, novaCaixa(false))
        caixaArame(c, t)
      }
      if (!reduzir) raf = requestAnimationFrame(quadro)
    }

    const mover = (e) => {
      ponteiro.tx = e.clientX
      ponteiro.ty = e.clientY
      if (ponteiro.x < -900) {
        ponteiro.x = e.clientX
        ponteiro.y = e.clientY
      }
      if (reduzir) quadro(performance.now())
    }
    const visibilidade = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduzir) raf = requestAnimationFrame(quadro)
    }

    lerCores()
    ajustar()
    quadro(performance.now())
    window.addEventListener('resize', ajustar)
    window.addEventListener('pointermove', mover, { passive: true })
    document.addEventListener('visibilitychange', visibilidade)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', ajustar)
      window.removeEventListener('pointermove', mover)
      document.removeEventListener('visibilitychange', visibilidade)
    }
  }, [])

  return <canvas ref={ref} className="fundo" aria-hidden="true" />
}
