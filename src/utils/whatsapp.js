import { perfis } from '../data/firenza'

export const linkWhatsApp = (numero, texto) =>
  `https://wa.me/${numero}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`

export const medidas = (m) => `L${m.l} × P${m.p} × A${m.a} cm`

export const mensagemOrcamento = (linhas, dados, empresa) => {
  const perfil = perfis.find((p) => p.id === dados.perfil)?.rotulo
  const msg = [`*Orçamento pelo site - ${empresa.nomeCompleto}*`, '']
  for (const l of linhas) {
    msg.push(`${l.quantidade}x ${l.nome}${l.cor ? ` - ${l.cor}` : ''} (${medidas(l)})`)
  }
  msg.push('')
  msg.push(`*Nome:* ${dados.nome}`)
  if (dados.cidade) msg.push(`*Cidade:* ${dados.cidade}`)
  if (perfil) msg.push(`*Perfil:* ${perfil}`)
  if (dados.observacao) msg.push(`*Obs.:* ${dados.observacao}`)
  return msg.join('\n')
}

export const mensagemContato = (dados, empresa) =>
  [
    `*Contato pelo site - ${empresa.nomeCompleto}*`,
    '',
    `*Nome:* ${dados.nome}`,
    `*Assunto:* ${dados.assunto}`,
    dados.cidade ? `*Cidade:* ${dados.cidade}` : null,
    '',
    dados.mensagem,
  ]
    .filter((l) => l !== null)
    .join('\n')
