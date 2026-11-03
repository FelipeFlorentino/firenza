import { empresa } from '../data/firenza'
import { linkWhatsApp } from '../utils/whatsapp'
import Icone from './Icone'

const CARTOES = [
  {
    icone: 'fabrica',
    titulo: 'Revenda para lojas',
    texto: 'A Firenza já atende grandes lojas do setor varejista, com fornecimento de acordo com a demanda de cada loja.',
    msg: 'Olá! Tenho uma loja e quero saber sobre revenda dos móveis Firenza.',
    acao: 'Quero revender',
  },
  {
    icone: 'regua',
    titulo: 'Projeto sob encomenda',
    texto: 'Tem um projeto específico? A Firenza desenvolve o produto a partir da sua necessidade, com a mesma qualidade da linha.',
    msg: 'Olá! Tenho um projeto e queria saber sobre móveis sob encomenda.',
    acao: 'Enviar meu projeto',
  },
  {
    icone: 'banco',
    titulo: 'Pagamento pelo BNDES',
    texto: 'Aceitamos pagamento via BNDES. A Firenza é parceira do desenvolvimento da sua empresa.',
    msg: 'Olá! Quero comprar móveis Firenza pagando com o Cartão BNDES.',
    acao: 'Comprar com BNDES',
  },
]

export default function Lojistas() {
  return (
    <section className="secao lojistas" id="lojistas">
      <div className="secao-cabeca revelar">
        <p className="sobretitulo">Para empresas</p>
        <h2>
          Lojistas, projetos e <em>empresas.</em>
        </h2>
        <p>Além da linha para casa, a fábrica atende quem compra em volume ou precisa de algo sob medida.</p>
      </div>
      <div className="grade-lojistas">
        {CARTOES.map((c, i) => (
          <article key={c.titulo} className="lojista revelar" style={{ '--i': i }}>
            <Icone nome={c.icone} tamanho={30} />
            <h3>{c.titulo}</h3>
            <p>{c.texto}</p>
            <a href={linkWhatsApp(empresa.whatsapp, c.msg)} target="_blank" rel="noreferrer" className="link-seta">
              {c.acao} <Icone nome="seta" tamanho={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
