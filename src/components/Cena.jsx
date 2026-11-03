import { useMemo } from 'react'
import { cenas, cores, produtos } from '../data/firenza'
import { desenhar, limites, projetar } from '../utils/isometrico'
import { Formas, Gradientes } from './Movel'

const porId = Object.fromEntries(produtos.map((p) => [p.id, p]))

export default function Cena({ ambiente, nome }) {
  const { pecas, caixa, piso, parede } = useMemo(() => {
    const lista = (cenas[ambiente] || []).map((item) => {
      const movel = porId[item.id]
      const nomeCor = item.cor || movel.cores[0] || 'Branco Antique'
      return { movel, formas: desenhar(movel, cores[nomeCor], [], item.x || 0, item.y || 0, item.z || 0) }
    })
    const todas = lista.flatMap((p) => p.formas)
    let largura = 0
    let fundo = 0
    for (const item of cenas[ambiente] || []) {
      const m = porId[item.id]
      largura = Math.max(largura, (item.x || 0) + m.l)
      fundo = Math.max(fundo, (item.z || 0) + m.p)
    }
    const x0 = -30
    const x1 = largura + 30
    const z1 = Math.max(fundo + 30, 90)
    const pisoPts = [[x0, 0, 0], [x1, 0, 0], [x1, 0, z1], [x0, 0, z1]].map((p) => projetar(...p))
    const paredePts = [[x0, 0, 0], [x1, 0, 0], [x1, 250, 0], [x0, 250, 0]].map((p) => projetar(...p))
    const c = limites([...todas, { pts: pisoPts }], 4)
    return { pecas: lista, caixa: c, piso: pisoPts, parede: paredePts }
  }, [ambiente])

  return (
    <svg className="cena" viewBox={caixa.join(' ')} role="img" aria-label={`Ambiente ${nome} montado com móveis Firenza`}>
      <Gradientes />
      <defs>
        <linearGradient id="grad-piso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--piso-1)" />
          <stop offset="1" stopColor="var(--piso-2)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={parede.map((p) => p.join(',')).join(' ')} fill="var(--parede)" />
      <polygon points={piso.map((p) => p.join(',')).join(' ')} fill="url(#grad-piso)" />
      {pecas.map((p, i) => (
        <g key={`${ambiente}-${i}`} className="cena-peca" style={{ '--i': i }}>
          <Formas formas={p.formas} />
        </g>
      ))}
    </svg>
  )
}
