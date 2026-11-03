import { useState } from 'react'
import { assuntos, empresa } from '../data/firenza'
import { statusAtendimento } from '../utils/horario'
import { linkWhatsApp, mensagemContato } from '../utils/whatsapp'
import Icone from './Icone'

export default function Contato() {
  const [dados, setDados] = useState({ nome: '', cidade: '', assunto: assuntos[0], mensagem: '' })
  const status = statusAtendimento(empresa.horario)
  const mudar = (campo) => (e) => setDados((d) => ({ ...d, [campo]: e.target.value }))

  const enviar = (e) => {
    e.preventDefault()
    window.open(linkWhatsApp(empresa.whatsapp, mensagemContato(dados, empresa)), '_blank', 'noopener')
  }

  return (
    <section className="secao contato" id="contato">
      <div className="contato-grade">
        <div className="contato-info revelar">
          <p className="sobretitulo">Contato</p>
          <h2>
            Contato a <em>um toque.</em>
          </h2>
          <p>Conte o que você precisa: a equipe da Firenza tem a solução para o seu projeto.</p>
          <p className={`status ${status.aberto ? 'status--aberto' : ''}`}>
            <span className="ponto" /> {status.texto}
          </p>
          <ul className="contato-lista">
            <li>
              <Icone nome="telefone" />
              <a href={`tel:${empresa.telefoneLink}`}>{empresa.telefone}</a>
            </li>
            <li>
              <Icone nome="email" />
              <a href={`mailto:${empresa.email}`}>{empresa.email}</a>
            </li>
            <li>
              <Icone nome="relogio" />
              <span>{empresa.horarioTexto}</span>
            </li>
            <li>
              <Icone nome="pin" />
              <span>
                {empresa.endereco.rua}, {empresa.endereco.bairro}
                <br />
                {empresa.endereco.cidade} · CEP {empresa.endereco.cep}
                <small>{empresa.endereco.referencia}</small>
                <a href={empresa.endereco.mapa} target="_blank" rel="noreferrer" className="link-seta">
                  Como chegar <Icone nome="seta" tamanho={16} />
                </a>
              </span>
            </li>
          </ul>
        </div>

        <form className="formulario revelar" onSubmit={enviar}>
          <h3>Mande sua mensagem</h3>
          <div className="campos-duplos">
            <label className="campo">
              <span>Nome</span>
              <input required maxLength={80} value={dados.nome} onChange={mudar('nome')} autoComplete="name" />
            </label>
            <label className="campo">
              <span>Cidade</span>
              <input maxLength={60} value={dados.cidade} onChange={mudar('cidade')} />
            </label>
          </div>
          <label className="campo">
            <span>Assunto</span>
            <select value={dados.assunto} onChange={mudar('assunto')}>
              {assuntos.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label className="campo">
            <span>Mensagem</span>
            <textarea required maxLength={600} rows={4} value={dados.mensagem} onChange={mudar('mensagem')} placeholder="Ex.: quero montar um home office em um espaço de 2 metros..." />
          </label>
          <button type="submit" className="botao botao--whats">
            <Icone nome="whatsapp" tamanho={20} /> Enviar pelo WhatsApp
          </button>
        </form>
      </div>

      <div className="vagas revelar">
        <Icone nome="usuario" tamanho={28} />
        <div>
          <h3>Trabalhe com a gente</h3>
          <p>Quer realizar sonhos e ideias com a Firenza? Envie seu currículo.</p>
        </div>
        <a className="botao botao--linha" href={`mailto:${empresa.emailVagas}?subject=Currículo`}>
          {empresa.emailVagas}
        </a>
      </div>
    </section>
  )
}
