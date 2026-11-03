const P = {
  whatsapp: (
    <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z" fill="currentColor" stroke="none" />
  ),
  caixa: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" /><path d="M3 7.5 12 12l9-4.5M12 12v9M7.5 5.2l9 4.6" /></>,
  chave: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.6 17.2a1.4 1.4 0 0 0 2 2l5.7-5.7a4 4 0 0 0 5.2-5.4l-2.4 2.4-2-.4-.4-2 2.4-2.4Z" /></>,
  folha: <><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19c3-4 6-7 10-9" /></>,
  regua: <><path d="m3 15 12-12 6 6-12 12-6-6Z" /><path d="m7 11 2 2M10 8l2 2M13 5l2 2M5 13l1 1M8 10l1 1M11 7l1 1" /></>,
  telefone: <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  relogio: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  seta: <path d="M5 12h14M13 6l6 6-6 6" />,
  mais: <path d="M12 5v14M5 12h14" />,
  menos: <path d="M5 12h14" />,
  fechar: <path d="m6 6 12 12M18 6 6 18" />,
  lista: <><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2.6" /></>,
  busca: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pdf: <><path d="M14 3H6v18h12V7l-4-4Z" /><path d="M14 3v4h4M9 13h6M9 17h4" /></>,
  fabrica: <><path d="M3 21V10l5 3V10l5 3V5h3l1 4h4v12H3Z" /><path d="M7 17h2M12 17h2M17 17h1" /></>,
  banco: <><path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" /></>,
  usuario: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
}

export default function Icone({ nome, tamanho = 20, className }) {
  return (
    <svg
      className={className}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[nome]}
    </svg>
  )
}
