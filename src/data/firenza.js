// Todo o conteúdo do site fica aqui. Fonte: site atual (firenzamoveis.com.br)
// e catálogo em PDF da Firenza. Trocar fotos/dados = mexer só neste arquivo.

export const empresa = {
  nome: 'Firenza',
  nomeCompleto: 'Firenza Móveis',
  slogan: 'Unidos pelo talento e a razão. Concebidos por prazer e emoção.',
  // ATENÇÃO: confirmar com a Firenza se o fixo da fábrica tem WhatsApp
  // (mesmo número usado na primeira versão deste repositório).
  whatsapp: '551140214395',
  telefone: '(11) 4021-4395',
  telefoneLink: '+551140214395',
  email: 'firenza@firenzamoveis.com.br',
  emailVagas: 'vagas@firenzamoveis.com.br',
  endereco: {
    rua: 'Rua Islândia, 15',
    bairro: 'Distrito Industrial Bandeirante',
    cidade: 'Salto/SP',
    cep: '13.326-193',
    referencia: 'Atrás do Hospital Monte Serrat · acesso pela SP-75, saída 38',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Isl%C3%A2ndia+15+Distrito+Industrial+Bandeirante+Salto+SP',
  },
  horario: [
    // dia: 0 = domingo ... 6 = sábado
    { dias: [1, 2, 3, 4, 5], abre: '07:00', fecha: '17:00' },
  ],
  horarioTexto: 'Segunda a sexta, das 7h às 17h',
  fotoFabrica: '/images/08-sala-de-estar-firenza.jpg',
  catalogoPdf: 'http://www.firenzamoveis.com.br/catalogo.pdf',
}

export const numeros = [
  { valor: '1.000 m²', rotulo: 'de fábrica própria em Salto' },
  { valor: '50+', rotulo: 'módulos que se combinam entre si' },
  { valor: '8', rotulo: 'ambientes da casa e do escritório' },
  { valor: 'BNDES', rotulo: 'aceito como forma de pagamento' },
]

export const diferenciais = [
  {
    icone: 'caixa',
    titulo: 'Embalagem compacta',
    texto: 'Conceito trazido dos países pioneiros em móveis modulares: chega em caixas fáceis de transportar e guardar.',
  },
  {
    icone: 'chave',
    titulo: 'Montagem fácil',
    texto: 'Peças pensadas para montar sem complicação. Você mesmo monta e reorganiza quando quiser.',
  },
  {
    icone: 'folha',
    titulo: 'Material acima da média',
    texto: 'Matéria-prima de qualidade superior ao padrão do mercado, com responsabilidade socioambiental.',
  },
  {
    icone: 'regua',
    titulo: 'Design e ergonomia',
    texto: 'Beleza e conforto no mesmo projeto: medidas que funcionam em apartamento pequeno e em casa grande.',
  },
]

export const ambientes = [
  { id: 'escritorio', nome: 'Escritório', frase: 'Home office que cresce junto com a rotina.', foto: '/images/01-estacao-de-trabalho-modulada-firenza.jpg', alt: 'Estação de trabalho modulada Firenza com mesa, cubos suspensos e estante' },
  { id: 'cozinha', nome: 'Cozinha', frase: 'Linha Cozy e Click: armários altos, baixos e suspensos.', foto: '/images/02-cozinha-modulada-firenza.jpg', alt: 'Cozinha modulada Firenza com armários aéreos e balcão' },
  { id: 'lavanderia', nome: 'Lavanderia', frase: 'Produtos de limpeza no lugar, área de serviço livre.' },
  { id: 'despensa', nome: 'Despensa', frase: 'Armários 744 e 734 em dez cores.' },
  { id: 'sala-estar', nome: 'Sala de estar', frase: 'Painel, aparador suspenso, nichos e cubos para combinar.', foto: '/images/03-painel-de-tv-firenza.jpg', alt: 'Painel de TV Firenza com estantes laterais e aparador suspenso' },
  { id: 'sala-jantar', nome: 'Sala de jantar', frase: 'Mesa, cadeiras e apoio para a hora da refeição.', foto: '/images/04-sala-de-jantar-firenza.jpg', alt: 'Sala de jantar Firenza com mesa branca, cadeiras e armários suspensos' },
  { id: 'quarto-casal', nome: 'Quarto de casal', frase: 'Cama, criados e cômodas modulares.', foto: '/images/05-quarto-de-casal-firenza.jpg', alt: 'Quarto de casal Firenza com cama, criados e baú estofado' },
  { id: 'quarto-infantil', nome: 'Quarto infantil', frase: 'Cama Kit, estudo e organização de brinquedos.', foto: '/images/06-quarto-infantil-firenza.jpg', alt: 'Quarto infantil Firenza com cama, escrivaninha, nichos e armário' },
]

