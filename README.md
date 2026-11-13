# Projeto para AP2 da disciplina Projeto Front-end

## PKZ Lab & One to One — versão React

Repositório do site da PKZ Lab & Studio One To One refeito em **React**, a partir da versão Vanilla
(HTML, CSS e JavaScript puro) entregue na AC: https://github.com/enzotrotto-ibmec/PFE-2026-2-Grupo-1-vanila

O design, os textos, as imagens e o sistema de agendamento são os mesmos do Vanilla, mobile first e
com menu hambúrguer. O que muda é a forma de construir: o site virou uma SPA (*single page application*).

## Tecnologias

* React 19 (componentes, props e `useState`)
* React Router (`BrowserRouter`, `Routes`, `Route` e `Link`)
* Vite (servidor de desenvolvimento e build)
* GSAP + ScrollTrigger (animações presas à rolagem) e um shader WebGL no fundo do hero
* CSS3 (as mesmas folhas de estilo do Vanilla)

## Requisitos da AP2 (e-mail do professor) e onde estão

| Requisito | Como foi feito |
| --- | --- |
| Só 1 `index.html`; as "páginas" são componentes | `index.html` na raiz; cada página é um componente em `src/pages/` |
| Componentes baseados no Vanilla | Cada bloco do Vanilla virou um componente em `src/components/` |
| Props | Dados da marca (`src/data/marcas.js`) descem por props; o mesmo `Hero`, `Faq`, `Rodape`... serve às duas marcas |
| `useState` | Menu hambúrguer, janelas de contato e agendamento, formulário, mapa, halter do portal |
| Navegação com `BrowserRouter` | `src/main.jsx` (BrowserRouter) e `src/App.jsx` (Routes/Route) |
| Sem `<a>` para navegação interna | Toda troca de página usa `<Link>` (via `LinkInterno`); `<a>` só para links externos (WhatsApp, Instagram, Google Maps) e para o atalho de acessibilidade "Pular para o conteúdo" (`href="#main"`, que não troca de página) |
| Sem `useEffect` (só na próxima aula) | Os componentes de dados e de página não usam. **Exceção assumida pelo grupo:** os efeitos visuais (`utils/animacoes.js`, `components/efeitos/FundoShader.jsx` e `components/TransicaoPagina.jsx`) usam `useLayoutEffect`/`useEffect`, porque GSAP e WebGL precisam do DOM já montado |

## Rotas

| Vanilla | React (rota) | Componente |
| --- | --- | --- |
| `index.html` | `/` | `pages/Home.jsx` (ecossistema: CTAs para PKZ, One To One e Fisioterapia; substituiu o portal do halter, que foi removido e continua no histórico do Git) |
| `pages/pkz.html` | `/pkz` | `pages/PaginaPkz.jsx` |
| `pages/pkz-aula-experimental.html` | `/pkz/aula-experimental` | `pages/AulaExperimental.jsx` (`marca="pkz"`) |
| `pages/one-to-one.html` | `/one-to-one` | `pages/PaginaOneToOne.jsx` |
| `pages/one-to-one-aula-experimental.html` | `/one-to-one/aula-experimental` | `pages/AulaExperimental.jsx` (`marca="oto"`) |
| `pages/privacidade.html` | `/privacidade` | `pages/Privacidade.jsx` |
| (novo) | `/fisioterapia` | `pages/PaginaFisio.jsx` (marca independente, sem aula experimental) |
| `404.html` | qualquer outra (`*`) | `pages/NaoEncontrada.jsx` |

## Estrutura

