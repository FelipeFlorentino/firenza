import { numeros } from '../data/firenza'

export default function Numeros() {
  return (
    <section className="numeros" aria-label="A Firenza em números">
      {numeros.map((n) => (
        <div key={n.rotulo} className="numero revelar">
          <strong>{n.valor}</strong>
          <span>{n.rotulo}</span>
        </div>
      ))}
    </section>
  )
}
