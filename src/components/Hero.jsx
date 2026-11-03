import { empresa } from '../data/firenza'
import { linkWhatsApp } from '../utils/whatsapp'
import Icone from './Icone'
import Montagem from './Montagem'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-texto">
        <p className="sobretitulo">
          <span className="ponto" /> Fábrica própria em Salto/SP
        </p>
        <h1>
          Móveis que se <em>encaixam</em> na sua casa, peça por peça.
        </h1>
        <p className="hero-sub">
          Cubos, nichos, armários e estantes modulares que chegam em embalagem compacta, montam fácil e crescem junto com
          o seu espaço. Do quarto ao escritório, direto da fábrica.
        </p>
        <div className="hero-acoes">
          <a href="#catalogo" className="botao botao--primario">
            Ver o catálogo <Icone nome="seta" tamanho={18} />
          </a>
          <a
            href={linkWhatsApp(empresa.whatsapp, 'Olá! Vim pelo site da Firenza e gostaria de um orçamento.')}
            className="botao botao--linha"
            target="_blank"
            rel="noreferrer"
          >
            <Icone nome="whatsapp" tamanho={18} /> Falar no WhatsApp
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <Montagem />
        <p className="hero-legenda">
          <strong>Monte do seu jeito.</strong> Cubos 40 e 20 + Nicho 1.20 em Branco Antique e Preto Carvalho.
        </p>
      </div>
    </section>
  )
}
