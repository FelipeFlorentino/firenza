// Marca provisória (trocar pelo logotipo oficial da Firenza)
export default function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path d="M16 3 28 9.5v13L16 29 4 22.5v-13L16 3Z" fill="var(--tinta)" />
        <path d="M16 16 28 9.5M16 16v13M16 16 4 9.5" stroke="var(--papel)" strokeWidth="1.4" fill="none" />
        <path d="M16 3 28 9.5 16 16 4 9.5 16 3Z" fill="var(--acento)" />
      </svg>
      <span className="logo-texto">
        Firenza<small>móveis modulares</small>
      </span>
    </span>
  )
}
