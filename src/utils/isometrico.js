// Desenha os móveis em perspectiva a partir das medidas do catálogo (cm).
// Eixos: x = largura (para a direita), y = altura (para cima), z = profundidade (para a frente).
// A frente do móvel é a face z = máximo.

const EX = [0.92, 0.27] // direção da largura na tela
const EZ = [-0.56, 0.33] // direção da profundidade na tela

export const projetar = (x, y, z) => [x * EX[0] + z * EZ[0], x * EX[1] + z * EZ[1] - y]

const hex = (c) => {
  const n = parseInt(c.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const ajustar = (c, f) => {
  const [r, g, b] = hex(c)
  const m = (v) => Math.round(f >= 0 ? v + (255 - v) * f : v * (1 + f))
  return `rgb(${m(r)},${m(g)},${m(b)})`
}
const luminancia = (c) => {
  const [r, g, b] = hex(c)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

const poligono = (pts, fill, stroke, extra = {}) => ({ tipo: 'poly', pts: pts.map((p) => projetar(...p)), fill, stroke, ...extra })
const linha = (a, b, stroke, largura = 1) => ({ tipo: 'linha', pts: [projetar(...a), projetar(...b)], stroke, largura })

const tons = (cor) => {
  const escuro = luminancia(cor) < 0.35
  return {
    frente: cor,
    topo: ajustar(cor, escuro ? 0.16 : 0.1),
    lado: ajustar(cor, escuro ? -0.28 : -0.16),
    traco: escuro ? ajustar(cor, 0.22) : ajustar(cor, -0.42),
    fundo: ajustar(cor, escuro ? -0.4 : -0.26),
    piso: ajustar(cor, escuro ? 0.06 : -0.06),
    parede: ajustar(cor, escuro ? -0.22 : -0.16),
    puxador: escuro ? '#b9a27f' : '#6f6556',
  }
}

// caixa sólida
export function caixa(s, x, y, z, l, a, p, cor) {
  const t = tons(cor)
  s.push(poligono([[x, y + a, z], [x + l, y + a, z], [x + l, y + a, z + p], [x, y + a, z + p]], t.topo, t.traco))
  s.push(poligono([[x + l, y, z], [x + l, y, z + p], [x + l, y + a, z + p], [x + l, y + a, z]], t.lado, t.traco))
  s.push(poligono([[x, y, z + p], [x + l, y, z + p], [x + l, y + a, z + p], [x, y + a, z + p]], t.frente, t.traco))
  return t
}

// retângulo na face da frente, em frações (u: largura, v: altura)
const naFrente = (x, y, z, l, a, p) => (u, v) => [x + u * l, y + v * a, z + p]
const retangulo = (f, u0, v0, u1, v1) => [f(u0, v0), f(u1, v0), f(u1, v1), f(u0, v1)]

function puxadorH(s, f, u, v, t, w = 0.12) {
  s.push(linha(f(u - w / 2, v), f(u + w / 2, v), t.puxador, 2.2))
}
function puxadorV(s, f, u, v, t, h = 0.12) {
  s.push(linha(f(u, v - h / 2), f(u, v + h / 2), t.puxador, 2.2))
}

// vão aberto com prateleiras: fundo, piso e parede interna recortados pela abertura
function vao(s, x, y, z, l, a, p, t, u0, v0, u1, v1, divisoes = 1) {
  const f = naFrente(x, y, z, l, a, p)
  const zf = z + p
  const zb = z + Math.min(1.5, p * 0.1)
  const esp = 1.8 / a
  const altura = (v1 - v0) / divisoes
  for (let i = 0; i < divisoes; i++) {
    const b = v0 + i * altura + (i > 0 ? esp : 0)
    const c = v0 + (i + 1) * altura - (i < divisoes - 1 ? esp : 0)
    const P = (u, v, zz) => [x + u * l, y + v * a, zz]
    const filhos = [
      poligono([P(u0, b, zb), P(u1, b, zb), P(u1, c, zb), P(u0, c, zb)], t.fundo, 'none'),
      poligono([P(u0, b, zf), P(u1, b, zf), P(u1, b, zb), P(u0, b, zb)], t.piso, 'none'),
      poligono([P(u0, b, zf), P(u0, b, zb), P(u0, c, zb), P(u0, c, zf)], t.parede, 'none'),
      poligono([P(u0, c, zf), P(u1, c, zf), P(u1, c, zf - 2.5), P(u0, c, zf - 2.5)], '#000', 'none', { opacidade: 0.12 }),
    ]
    s.push({ tipo: 'recorte', pts: retangulo(f, u0, b, u1, c).map((q) => projetar(...q)), filhos })
    s.push(poligono(retangulo(f, u0, b, u1, c), 'none', t.traco, { fino: true }))
  }
}

function frenteDetalhe(s, tipo, x, y, z, l, a, p, t) {
  const f = naFrente(x, y, z, l, a, p)
  const mu = Math.min(2 / l, 0.08)
  const mv = Math.min(2 / a, 0.08)
  const [nome, qtd] = String(tipo).split(':')
  const n = Number(qtd) || 1
  const porta = (u0, v0, u1, v1) => s.push(poligono(retangulo(f, u0, v0, u1, v1), t.frente, t.traco, { fino: true }))

  switch (nome) {
    case 'porta':
      porta(mu, mv, 1 - mu, 1 - mv)
      puxadorV(s, f, 1 - mu - 0.08, 0.5, t, Math.min(0.25, 14 / a))
      break
    case 'porta2':
      porta(mu, mv, 0.5, 1 - mv)
      porta(0.5, mv, 1 - mu, 1 - mv)
      puxadorV(s, f, 0.44, 0.55, t, Math.min(0.2, 14 / a))
      puxadorV(s, f, 0.56, 0.55, t, Math.min(0.2, 14 / a))
      break
    case 'porta2v':
      porta(mu, 0.45, 1 - mu, 1 - mv)
      porta(mu, mv, 1 - mu, 0.45)
      puxadorV(s, f, 1 - mu - 0.1, 0.52, t, 0.08)
      puxadorV(s, f, 1 - mu - 0.1, 0.38, t, 0.08)
      break
    case 'portas': {
      const h = (1 - 2 * mv) / n
      for (let i = 0; i < n; i++) {
        const v0 = mv + i * h
        porta(mu, v0, 0.5, v0 + h)
        porta(0.5, v0, 1 - mu, v0 + h)
        puxadorV(s, f, 0.45, v0 + h / 2, t, Math.min(h * 0.4, 10 / a))
        puxadorV(s, f, 0.55, v0 + h / 2, t, Math.min(h * 0.4, 10 / a))
      }
      break
    }
    case 'gavetas': {
      const h = (1 - 2 * mv) / n
      for (let i = 0; i < n; i++) {
        const v0 = mv + i * h
        porta(mu, v0, 1 - mu, v0 + h)
        puxadorH(s, f, 0.5, v0 + h * 0.62, t, Math.min(0.3, 16 / l))
      }
      break
    }
    case 'aberto':
      vao(s, x, y, z, l, a, p, t, mu, mv, 1 - mu, 1 - mv, n)
      break
    case 'aberto2h':
      vao(s, x, y, z, l, a, p, t, mu, mv, 0.5 - mu / 2, 1 - mv)
      vao(s, x, y, z, l, a, p, t, 0.5 + mu / 2, mv, 1 - mu, 1 - mv)
      break
    case 'gavetaPorta':
      porta(mu, 0.78, 1 - mu, 1 - mv)
      puxadorH(s, f, 0.5, 0.86, t, 0.2)
      porta(mu, mv, 0.5, 0.76)
      porta(0.5, mv, 1 - mu, 0.76)
      puxadorV(s, f, 0.45, 0.55, t, 0.12)
      puxadorV(s, f, 0.55, 0.55, t, 0.12)
      break
    case 'gavetaAberto':
      porta(mu, 0.68, 1 - mu, 1 - mv)
      puxadorH(s, f, 0.5, 0.8, t, 0.3)
      vao(s, x, y, z, l, a, p, t, mu, mv, 1 - mu, 0.64)
      break
    case 'basculante':
      porta(mu, mv, 1 - mu, 1 - mv)
      puxadorH(s, f, 0.5, mv + 0.12, t, Math.min(0.3, 18 / l))
      break
    case 'espelho':
      s.push(poligono(retangulo(f, 0.12, 0.08, 0.88, 0.94), '#cfdde3', t.traco, { espelho: true }))
      break
    case 'retratil': {
      porta(mu, mv, 1 - mu, 1 - mv)
      for (let i = 1; i < 9; i++) {
        const v = mv + ((1 - 2 * mv) * i) / 9
        s.push(linha(f(mu, v), f(1 - mu, v), t.traco, 0.6))
      }
      break
    }
    case 'correr':
      porta(mu, mv, 0.56, 1 - mv)
      porta(0.44, mv, 1 - mu, 1 - mv)
      puxadorV(s, f, mu + 0.07, 0.5, t, 0.3)
      puxadorV(s, f, 1 - mu - 0.07, 0.5, t, 0.3)
      break
    case 'abertoPorta':
      vao(s, x, y, z, l, a, p, t, mu, 0.36, 1 - mu, 1 - mv, 3)
      porta(mu, mv, 1 - mu, 0.34)
      puxadorH(s, f, 0.5, 0.28, t, 0.2)
      break
    default:
      break
  }
}

function pernas(s, x, y, z, l, p, h, cor, lado = 3.5, frente) {
  const cantos = [[x, z], [x + l - lado, z], [x, z + p - lado], [x + l - lado, z + p - lado]]
  const lista = frente === undefined ? cantos : frente ? cantos.slice(2) : cantos.slice(0, 2)
  for (const [px, pz] of lista) caixa(s, px, y, pz, lado, h, lado, cor)
}

const FORMAS = {
  caixa(s, m, x, y, z, cor) {
    const t = caixa(s, x, y, z, m.l, m.a, m.p, cor)
    frenteDetalhe(s, m.frente, x, y, z, m.l, m.a, m.p, t)
  },
  painel(s, m, x, y, z, cor) {
    const t = caixa(s, x, y, z, m.l, m.a, m.p, cor)
    const f = naFrente(x, y, z, m.l, m.a, m.p)
    for (let i = 1; i < 6; i++) s.push(linha(f(0, i / 6), f(1, i / 6), t.traco, 0.5))
  },
  mesa(s, m, x, y, z, cor) {
    const e = 3
    pernas(s, x + 2, y, z + 2, m.l - 4, m.p - 4, m.a - e, cor, 4, false)
    pernas(s, x + 2, y, z + 2, m.l - 4, m.p - 4, m.a - e, cor, 4, true)
    caixa(s, x, y + m.a - e, z, m.l, e, m.p, cor)
  },
  mesaCubos(s, m, x, y, z, cor) {
    const e = 3
    const c = 40
    const t1 = caixa(s, x, y, z + m.p - c, c, m.a - e, c, cor)
    frenteDetalhe(s, 'aberto:2', x, y, z + m.p - c, c, m.a - e, c, t1)
    const t2 = caixa(s, x + m.l - c, y, z + m.p - c, c, m.a - e, c, cor)
    frenteDetalhe(s, 'aberto:2', x + m.l - c, y, z + m.p - c, c, m.a - e, c, t2)
    caixa(s, x, y + m.a - e, z, m.l, e, m.p, cor)
  },
  cadeira(s, m, x, y, z, cor) {
    const assento = 45
    const metal = '#2b2a28'
    pernas(s, x + 3, y, z + 3, m.l - 6, m.p - 6, assento - 4, metal, 2.5, false)
    caixa(s, x + 1, y + assento, z, m.l - 2, m.a - assento, 4, cor)
    caixa(s, x, y + assento - 4, z, m.l, 5, m.p, cor)
    pernas(s, x + 3, y, z + 3, m.l - 6, m.p - 6, assento - 4, metal, 2.5, true)
  },
  giratoria(s, m, x, y, z, cor) {
    const metal = '#2b2a28'
    const cx = x + m.l / 2
    const cz = z + m.p / 2
    caixa(s, x, y, cz - 2, m.l, 3, 4, metal)
    caixa(s, cx - 2, y, z, 4, 3, m.p, metal)
    caixa(s, cx - 2.5, y + 3, cz - 2.5, 5, 40, 5, metal)
    caixa(s, x + 3, y + 50, z + 2, m.l - 6, m.a - 50, 6, cor)
    caixa(s, x + 2, y + 43, z + 4, m.l - 4, 7, m.p - 6, cor)
  },
  cama(s, m, x, y, z, cor) {
    const base = Math.max(14, m.a * 0.55)
    caixa(s, x, y, z, m.l, base, m.p, cor)
    caixa(s, x + 2, y + base, z + 2, m.l - 4, m.a - base + 12, m.p - 4, '#f1ece3')
    const tp = m.l > 120 ? 2 : 1
    const lp = (m.l - 12 - (tp - 1) * 6) / tp
    for (let i = 0; i < tp; i++) caixa(s, x + 6 + i * (lp + 6), y + m.a + 12, z + 6, lp, 9, 30, '#fbf8f2')
    caixa(s, x + 2, y + m.a + 12, z + m.p * 0.55, m.l - 4, 2, m.p * 0.45 - 2, '#c9b9a0')
  },
  bau(s, m, x, y, z, cor) {
    caixa(s, x, y, z, m.l, m.a - 10, m.p, cor)
    caixa(s, x + 1, y + m.a - 10, z + 1, m.l - 2, 10, m.p - 2, ajustar(cor, luminancia(cor) < 0.35 ? 0.25 : -0.08))
  },
  montante(s, m, x, y, z, cor) {
    const n = m.colunas || 1
    const esp = 3
    const vaoL = (m.l - esp * (n + 1)) / n
    const niveis = Math.max(2, Math.round(m.a / 42))
    for (let c = 0; c <= n; c++) {
      const xc = x + c * (vaoL + esp)
      if (c > 0) {
        for (let k = 0; k <= niveis; k++) {
          const yy = y + 6 + ((m.a - 8) * k) / niveis
          caixa(s, xc - vaoL, Math.min(yy, y + m.a - 2), z, vaoL, 2, m.p, cor)
        }
      }
      caixa(s, xc, y, z, esp, m.a, m.p, cor)
    }
  },
  estacao(s, m, x, y, z, cor) {
    FORMAS.montante(s, { l: m.l, a: m.a, p: 30, colunas: 3 }, x, y, z, cor)
    const tampo = 3
    caixa(s, x + m.l - 4, y, z + 30, 4, 75 - tampo, 60, cor)
    caixa(s, x, y + 75 - tampo, z + 30, m.l, tampo, 60, cor)
    caixa(s, x, y, z + m.p - 4, 60, 75 - tampo, 4, cor)
    caixa(s, x, y + 75 - tampo, z + 90, 60, tampo, m.p - 90, cor)
  },
}

export function desenhar(movel, cor, s = [], x = 0, y = 0, z = 0) {
  const forma = FORMAS[movel.forma] || FORMAS.caixa
  forma(s, movel, x, y, z, cor)
  return s
}

export function limites(formas, folga = 8) {
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity
  for (const f of formas) {
    for (const [px, py] of f.pts) {
      x0 = Math.min(x0, px)
      y0 = Math.min(y0, py)
      x1 = Math.max(x1, px)
      y1 = Math.max(y1, py)
    }
  }
  return [x0 - folga, y0 - folga, x1 - x0 + folga * 2, y1 - y0 + folga * 2]
}
