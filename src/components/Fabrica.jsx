import { empresa } from '../data/firenza'
import Icone from './Icone'

export default function Fabrica() {
  return (
    <section className="secao fabrica" id="fabrica">
      <div className="fabrica-grade">
        <div className="fabrica-texto revelar">
          <p className="sobretitulo">A fábrica</p>
          <h2>
            Feito em Salto, com <em>foco no realizar.</em>
          </h2>
          <p>
            A Firenza nasceu com um conceito simples: móveis modulares, práticos e versáteis, em embalagens compactas e de
            fácil montagem. Ao longo do tempo esse conceito foi aperfeiçoado com dinamismo, modernidade e qualidade de
            produção.
          </p>
          <p>
            Hoje são 1.000 m² de fábrica no Distrito Industrial Bandeirante, produzindo para clientes finais e para
            grandes lojas do varejo, com respeito ao ser humano e à sociedade.
          </p>
          <blockquote>“{empresa.slogan}”</blockquote>
        </div>
        <div className="fabrica-lado revelar">
          <img src={empresa.fotoFabrica} alt="Sala de estar com móveis Firenza: painel, rack suspenso e cômoda" className="fabrica-foto" loading="lazy" />
          <ul className="fabrica-fatos">
          <li>
            <Icone nome="fabrica" tamanho={26} />
            <div>
              <strong>Loja de fábrica</strong>
              <span>Compre direto de quem produz, na Rua Islândia, 15, em Salto.</span>
            </div>
          </li>
          <li>
            <Icone nome="folha" tamanho={26} />
            <div>
              <strong>Responsabilidade socioambiental</strong>
              <span>Matéria-prima acima da média do mercado e processo responsável.</span>
            </div>
          </li>
          <li>
            <Icone nome="caixa" tamanho={26} />
            <div>
              <strong>Pronto para levar</strong>
              <span>Embalagem compacta, fácil de transportar e de guardar até a montagem.</span>
            </div>
          </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
