import { diferenciais } from '../data/firenza'
import Icone from './Icone'

export default function Diferenciais() {
  return (
    <section className="secao diferenciais">
      <div className="secao-cabeca revelar">
        <p className="sobretitulo">Por que Firenza</p>
        <h2>
          Da caixa para a parede <em>sem dor de cabeça.</em>
        </h2>
      </div>
      <div className="grade-diferenciais">
        {diferenciais.map((d, i) => (
          <article key={d.titulo} className="diferencial revelar" style={{ '--i': i }}>
            <span className="diferencial-icone">
              <Icone nome={d.icone} tamanho={26} />
            </span>
            <span className="diferencial-num">0{i + 1}</span>
            <h3>{d.titulo}</h3>
            <p>{d.texto}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
