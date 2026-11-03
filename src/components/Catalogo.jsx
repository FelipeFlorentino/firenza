import { useMemo, useState } from 'react'
import { ambientes, cores, empresa, produtos } from '../data/firenza'
import { medidas } from '../utils/whatsapp'
import Icone from './Icone'
import Movel from './Movel'

const semAcento = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const POR_PAGINA = 12

function Cartao({ movel, adicionar }) {
  const [cor, setCor] = useState(movel.cores[0])
  const [adicionado, setAdicionado] = useState(false)

  const clicar = () => {
    adicionar(movel.id, cor)
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 1400)
  }

  return (
    <article className="cartao">
      <div className="cartao-desenho">
        <Movel movel={movel} cor={cor} />
        {!movel.semMedida && <span className="cartao-medida">{medidas(movel)}</span>}
      </div>
      <div className="cartao-corpo">
        <h3>{movel.nome}</h3>
        {movel.nota && <p className="cartao-nota">{movel.nota}</p>}
        {movel.cores.length > 0 ? (
          <div className="cores" role="radiogroup" aria-label={`Cores de ${movel.nome}`}>
            {movel.cores.map((c) => (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={c === cor}
                title={c}
                aria-label={c}
                className={`cor ${c === cor ? 'cor--ativa' : ''}`}
                style={{ '--cor': cores[c] }}
                onClick={() => setCor(c)}
              />
            ))}
            <span className="cor-nome">{cor}</span>
          </div>
        ) : (
          <p className="cartao-nota">Cores sob consulta</p>
        )}
        <button type="button" className={`botao-add ${adicionado ? 'botao-add--ok' : ''}`} onClick={clicar}>
          <Icone nome={adicionado ? 'check' : 'mais'} tamanho={18} />
          <span className="texto-longo">{adicionado ? 'Na lista de orçamento' : 'Adicionar ao orçamento'}</span>
          <span className="texto-curto">{adicionado ? 'Na lista' : 'Adicionar'}</span>
        </button>
      </div>
    </article>
  )
}

export default function Catalogo({ filtro, setFiltro, adicionar }) {
  const [busca, setBusca] = useState('')
  const [limite, setLimite] = useState(POR_PAGINA)

  const lista = useMemo(() => {
    const termo = semAcento(busca.trim())
    return produtos.filter(
      (p) => (filtro === 'todos' || p.ambientes.includes(filtro)) && (!termo || semAcento(p.nome).includes(termo)),
    )
  }, [busca, filtro])

  const trocarFiltro = (id) => {
    setFiltro(id)
    setLimite(POR_PAGINA)
  }

  return (
    <section className="secao catalogo" id="catalogo">
      <div className="secao-cabeca revelar">
        <p className="sobretitulo">Catálogo</p>
        <h2>
          Escolha as peças, a <em>cor</em> e peça o orçamento.
        </h2>
        <p>
          Todas as medidas são as do catálogo oficial. Monte sua lista e envie pelo WhatsApp: a equipe da fábrica responde
          com preço e prazo.
        </p>
      </div>

      <div className="catalogo-filtros">
        <label className="busca">
          <Icone nome="busca" tamanho={18} />
          <input
            type="search"
            placeholder="Buscar: cubo, nicho, cama..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value)
              setLimite(POR_PAGINA)
            }}
            aria-label="Buscar no catálogo"
          />
        </label>
        <div className="chips" aria-label="Filtrar por ambiente">
          {[{ id: 'todos', nome: 'Todos' }, ...ambientes].map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={filtro === a.id}
              className={`chip ${filtro === a.id ? 'chip--ativo' : ''}`}
              onClick={() => trocarFiltro(a.id)}
            >
              {a.nome}
            </button>
          ))}
        </div>
      </div>

      <p className="catalogo-contagem" aria-live="polite">
        {lista.length} {lista.length === 1 ? 'peça' : 'peças'}
      </p>

      {lista.length === 0 ? (
        <p className="vazio">Nenhuma peça com esse nome. Tente "armário", "cubo" ou "mesa".</p>
      ) : (
        <div className="grade-produtos">
          {lista.slice(0, limite).map((p) => (
            <Cartao key={p.id} movel={p} adicionar={adicionar} />
          ))}
        </div>
      )}

      <div className="catalogo-rodape">
        {limite < lista.length && (
          <button type="button" className="botao botao--linha" onClick={() => setLimite((l) => l + POR_PAGINA)}>
            Mostrar mais {Math.min(POR_PAGINA, lista.length - limite)} peças
          </button>
        )}
        <a href={empresa.catalogoPdf} className="link-pdf" target="_blank" rel="noreferrer">
          <Icone nome="pdf" tamanho={18} /> Baixar o catálogo completo em PDF
        </a>
      </div>
    </section>
  )
}