// Cores de acabamento (nomes iguais aos do catálogo)
export const cores = {
  'Branco Antique': '#ece5d6',
  'Preto Carvalho': '#3b2f26',
  Branco: '#f6f5f1',
  Preto: '#242322',
  Carvalho: '#a9784b',
  'Carvalho Antique': '#b98d60',
  Vermelho: '#bf3a2b',
  Verde: '#4c8a5c',
  Amarelo: '#e3b23c',
  Rosa: '#e39fb3',
  Laranja: '#e0782e',
  Cinza: '#8e9092',
  'Azul Claro': '#8db6d6',
  'Azul Escuro': '#2e4a7a',
  Azul: '#3a6db0',
  Marrom: '#6b4a32',
  Bege: '#d9c4a1',
}

const BA_PC = ['Branco Antique', 'Preto Carvalho']
const DEZ_CORES = ['Branco', 'Vermelho', 'Preto', 'Verde', 'Amarelo', 'Rosa', 'Laranja', 'Cinza', 'Azul Claro', 'Azul Escuro']
const OITO_CORES = ['Branco', 'Vermelho', 'Preto', 'Verde', 'Amarelo', 'Rosa', 'Laranja', 'Azul']

// forma: como o desenho isométrico é montado (ver src/utils/isometrico.js)
// frente: detalhe da face da frente (porta, gavetas, aberto, prateleiras...)
// medidas em cm: l = largura, p = profundidade, a = altura
export const produtos = [
  // Escritório
  { id: 'click-900-prateleira', nome: 'Armário Click 900 com 1 prateleira', ambientes: ['escritorio'], l: 70, p: 40, a: 90, cores: BA_PC, forma: 'caixa', frente: 'aberto:2' },
  { id: 'cubo-24-porta', nome: 'Cubo 24 com porta', ambientes: ['escritorio'], l: 40, p: 24, a: 40, cores: ['Branco', 'Preto'], forma: 'caixa', frente: 'porta' },
  { id: 'mesa-cubos', nome: 'Mesa Cubos', ambientes: ['escritorio'], l: 140, p: 52, a: 75, cores: ['Branco'], forma: 'mesaCubos' },
  { id: 'cadeira-light-color', nome: 'Cadeira Light Color', ambientes: ['escritorio'], l: 46, p: 50, a: 82, cores: ['Branco', 'Vermelho', 'Preto', 'Azul', 'Marrom', 'Laranja', 'Bege'], forma: 'cadeira', semMedida: true },
  { id: 'estante-biblioteca', nome: 'Estante Biblioteca', ambientes: ['escritorio'], l: 63, p: 26, a: 183, cores: BA_PC, forma: 'caixa', frente: 'aberto:5' },
  { id: 'cubo-24', nome: 'Cubo 24', ambientes: ['escritorio'], l: 40, p: 24, a: 40, cores: BA_PC, forma: 'caixa', frente: 'aberto:1' },
  { id: 'cadeira-new-giratoria', nome: 'Cadeira New Giratória', ambientes: ['escritorio'], l: 58, p: 58, a: 95, cores: ['Preto'], forma: 'giratoria', semMedida: true },
  { id: 'estacao-trabalho', nome: 'Estação de trabalho conjugada com estante', ambientes: ['escritorio'], l: 208, p: 172, a: 151, cores: [], forma: 'estacao' },
  { id: 'modulo-pt', nome: 'Armário Módulo PT', ambientes: ['escritorio'], l: 64, p: 38, a: 41, cores: ['Branco', 'Preto'], forma: 'caixa', frente: 'porta2' },
  { id: 'cubo-40-porta', nome: 'Cubo 40 com porta', ambientes: ['escritorio', 'sala-estar'], l: 40, p: 40, a: 40, cores: BA_PC, forma: 'caixa', frente: 'porta' },
  { id: 'evolukit-140', nome: 'Estante Evolukit 140', ambientes: ['escritorio'], l: 140, p: 26, a: 186, cores: ['Branco Antique'], forma: 'montante', colunas: 2 },
  { id: 'evolukit-208', nome: 'Estante Evolukit 208', ambientes: ['escritorio'], l: 208, p: 26, a: 186, cores: ['Branco Antique'], forma: 'montante', colunas: 3 },
  { id: 'evolukit-72', nome: 'Estante Evolukit 72', ambientes: ['escritorio'], l: 72, p: 38, a: 72.7, cores: ['Branco Antique'], forma: 'montante', colunas: 1 },

  // Lavanderia
  { id: 'armario-klean', nome: 'Armário Klean', ambientes: ['lavanderia'], l: 60, p: 48, a: 169, cores: ['Branco'], forma: 'caixa', frente: 'porta2v' },
  { id: 'suspenso-70', nome: 'Armário Suspenso 70 horizontal', ambientes: ['lavanderia', 'sala-jantar'], l: 70, p: 35, a: 40, cores: BA_PC, forma: 'caixa', frente: 'basculante', suspenso: true },
  { id: 'click-900-gaveta', nome: 'Armário Click 900 com gaveta', ambientes: ['lavanderia', 'sala-jantar'], l: 70, p: 40, a: 90, cores: BA_PC, forma: 'caixa', frente: 'gavetaPorta' },

  // Cozinha
  { id: 'cozy-vertical-porta', nome: 'Armário Cozy vertical com porta', ambientes: ['cozinha'], l: 40, p: 35, a: 80, cores: BA_PC, forma: 'caixa', frente: 'porta', suspenso: true },
  { id: 'cozy-inferior', nome: 'Armário Cozy inferior', ambientes: ['cozinha'], l: 80, p: 50, a: 73, cores: BA_PC, forma: 'caixa', frente: 'porta2' },
  { id: 'cozy-horizontal', nome: 'Armário Cozy horizontal', ambientes: ['cozinha'], l: 80, p: 35, a: 40, cores: BA_PC, forma: 'caixa', frente: 'basculante', suspenso: true },
  { id: 'cozy-pe-porta', nome: 'Armário Cozy pé com porta', ambientes: ['cozinha'], l: 40, p: 50, a: 73, cores: BA_PC, forma: 'caixa', frente: 'porta' },
  { id: 'cozy-pe-gaveteiro', nome: 'Armário Cozy pé gaveteiro', ambientes: ['cozinha'], l: 40, p: 50, a: 73, cores: BA_PC, forma: 'caixa', frente: 'gavetas:3' },
  { id: 'nicho-120', nome: 'Nicho 1.20', ambientes: ['cozinha', 'sala-estar', 'quarto-infantil'], l: 120, p: 24, a: 33, cores: BA_PC, forma: 'caixa', frente: 'aberto:1', suspenso: true, nota: 'Usa na horizontal ou na vertical.' },
  { id: 'click-900', nome: 'Armário Click 900', ambientes: ['cozinha'], l: 70, p: 40, a: 90, cores: BA_PC, forma: 'caixa', frente: 'porta2' },
  { id: 'click-1350', nome: 'Armário Click 1350 com porta e 3 prateleiras', ambientes: ['cozinha'], l: 70, p: 40, a: 135, cores: BA_PC, forma: 'caixa', frente: 'porta2' },

  // Sala de jantar
  { id: 'mesa-jantar', nome: 'Mesa de jantar', ambientes: ['sala-jantar'], l: 140, p: 80, a: 74, cores: ['Branco'], forma: 'mesa' },
  { id: 'cadeira-bombe', nome: 'Cadeira Bombe Color', ambientes: ['sala-jantar'], l: 44, p: 50, a: 84, cores: ['Branco'], forma: 'cadeira', semMedida: true },

  // Despensa
  { id: 'armario-744-5', nome: 'Armário 744-5', ambientes: ['despensa'], l: 70, p: 45, a: 222, cores: DEZ_CORES, forma: 'caixa', frente: 'portas:5' },
  { id: 'armario-744-4', nome: 'Armário 744-4', ambientes: ['despensa'], l: 70, p: 45, a: 180, cores: DEZ_CORES, forma: 'caixa', frente: 'portas:4' },
  { id: 'armario-734-3', nome: 'Armário 734-3', ambientes: ['despensa'], l: 70, p: 31, a: 138, cores: DEZ_CORES, forma: 'caixa', frente: 'portas:3' },
  { id: 'armario-744-2', nome: 'Armário 744-2', ambientes: ['despensa'], l: 70, p: 45, a: 97, cores: DEZ_CORES, forma: 'caixa', frente: 'portas:2' },
  { id: 'armario-744-1', nome: 'Armário 744-1', ambientes: ['despensa'], l: 70, p: 45, a: 55, cores: OITO_CORES, forma: 'caixa', frente: 'portas:1' },

  // Sala de estar
  { id: 'painel-tv', nome: 'Painel TV', ambientes: ['sala-estar'], l: 160, p: 4, a: 90, cores: BA_PC, forma: 'painel', suspenso: true },
  { id: 'aparador-tv', nome: 'Aparador para TV suspenso', ambientes: ['sala-estar'], l: 160, p: 40, a: 20, cores: BA_PC, forma: 'caixa', frente: 'aberto2h', suspenso: true },
  { id: 'click-450-gavetas', nome: 'Armário Click 450 com 3 gavetas', ambientes: ['sala-estar'], l: 70, p: 40, a: 45, cores: BA_PC, forma: 'caixa', frente: 'gavetas:3' },
  { id: 'sapateira-giratoria', nome: 'Sapateira giratória com espelho', ambientes: ['sala-estar'], l: 40, p: 40, a: 184, cores: ['Branco'], forma: 'caixa', frente: 'espelho' },
  { id: 'nicho-60', nome: 'Nicho 60', ambientes: ['sala-estar'], l: 23, p: 16, a: 60, cores: BA_PC, forma: 'caixa', frente: 'aberto:2', suspenso: true },
  { id: 'cubo-20', nome: 'Cubo 20', ambientes: ['sala-estar', 'quarto-casal'], l: 40, p: 40, a: 20, cores: BA_PC, forma: 'caixa', frente: 'aberto:1' },
  { id: 'nicho-60x24', nome: 'Nicho 60x24', ambientes: ['sala-estar', 'quarto-infantil'], l: 60, p: 24, a: 33, cores: BA_PC, forma: 'caixa', frente: 'aberto:1', suspenso: true },
  { id: 'cubo-duplo-20', nome: 'Cubo duplo 20', ambientes: ['sala-estar'], l: 80, p: 40, a: 20, cores: BA_PC, forma: 'caixa', frente: 'aberto2h' },
  { id: 'cubo-40-gavetas', nome: 'Cubo 40 com 3 gavetas', ambientes: ['sala-estar'], l: 40, p: 40, a: 40, cores: BA_PC, forma: 'caixa', frente: 'gavetas:3' },
  { id: 'cubo-40-retratil', nome: 'Cubo 40 com porta retrátil', ambientes: ['sala-estar'], l: 40, p: 40, a: 40, cores: ['Branco'], forma: 'caixa', frente: 'retratil' },
  { id: 'cubo-organizador', nome: 'Cubo organizador', ambientes: ['sala-estar'], l: 40, p: 24, a: 40, cores: [], forma: 'caixa', frente: 'aberto:2' },

  // Quarto de casal
  { id: 'bau-estofado', nome: 'Baú com estofado', ambientes: ['quarto-casal'], l: 70, p: 45, a: 52, cores: ['Branco', 'Vermelho', 'Preto'], forma: 'bau' },
  { id: 'cama-turca', nome: 'Cama Turca', ambientes: ['quarto-casal'], l: 143, p: 192, a: 30, cores: ['Branco'], forma: 'cama' },
  { id: 'criado-mudo', nome: 'Criado-mudo', ambientes: ['quarto-casal', 'quarto-infantil'], l: 40, p: 40, a: 46, cores: ['Branco', 'Preto', 'Carvalho Antique'], forma: 'caixa', frente: 'gavetaAberto' },
  { id: 'cubo-40', nome: 'Cubo 40', ambientes: ['quarto-casal'], l: 40, p: 40, a: 40, cores: BA_PC, forma: 'caixa', frente: 'aberto:1' },
  { id: 'cubo-2-gavetas', nome: 'Cubo com 2 gavetas', ambientes: ['quarto-casal'], l: 40, p: 40, a: 40, cores: BA_PC, forma: 'caixa', frente: 'gavetas:2' },
  { id: 'comoda-2-gavetas', nome: 'Módulo cômoda com 2 gavetas', ambientes: ['quarto-casal', 'quarto-infantil'], l: 70, p: 55, a: 45, cores: BA_PC, forma: 'caixa', frente: 'gavetas:2' },

  // Quarto infantil
  { id: 'modulo-1350-porta', nome: 'Armário Módulo 1350 com porta', ambientes: ['quarto-infantil'], l: 70, p: 55, a: 135, cores: BA_PC, forma: 'caixa', frente: 'porta2' },
  { id: 'cama-kit', nome: 'Cama Kit', ambientes: ['quarto-infantil'], l: 96, p: 194, a: 45, cores: ['Branco'], forma: 'cama' },
  { id: 'estante-26', nome: 'Estante 26x26', ambientes: ['quarto-infantil'], l: 26, p: 26, a: 116, cores: ['Branco Antique', 'Carvalho'], forma: 'caixa', frente: 'aberto:4' },
  { id: 'comoda-3-gavetas', nome: 'Armário módulo cômoda com 3 gavetas', ambientes: ['quarto-infantil'], l: 70, p: 40, a: 45, cores: BA_PC, forma: 'caixa', frente: 'gavetas:3' },
  { id: 'estante-biblioteca-porta', nome: 'Estante Biblioteca com porta', ambientes: ['quarto-infantil'], l: 63, p: 26, a: 183, cores: BA_PC, forma: 'caixa', frente: 'abertoPorta' },
  { id: 'modulo-pt-correr', nome: 'Armário Módulo PT com porta de correr', ambientes: ['quarto-infantil'], l: 64, p: 38, a: 41, cores: OITO_CORES, forma: 'caixa', frente: 'correr' },
  { id: 'mesa-office', nome: 'Mesa Office', ambientes: ['quarto-infantil'], l: 140, p: 52, a: 75, cores: ['Branco'], forma: 'mesa' },
]

