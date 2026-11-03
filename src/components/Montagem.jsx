import { useMemo } from 'react'
import { cores, produtos } from '../data/firenza'
import { desenhar, limites, projetar } from '../utils/isometrico'
import { Formas, Gradientes } from './Movel'

const p = Object.fromEntries(produtos.map((m) => [m.id, m]))
const BA = cores['Branco Antique']
const PC = cores['Preto Carvalho']

// Estante montada com cubos e nichos do catálogo, peça por peça
const PECAS = [
  { m: p['cubo-40-gavetas'], x: 0, y: 0, cor: PC },
  { m: p['cubo-40-porta'], x: 40, y: 0, cor: BA },
  { m: p['cubo-40'], x: 80, y: 0, cor: BA },
  { m: p['cubo-40'], x: 0, y: 40, cor: BA },
  { m: p['cubo-40-retratil'], x: 40, y: 40, cor: cores.Branco },
  { m: p['cubo-2-gavetas'], x: 80, y: 40, cor: PC },
  { m: p['cubo-20'], x: 0, y: 80, cor: PC },
  { m: p['cubo-20'], x: 40, y: 80, cor: BA },
  { m: p['cubo-40-porta'], x: 80, y: 80, cor: BA },
  { m: { ...p['nicho-120'], p: 40 }, x: 0, y: 120, cor: BA },
]

export default function Montagem() {
  const { pecas, caixa, cota, sombra } = useMemo(() => {
    const lista = PECAS.map((pc) => desenhar(pc.m, pc.cor, [], pc.x, pc.y, 0))
    const a = projetar(0, -14, 40)
    const b = projetar(120, -14, 40)
    const c = projetar(128, 0, 0)
    const d = projetar(128, 153, 0)
    const todas = lista.flat()
    const box = limites([...todas, { pts: [a, b, c, d] }], 14)
    return { pecas: lista, caixa: box, cota: { a, b, c, d }, sombra: projetar(60, 0, 20) }
  }, [])

  return (
    <svg className="montagem" viewBox={caixa.join(' ')} role="img" aria-label="Estante modular sendo montada com cubos e nicho Firenza">
      <Gradientes />
      <ellipse cx={sombra[0]} cy={sombra[1]} rx="70" ry="12" fill="#2a2018" opacity="0.1" />
      {pecas.map((formas, i) => (
        <g key={i} className="montagem-peca" style={{ '--i': i }}>
          <Formas formas={formas} />
        </g>
      ))}
      <g className="cota" style={{ '--i': PECAS.length }}>
        <line x1={cota.a[0]} y1={cota.a[1]} x2={cota.b[0]} y2={cota.b[1]} />
        <line x1={cota.c[0]} y1={cota.c[1]} x2={cota.d[0]} y2={cota.d[1]} />
        <text x={(cota.a[0] + cota.b[0]) / 2} y={(cota.a[1] + cota.b[1]) / 2 + 9} textAnchor="middle" transform={`rotate(16.4 ${(cota.a[0] + cota.b[0]) / 2} ${(cota.a[1] + cota.b[1]) / 2 + 9})`}>
          120 cm
        </text>
        <text x={cota.c[0] + 6} y={(cota.c[1] + cota.d[1]) / 2} transform={`rotate(-90 ${cota.c[0] + 6} ${(cota.c[1] + cota.d[1]) / 2})`} textAnchor="middle" dy="8">
          153 cm
        </text>
      </g>
    </svg>
  )
}
