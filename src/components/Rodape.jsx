import { empresa } from '../data/firenza'
import Logo from './Logo'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-interno">
        <Logo />
        <p>
          {empresa.endereco.rua} · {empresa.endereco.bairro} · {empresa.endereco.cidade}
          <br />
          {empresa.telefone} · {empresa.email}
        </p>
        <p className="credito">
          Proposta de novo site por{' '}
          <a href="https://www.instagram.com/felipeflorentino.dev/" target="_blank" rel="noreferrer">
            Felipe Florentino · Dev Web
          </a>
        </p>
      </div>
    </footer>
  )
}
