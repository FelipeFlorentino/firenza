import { useId, useMemo } from 'react'
import { cores } from '../data/firenza'
import { desenhar, limites } from '../utils/isometrico'

export function Formas({ formas }) {
  const base = useId().replace(/:/g, '')
  return formas.map((f, i) =>
    f.tipo === 'recorte' ? (
      <g key={i}>
        <clipPath id={`${base}-${i}`}>
          <polygon points={f.pts.map((p) => p.join(',')).join(' ')} />
        </clipPath>
        <g clipPath={`url(#${base}-${i})`}>
          <Formas formas={f.filhos} />
        </g>
      </g>
    ) : f.tipo === 'linha' ? (
      <line
        key={i}
        x1={f.pts[0][0]}
        y1={f.pts[0][1]}
        x2={f.pts[1][0]}
        y2={f.pts[1][1]}
        stroke={f.stroke}
        strokeWidth={f.largura}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    ) : (
      <polygon
        key={i}
        points={f.pts.map((p) => p.join(',')).join(' ')}
        fill={f.espelho ? 'url(#espelho)' : f.fill}
        fillOpacity={f.opacidade ?? 1}
        stroke={f.stroke}
        strokeWidth={f.fino ? 0.6 : 0.9}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    ),
  )
}

export function Gradientes() {
  return (
    <defs>
      <linearGradient id="espelho" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e9f1f3" />
        <stop offset="0.45" stopColor="#b9ccd3" />
        <stop offset="0.5" stopColor="#e4eef0" />
        <stop offset="1" stopColor="#9fb6be" />
      </linearGradient>
    </defs>
  )
}

export default function Movel({ movel, cor, titulo, minimo = 130 }) {
  const nomeCor = cor || movel.cores[0] || 'Branco Antique'
  const formas = useMemo(() => desenhar(movel, cores[nomeCor]), [movel, nomeCor])
  const caixa = useMemo(() => {
    // tamanho mínimo da cena: peças pequenas aparecem menores, mantendo a noção de escala
    const [x, y, w, h] = limites(formas, 6)
    const W = Math.max(w, minimo)
    const H = Math.max(h, minimo * 0.8)
    return [x - (W - w) / 2, y - (H - h), W, H]
  }, [formas, minimo])
  return (
    <svg className="movel" viewBox={caixa.join(' ')} role="img" aria-label={titulo || `${movel.nome}, cor ${nomeCor}`}>
      <Gradientes />
      <ellipse
        cx={caixa[0] + caixa[2] / 2}
        cy={caixa[1] + caixa[3] - 7}
        rx={caixa[2] * 0.42}
        ry={Math.max(3, caixa[3] * 0.025)}
        fill="#2a2018"
        opacity="0.09"
      />
      <Formas formas={formas} />
    </svg>
  )
}
