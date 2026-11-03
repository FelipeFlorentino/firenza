import { useEffect, useState } from 'react'

const CHAVE = 'firenza-orcamento'

const ler = () => {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE))
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

export default function useOrcamento() {
  const [itens, setItens] = useState(ler)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(itens))
    } catch {
      // armazenamento indisponível: a lista vale só nesta visita
    }
  }, [itens])

  const chave = (id, cor) => `${id}|${cor || ''}`

  const adicionar = (id, cor) =>
    setItens((lista) => {
      const k = chave(id, cor)
      const existe = lista.find((i) => chave(i.id, i.cor) === k)
      if (existe) return lista.map((i) => (i === existe ? { ...i, quantidade: i.quantidade + 1 } : i))
      return [...lista, { id, cor, quantidade: 1 }]
    })

  const alterar = (id, cor, delta) =>
    setItens((lista) =>
      lista
        .map((i) => (chave(i.id, i.cor) === chave(id, cor) ? { ...i, quantidade: i.quantidade + delta } : i))
        .filter((i) => i.quantidade > 0),
    )

  const limpar = () => setItens([])
  const total = itens.reduce((s, i) => s + i.quantidade, 0)

  return { itens, adicionar, alterar, limpar, total }
}
