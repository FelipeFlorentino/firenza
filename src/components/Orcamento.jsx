import { useEffect, useRef, useState } from 'react'
import { cores, empresa, perfis, produtos } from '../data/firenza'
import { linkWhatsApp, medidas, mensagemOrcamento } from '../utils/whatsapp'
import Icone from './Icone'
import Movel from './Movel'

const porId = Object.fromEntries(produtos.map((p) => [p.id, p]))

export default function Orcamento({ aberto, fechar, orcamento }) {
  const { itens, alterar, limpar, total } = orcamento
  const [dados, setDados] = useState({ nome: '', cidade: '', perfil: 'casa', observacao: '' })
  const painel = useRef(null)

  useEffect(() => {
    if (!aberto) return undefined
    const tecla = (e) => e.key === 'Escape' && fechar()
    document.addEventListener('keydown', tecla)
    document.body.classList.add('travado')
    painel.current?.focus()
    return () => {
      document.removeEventListener('keydown', tecla)
      document.body.classList.remove('travado')
    }
  }, [aberto, fechar])

  const linhas = itens.filter((i) => porId[i.id]).map((i) => ({ ...porId[i.id], cor: i.cor, quantidade: i.quantidade }))
  const mudar = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    const texto = mensagemOrcamento(linhas, dados, empresa)
    window.open(linkWhatsApp(empresa.whatsapp, texto), '_blank', 'noopener')
  }

  return (
    <div className={`gaveta ${aberto ? 'gaveta--aberta' : ''}`} aria-hidden={!aberto}>
      <button type="button" className="gaveta-fundo" aria-label="Fechar lista" tabIndex={-1} onClick={fechar} />
      <aside
        className="gaveta-painel"
        role="dialog"
        aria-modal="true"
        aria-label="Lista de orçamento"
        tabIndex={-1}
        ref={painel}
        inert={!aberto}
      >
        <div className="gaveta-cabeca">
          <h2>Lista de orçamento</h2>
          <button type="button" className="botao-icone" onClick={fechar} aria-label="Fechar">
            <Icone nome="fechar" />
          </button>
        </div>

        {linhas.length === 0 ? (
          <div className="gaveta-vazia">
            <Icone nome="caixa" tamanho={40} />
            <p>Sua lista está vazia. Adicione peças do catálogo para pedir o orçamento.</p>
            <a href="#catalogo" className="botao botao--primario" onClick={fechar}>
              Ir para o catálogo
            </a>
          </div>
        ) : (
          <form className="gaveta-conteudo" onSubmit={enviar}>
            <ul className="linhas">
              {linhas.map((l) => (
                <li key={`${l.id}-${l.cor}`} className="linha">
                  <div className="linha-desenho">
                    <Movel movel={l} cor={l.cor} minimo={0} />
                  </div>
                  <div className="linha-info">
                    <strong>{l.nome}</strong>
                    <small>
                      {l.cor && (
                        <>
                          <span className="bolinha" style={{ '--cor': cores[l.cor] }} /> {l.cor} ·{' '}
                        </>
                      )}
                      {medidas(l)}
                    </small>
                  </div>
                  <div className="quantidade">
                    <button type="button" aria-label={`Remover um ${l.nome}`} onClick={() => alterar(l.id, l.cor, -1)}>
                      <Icone nome="menos" tamanho={16} />
                    </button>
                    <span>{l.quantidade}</span>
                    <button type="button" aria-label={`Adicionar um ${l.nome}`} onClick={() => alterar(l.id, l.cor, 1)}>
                      <Icone nome="mais" tamanho={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button type="button" className="link-limpar" onClick={limpar}>
              Limpar lista ({total} {total === 1 ? 'peça' : 'peças'})
            </button>

            <fieldset className="perfis">
              <legend>O orçamento é</legend>
              {perfis.map((p) => (
                <label key={p.id} className={`perfil ${dados.perfil === p.id ? 'perfil--ativo' : ''}`}>
                  <input type="radio" name="perfil" value={p.id} checked={dados.perfil === p.id} onChange={mudar('perfil')} />
                  {p.rotulo}
                </label>
              ))}
            </fieldset>
            <label className="campo">
              <span>Seu nome</span>
              <input required maxLength={80} value={dados.nome} onChange={mudar('nome')} autoComplete="name" />
            </label>
            <label className="campo">
              <span>Cidade</span>
              <input maxLength={60} value={dados.cidade} onChange={mudar('cidade')} placeholder="Ex.: Salto, Itu, Indaiatuba" />
            </label>
            <label className="campo">
              <span>Observação (opcional)</span>
              <textarea maxLength={400} rows={2} value={dados.observacao} onChange={mudar('observacao')} placeholder="Medida do espaço, prazo, forma de pagamento..." />
            </label>
            <button type="submit" className="botao botao--whats">
              <Icone nome="whatsapp" tamanho={20} /> Enviar orçamento pelo WhatsApp
            </button>
          </form>
        )}
      </aside>
    </div>
  )
}