// Composição de cada ambiente (posição em cm: x da esquerda, y do chão, z da parede).
// A ordem é a ordem de desenho: do fundo para a frente, da esquerda para a direita.
export const cenas = {
  escritorio: [
    { id: 'estante-biblioteca', x: 0 },
    { id: 'mesa-cubos', x: 78 },
    { id: 'cadeira-light-color', x: 128, z: 58 },
    { id: 'click-900-prateleira', x: 234 },
    { id: 'cubo-24-porta', x: 249, y: 90 },
  ],
  cozinha: [
    { id: 'click-1350', x: 0 },
    { id: 'cozy-vertical-porta', x: 78, y: 135 },
    { id: 'cozy-pe-gaveteiro', x: 78 },
    { id: 'cozy-horizontal', x: 118, y: 150 },
    { id: 'cozy-inferior', x: 118 },
    { id: 'nicho-120', x: 210, y: 105 },
  ],
  lavanderia: [
    { id: 'armario-klean', x: 0 },
    { id: 'suspenso-70', x: 70, y: 140 },
    { id: 'click-900-gaveta', x: 70 },
  ],
  despensa: [
    { id: 'armario-744-5', x: 0, cor: 'Branco' },
    { id: 'armario-744-4', x: 74, cor: 'Amarelo' },
    { id: 'armario-734-3', x: 148, cor: 'Azul Escuro' },
    { id: 'armario-744-2', x: 222, cor: 'Vermelho' },
  ],
  'sala-estar': [
    { id: 'sapateira-giratoria', x: 0, cor: 'Branco' },
    { id: 'painel-tv', x: 60, y: 55 },
    { id: 'aparador-tv', x: 60, y: 25, z: 4 },
    { id: 'nicho-60', x: 245, y: 95 },
    { id: 'cubo-40-gavetas', x: 236 },
  ],
  'sala-jantar': [
    { id: 'suspenso-70', x: 0, y: 140 },
    { id: 'click-900-gaveta', x: 0 },
    { id: 'mesa-jantar', x: 95, z: 25 },
    { id: 'cadeira-bombe', x: 115, z: 108 },
    { id: 'cadeira-bombe', x: 185, z: 108 },
  ],
  'quarto-casal': [
    { id: 'criado-mudo', x: 0, cor: 'Carvalho Antique' },
    { id: 'cama-turca', x: 46 },
    { id: 'criado-mudo', x: 195, cor: 'Carvalho Antique' },
    { id: 'comoda-2-gavetas', x: 246 },
    { id: 'bau-estofado', x: 82, z: 198, cor: 'Preto' },
  ],
  'quarto-infantil': [
    { id: 'estante-biblioteca-porta', x: 0 },
    { id: 'nicho-60x24', x: 175, y: 120 },
    { id: 'mesa-office', x: 175 },
    { id: 'modulo-pt-correr', x: 211, y: 75, cor: 'Azul' },
    { id: 'cama-kit', x: 70, z: 0 },
  ],
}

export const perfis = [
  { id: 'casa', rotulo: 'Para minha casa' },
  { id: 'lojista', rotulo: 'Sou lojista / revenda' },
  { id: 'encomenda', rotulo: 'Projeto sob encomenda' },
]

export const assuntos = ['Orçamento', 'Revenda para lojas', 'Projeto sob encomenda', 'Pagamento pelo BNDES', 'Outro assunto']
