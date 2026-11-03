import { useCallback, useEffect, useState } from 'react'
import Ambientes from './components/Ambientes'
import BotaoWhatsApp from './components/BotaoWhatsApp'
import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import Diferenciais from './components/Diferenciais'
import Fabrica from './components/Fabrica'
import Fundo from './components/Fundo'
import Header from './components/Header'
import Hero from './components/Hero'
import Lojistas from './components/Lojistas'
import Numeros from './components/Numeros'
import Orcamento from './components/Orcamento'
import Rodape from './components/Rodape'
import useOrcamento from './hooks/useOrcamento'

export default function App() {
  const orcamento = useOrcamento()
  const [listaAberta, setListaAberta] = useState(false)
  const [ambiente, setAmbiente] = useState('escritorio')
  const [filtro, setFiltro] = useState('todos')
  const fechar = useCallback(() => setListaAberta(false), [])

  // revela as seções ao rolar
  useEffect(() => {
    const alvos = document.querySelectorAll('.revelar')
    if (!('IntersectionObserver' in window)) {
      alvos.forEach((a) => a.classList.add('visivel'))
      return undefined
    }
    const obs = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visivel')
            obs.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    )
    alvos.forEach((a) => obs.observe(a))
    return () => obs.disconnect()
  }, [])

  const irParaCatalogo = (id) => {
    setFiltro(id)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Fundo />
      <a href="#catalogo" className="pular">
        Pular para o catálogo
      </a>
      <Header total={orcamento.total} abrirOrcamento={() => setListaAberta(true)} />
      <main>
        <Hero />
        <Numeros />
        <Ambientes ativo={ambiente} setAtivo={setAmbiente} irParaCatalogo={irParaCatalogo} />
        <Catalogo filtro={filtro} setFiltro={setFiltro} adicionar={orcamento.adicionar} />
        <Diferenciais />
        <Fabrica />
        <Lojistas />
        <Contato />
      </main>
      <Rodape />
      <BotaoWhatsApp />
      <Orcamento aberto={listaAberta} fechar={fechar} orcamento={orcamento} />
    </>
  )
}