```
.
├── index.html                      O ÚNICO HTML do projeto (o React desenha tudo dentro de <div id="root">)
├── vite.config.js                  Configuração do Vite e nome do repositório (base do GitHub Pages)
├── package.json                    Dependências e scripts (dev, build, preview)
├── public/assets/                  Imagens, logos e favicon (os mesmos do Vanilla)
├── .github/workflows/deploy.yml    Publicação automática no GitHub Pages
└── src/
    ├── main.jsx                    Ponto de entrada: <BrowserRouter> em volta do <App />
    ├── App.jsx                     <Routes> e <Route>: qual componente aparece em cada endereço
    ├── data/
    │   └── marcas.js               Dados das marcas: nome, WhatsApp, horários, endereço, textos (era o js/data.js)
    ├── pages/                      Uma "página" = um componente
    │   ├── Portal.jsx
    │   ├── PaginaPkz.jsx
    │   ├── PaginaOneToOne.jsx
    │   ├── AulaExperimental.jsx
    │   ├── Privacidade.jsx
    │   └── NaoEncontrada.jsx
    ├── components/
    │   ├── LinkInterno.jsx         <Link> do React Router que também rola a tela (topo ou seção)
    │   ├── EstilosDaPagina.jsx     Aplica o CSS de cada página só enquanto ela está na tela (ver abaixo)
    │   ├── Icones.jsx              Ícones SVG reutilizados
    │   ├── marca/                  Blocos comuns às duas marcas
    │   │   ├── LayoutMarca.jsx     Moldura: cabeçalho + <main> + rodapé + janela de contato + atalhos
    │   │   ├── Cabecalho.jsx       Menu hambúrguer (useState)
    │   │   ├── Rodape.jsx
    │   │   ├── ContatoModal.jsx    Janela "Fale Conosco" (useState + <dialog>)
    │   │   ├── Hero.jsx
    │   │   ├── Sobre.jsx
    │   │   ├── Faq.jsx
    │   │   ├── FaixaCta.jsx
    │   │   ├── Localizacao.jsx     Mapa que só carrega no clique (useState)
    │   │   ├── ConhecaTambem.jsx
    │   │   ├── BarraAcoesMobile.jsx
    │   │   ├── AtalhosFlutuantes.jsx
    │   │   └── BotaoWhatsapp.jsx
    │   ├── pkz/                    Seções só da PKZ
    │   │   ├── SecaoFamilia.jsx
    │   │   └── SecaoEsportes.jsx
    │   ├── one-to-one/             Seções só da One To One
    │   │   └── SecaoServicos.jsx
    │   ├── agendamento/            Sistema de agendamento (lógica do professor, agora com estado)
    │   │   ├── Agenda.jsx          Botões de dia e horários
    │   │   └── AgendamentoModal.jsx Formulário com validação e envio pelo WhatsApp
    │   └── portal/                 Portal com o halter arrastável
    │       ├── BarraHalter.jsx
    │       ├── DesenhoHalter.jsx
    │       ├── Apresentacao.jsx
    │       ├── PainelMarca.jsx
    │       ├── SetasDaBorda.jsx
    │       ├── AvisoRedirecionamento.jsx
    │       ├── RodapePortal.jsx
    │       └── constantes.js
    ├── utils/
    │   ├── agendamento.js          Validação de CPF, máscaras e link do WhatsApp
    │   ├── asset.js                Caminho das imagens (considera o nome do repositório)
    │   ├── dialogo.js              Abre o <dialog> nativo como janela modal
    │   └── navegacao.js            Rolagem para o topo ou para uma seção
    └── styles/                     CSS do Vanilla (base, pkz, one-to-one, cta, extras, portal, legal) + global.css
```

## Como executar

