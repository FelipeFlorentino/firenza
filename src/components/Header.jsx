import { useEffect, useState } from 'react'
import Icone from './Icone'
import Logo from './Logo'

const LINKS = [
  ['#ambientes', 'Ambientes'],
  ['#catalogo', 'Catálogo'],
  ['#fabrica', 'A fábrica'],
  ['#lojistas', 'Lojistas'],
  ['#contato', 'Contato'],
]

export default function Header({ total, abrirOrcamento }) {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header className={`topo ${rolou ? 'topo--rolou' : ''}`}>
      <div className="topo-interno">
        <a href="#inicio" className="topo-marca" aria-label="Firenza Móveis, voltar ao início">
          <Logo />
        </a>
        <nav className={`menu ${aberto ? 'menu--aberto' : ''}`} aria-label="Principal">
          {LINKS.map(([href, rotulo]) => (
            <a key={href} href={href} onClick={() => setAberto(false)}>
              {rotulo}
            </a>
          ))}
        </nav>
        <button type="button" className="botao-lista" onClick={abrirOrcamento}>
          <Icone nome="lista" tamanho={18} />
          <span className="botao-lista-texto">Orçamento</span>
          <span className={`contador ${total ? 'contador--ativo' : ''}`} aria-label={`${total} itens`}>
            {total}
          </span>
        </button>
        <button
          type="button"
          className="botao-menu"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <Icone nome={aberto ? 'fechar' : 'menu'} tamanho={22} />
        </button>
      </div>
    </header>
  )
}
