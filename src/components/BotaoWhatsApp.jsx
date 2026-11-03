import { empresa } from '../data/firenza'
import { linkWhatsApp } from '../utils/whatsapp'
import Icone from './Icone'

export default function BotaoWhatsApp() {
  return (
    <a
      className="whats-flutuante"
      href={linkWhatsApp(empresa.whatsapp, 'Olá! Vim pelo site da Firenza.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
    >
      <Icone nome="whatsapp" tamanho={28} />
    </a>
  )
}
