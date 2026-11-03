import { useState } from 'react'
import { ambientes, cenas, produtos } from '../data/firenza'
import Cena from './Cena'
import Icone from './Icone'

const porId = Object.fromEntries(produtos.map((p) => [p.id, p]))

export default function Ambientes({ ativo, setAtivo, irParaCatalogo }) {
  const amb = ambientes.find((a) => a.id === ativo) || ambientes[0]
  const [modo, setModo] = useState('foto')
  const verFoto = modo === 'foto' && amb.foto
  const pecas = [...new Set((cenas[amb.id] || []).map((c) => c.id))].map((id) => porId[id])

  return (
    <section className="secao ambientes" id="ambientes">
      <div className="secao-cabeca revelar">
        <p className="sobretitulo">Ambientes</p>
        <h2>
          Uma linha, <em>oito</em> ambientes.
        </h2>
        <p>Os mesmos módulos se combinam da cozinha ao quarto das crianças. Escolha um ambiente e veja como fica montado.</p>
      </div>

      <div className="abas" role="tablist" aria-label="Escolha o ambiente">
        {ambientes.map((a) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={a.id === amb.id}
            className={`aba ${a.id === amb.id ? 'aba--ativa' : ''}`}
            onClick={() => setAtivo(a.id)}
          >
            {a.nome}
          </button>
        ))}
      </div>

      <div className="ambiente-palco revelar" role="tabpanel" aria-label={amb.nome}>
        <div className={`ambiente-desenho ${verFoto ? 'ambiente-desenho--foto' : ''}`}>
          {verFoto ? (
            <img key={amb.foto} src={amb.foto} alt={amb.alt} className="ambiente-foto" loading="lazy" />
          ) : (
            <Cena key={amb.id} ambiente={amb.id} nome={amb.nome} />
          )}
          {amb.foto && (
            <div className="alternar" role="group" aria-label="Como ver o ambiente">
              <button type="button" aria-pressed={modo === 'foto'} onClick={() => setModo('foto')}>
                Foto
              </button>
              <button type="button" aria-pressed={modo === 'planta'} onClick={() => setModo('planta')}>
                Projeto 3D
              </button>
            </div>
          )}
        </div>
        <div className="ambiente-info">
          <h3>{amb.nome}</h3>
          <p>{amb.frase}</p>
          <ul className="ambiente-pecas">
            {pecas.map((p) => (
              <li key={p.id}>
                <span>{p.nome}</span>
                {!p.semMedida && <small>{p.l}×{p.p}×{p.a}</small>}
              </li>
            ))}
          </ul>
          <button type="button" className="botao botao--primario" onClick={() => irParaCatalogo(amb.id)}>
            Ver peças de {amb.nome.toLowerCase()} <Icone nome="seta" tamanho={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
