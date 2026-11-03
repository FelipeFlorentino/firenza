const minutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Hora de Brasília, independente do fuso do aparelho
const agoraEmSP = (data = new Date()) => {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(data)
  const v = Object.fromEntries(partes.map((p) => [p.type, p.value]))
  const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return { dia: dias[v.weekday], min: Number(v.hour) * 60 + Number(v.minute) }
}

export function statusAtendimento(horario, data) {
  const { dia, min } = agoraEmSP(data)
  const hoje = horario.find((h) => h.dias.includes(dia))
  if (hoje && min >= minutos(hoje.abre) && min < minutos(hoje.fecha)) {
    return { aberto: true, texto: `Atendendo agora · até ${hoje.fecha.replace(':00', 'h')}` }
  }
  return { aberto: false, texto: 'Fora do horário · deixe sua mensagem' }
}