Precisa do [Node.js](https://nodejs.org/) 20.19 ou mais novo.

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # abre o servidor de desenvolvimento (o terminal mostra o endereço)
npm run build    # gera a versão de produção na pasta dist/
npm run preview  # testa a versão de produção localmente
```

## Publicação no GitHub Pages

1. Em `vite.config.js`, `NOME_DO_REPO` precisa ser o nome do repositório (hoje: `PFE-2026-2-Grupo-1-React`).
2. No GitHub: **Settings → Pages → Source: GitHub Actions**.
3. A cada push na `main`, o workflow `.github/workflows/deploy.yml` gera o build e publica.

O build copia o `index.html` para `404.html`. Assim, quem abre direto um endereço como `/pkz`
recebe o app, e o React Router mostra a página certa (o GitHub Pages não conhece as rotas do React).

## Observações técnicas

* **CSS das duas marcas:** as marcas usam os mesmos nomes de classe e de variável com valores diferentes.
  Num app React todo CSS importado do jeito comum vale para o site inteiro, então cada página importa
  o seu CSS com `?inline` e o componente `EstilosDaPagina` o aplica só enquanto a página está na tela.
  Por isso os arquivos de `src/styles/` são praticamente os mesmos do Vanilla.
* **`display: contents`:** o `#root` e o invólucro de cada página não geram caixa (ver `global.css`),
  então o layout continua igual ao Vanilla, onde `<header>`, `<main>` e `<footer>` eram filhos do `<body>`.
* **Janelas (`<dialog>`):** a janela só é renderizada quando está aberta, e o `ref={abrirComoModal}`
  chama `showModal()`, que dá o fundo escuro, o foco preso e o fechamento com Esc.
* **Links para seções** (Sobre, Localização): `LinkInterno` com a prop `secao` troca de rota, se for
  preciso, e rola até a seção.
* **WhatsApp:** o número `5521000000000` é de exemplo. Troque em `src/data/marcas.js` (uma vez por marca).
* **Política de privacidade:** é um modelo; revisar com o responsável legal antes de publicar.

### Próximos passos (quando virmos `useEffect`)

No Vanilla, alguns comportamentos dependiam de "ouvir" a janela (scroll, IntersectionObserver).
Isso, no React, pede `useEffect`, que ainda não foi dado. Por enquanto:

* **Voltar ao topo:** aparece com a rolagem via CSS (`animation-timeline`, em `global.css`); nos
  navegadores sem suporte fica sempre visível. Com `useEffect`, dá para voltar ao listener de scroll.
* **Destaque da seção atual no menu** e **seções que aparecem ao rolar:** ainda não foram portados.
* **Rolar para o topo ao trocar de página:** hoje é feito no clique do `LinkInterno`; com `useEffect`
  pode virar um componente `ScrollToTop`.

## Nossa equipe

* Alexia Schmid
* Bernardo Gomes
* Bernardo Nemirovsky
* Enzo Trotto
* Gabriel Góis
* Guilherme Macedo
* João Pedro Ferreira

## Disciplina

- **Curso/Disciplina:** Projeto Front-end (turma de terça-feira)
- **Professor:** Thiago Marcondes Santos
- **Instituição:** IBMEC
- **Semestre:** 2026.2

## Testes

```bash
npm test
```

Roda `src/data/seo.test.js` (Node, sem dependências): confere o `<head>` gerado por rota (canonical, `noindex` da 404, JSON-LD, tamanho das descrições).

## Imagens

As fotos em `public/assets/img/` existem em quatro larguras (480, 800, 1280 e 1920 px; `srcsetDe` em `src/utils/asset.js` monta o `srcset`). As de `img/portal/` só servem de imagem de compartilhamento (og:image) e existem só em 1280 px.

## SEO, segurança e publicação

No `npm run build` o `vite.config.js` gera um `index.html` por rota (`dist/pkz/`, `dist/fisioterapia/`...) com título, descrição, Open Graph e dados estruturados da página (fonte única: `src/data/seo.js`), mais `robots.txt`, `404.html` (noindex) e a política de conteúdo (CSP) em `<meta>`.

Para gerar também `sitemap.xml`, canonical e `og:image` (precisam do endereço público), defina o endereço antes do build:

```bash
VITE_SITE_URL=https://usuario.github.io npm run build
```

Sem a variável o build funciona, só omite essas quatro peças.

### Segurança: o que está feito e o que a hospedagem não permite
- Sem segredos no código, sem `innerHTML`/`dangerouslySetInnerHTML`, `npm audit` sem vulnerabilidades, links externos com `rel="noopener noreferrer"`.
- **Agendamento:** a mensagem do WhatsApp (que vai na URL do `wa.me` e fica no histórico do navegador) mostra o CPF mascarado (`***.***.***-12`). O formulário continua validando o CPF completo. O telefone segue na mensagem.
- **CSP e `Referrer-Policy` por `<meta>`** (só no build). O GitHub Pages não deixa configurar cabeçalhos HTTP, então `X-Content-Type-Options`, `Strict-Transport-Security` e `frame-ancestors` não dá para aplicar aqui; HTTPS o próprio GitHub Pages já força.
- **Terceiros que carregam:** Google Fonts (CSS e arquivos de fonte) e, só ao clicar em "Ver mapa", o mapa do Google. O CSS do Google Fonts não aceita SRI. Para eliminar esse terceiro, o caminho é hospedar as fontes no próprio site (pacotes `@fontsource`).

