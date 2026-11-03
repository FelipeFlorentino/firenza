# Firenza Móveis · proposta de novo site

Proposta de nova versão do site da **Firenza Móveis** (fábrica de móveis modulares em Salto-SP), feita por Felipe Florentino · Dev Web.

## O que o site faz

- **Hero com estante sendo montada** peça por peça (cubos 40/20 + nicho 1.20 do catálogo).
- **Ambientes**: 8 ambientes do catálogo (escritório, cozinha, lavanderia, despensa, salas, quartos) montados com as peças reais.
- **Catálogo** com as ~55 peças do PDF oficial, medidas reais, troca de cor, busca e filtro por ambiente.
- **Lista de orçamento**: o visitante adiciona peças/cores/quantidades e envia tudo pelo WhatsApp numa mensagem organizada.
- Seções de diferenciais, fábrica, lojistas/sob encomenda/BNDES, contato (formulário → WhatsApp, status "atendendo agora") e trabalhe conosco.
- Fundo animado de "planta de projeto" (grade isométrica + módulos em arame que reagem ao mouse/dedo).

Os ambientes usam as fotos reais da Firenza (`public/images`), com opção de ver o "projeto 3D". Os móveis do catálogo são **desenhados em código a partir das medidas do catálogo** (`src/utils/isometrico.js`), então não dependem de fotos. Quando a Firenza mandar fotos reais, dá para incluir um campo `imagem` em cada produto.

## Conteúdo

Tudo fica em `src/data/firenza.js` (contatos, horário, produtos, cores, cenas dos ambientes).

**Antes de publicar para o cliente:**
- Confirmar se o fixo (11) 4021-4395 tem WhatsApp (é o número usado em `whatsapp`).
- Confirmar telefone e horário: o site atual diz (11) 4021-4395 e seg-sex 7h-17h; o PDF diz (11) 3413-3237 / 3413-4880 e seg-sex 8h-17h, sáb 9h-13h.
- Trocar a marca provisória (`src/components/Logo.jsx`) pelo logotipo oficial.

## Rodar

```bash
npm install
npm run dev
```

Build: `npm run build` · Lint: `npm run lint`. Deploy na Vercel (Vite é detectado sozinho).
