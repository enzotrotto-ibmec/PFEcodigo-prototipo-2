// Fonte única de título, descrição e dados estruturados de cada página.
//
// É usada em dois lugares:
//  - nas páginas (src/pages/*), que usam o título na aba do navegador;
//  - no vite.config.js, que no build gera um HTML por rota (dist/pkz/index.html, etc.) com o
//    <head> certo. Assim robôs e prévias de link (WhatsApp, Instagram) que NÃO executam JavaScript
//    já recebem título, descrição e Open Graph da página correta, e o GitHub Pages responde 200.
//
// Este arquivo roda no navegador E no Node (vite.config.js), então não pode usar import.meta.env
// nem process.env: o endereço do site (SITE_URL) entra como parâmetro de montarHead().
import { MARCAS } from "./marcas.js";

const NOME_SITE = "PKZ Lab & Studio One To One";

export const ROTAS = {
  "/": {
    titulo: "PKZ Lab, One To One e Fisioterapia | Barra da Tijuca, RJ",
    descricao:
      "PKZ Lab (treino de alto rendimento), Studio One To One (personal training e nutrição) e Fisioterapia no mesmo endereço, na Barra da Tijuca, Rio de Janeiro.",
    imagem: "img/portal/LandingPKZ-1280.webp",
    marcas: ["pkz", "oto", "fisio"], // dados estruturados das três, no mesmo endereço
  },
  "/pkz": {
    titulo: "PKZ Lab | Treino de alto rendimento na Barra da Tijuca",
    descricao:
      "PKZ Lab: treino esportivo de alto rendimento para todas as idades na Barra da Tijuca. Karatê, jiu-jitsu, vôlei e mais. Agende sua aula experimental.",
    imagem: "img/portal/LandingPKZ-1280.webp",
    marca: "pkz",
  },
  "/pkz/aula-experimental": {
    titulo: "Aula Experimental | PKZ Lab",
    descricao:
      "Escolha o dia e o horário da sua aula experimental no PKZ Lab, na Barra da Tijuca, e envie o pedido pelo WhatsApp.",
    imagem: "img/portal/LandingPKZ-1280.webp",
  },
  "/one-to-one": {
    titulo: "Studio One To One | Personal Training na Barra da Tijuca",
    descricao:
      "Studio One To One: personal training, fisioterapia e nutrição com atendimento individual na Barra da Tijuca. Agende sua aula experimental pelo WhatsApp.",
    imagem: "img/portal/LandingOneToOne-1280.webp",
    marca: "oto",
  },
  "/one-to-one/aula-experimental": {
    titulo: "Aula Experimental | Studio One To One",
    descricao:
      "Escolha o dia e o horário da sua aula experimental no Studio One To One, na Barra da Tijuca, e envie o pedido pelo WhatsApp.",
    imagem: "img/portal/LandingOneToOne-1280.webp",
  },
  "/fisioterapia": {
    titulo: "Fisioterapia | Reabilitação e movimento na Barra da Tijuca",
    descricao:
      "Fisioterapia na Barra da Tijuca: reabilitação ortopédica, pós-operatório, prevenção de lesões e pilates clínico com atendimento individual. Agende no WhatsApp.",
    imagem: "img/fisio/equipe-1280.webp",
    marca: "fisio",
  },
  "/privacidade": {
    titulo: "Política de Privacidade | PKZ Lab e Studio One To One",
    descricao:
      "Como o PKZ Lab e o Studio One To One tratam os dados informados no agendamento de aula experimental e no contato pelo WhatsApp.",
    imagem: "img/portal/LandingPKZ-1280.webp",
  },
};

export const NAO_ENCONTRADA = {
  titulo: "Página não encontrada | PKZ Lab e Studio One To One",
  descricao: "O endereço pode estar errado ou a página mudou de lugar.",
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Dados estruturados (JSON-LD) do negócio, montados a partir de data/marcas.js. Só entra o que é
// real: sem telefone (o número do WhatsApp ainda é provisório), sem horário de funcionamento.
// urlDe(rota) e imagemDe(rota) devolvem o endereço absoluto (ou null, sem VITE_SITE_URL).
function dadosDaMarca(id, urlDe, imagemDe) {
  const marca = MARCAS[id];
  const dados = {
    "@type": id === "fisio" ? "Physiotherapy" : "SportsActivityLocation",
    name: marca.nome,
    description: ROTAS[marca.rota].descricao,
    address: {
      "@type": "PostalAddress",
      streetAddress: marca.endereco.rua.replace(" — ", ", "),
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
  };
  if (urlDe) dados.url = urlDe(marca.rota);
  const imagem = imagemDe(marca.rota);
  if (imagem) dados.image = imagem;
  if (marca.instagram) dados.sameAs = [marca.instagram.url];
  return dados;
}

// Página de uma marca: um negócio. Home (campo "marcas"): as três no mesmo endereço, em @graph.
function schemaDaPagina(pagina, urlDe, imagemDe) {
  const base = { "@context": "https://schema.org" };
  const dados = pagina.marca
    ? { ...base, ...dadosDaMarca(pagina.marca, urlDe, imagemDe) }
    : { ...base, "@graph": pagina.marcas.map((id) => dadosDaMarca(id, urlDe, imagemDe)) };
  // "<" escapado: o JSON vai dentro de um <script> e nunca pode fechar a tag
  return JSON.stringify(dados).replace(/</g, "\u003c");
}

// Devolve o bloco de <head> (título, descrição, Open Graph, Twitter, canonical e JSON-LD) de uma rota.
// site: "https://usuario.github.io" (vazio = ainda sem endereço público: omite canonical, og:url e imagens).
// base: "/NOME-DO-REPO/".
export function montarHead(rota, { site = "", base = "/" } = {}) {
  const naoEncontrada = rota === "404";
  const pagina = naoEncontrada ? NAO_ENCONTRADA : ROTAS[rota];
  const urlDe = site ? (r) => `${site}${base}${r === "/" ? "" : `${r.slice(1)}/`}` : null;
  const imagemUrl = site && pagina.imagem ? `${site}${base}assets/${pagina.imagem}` : null;

  const linhas = [
    `<title>${esc(pagina.titulo)}</title>`,
    `<meta name="description" content="${esc(pagina.descricao)}" />`,
  ];
  if (naoEncontrada) linhas.push('<meta name="robots" content="noindex" />');
  linhas.push(
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="pt_BR" />',
    `<meta property="og:site_name" content="${esc(NOME_SITE)}" />`,
    `<meta property="og:title" content="${esc(pagina.titulo)}" />`,
    `<meta property="og:description" content="${esc(pagina.descricao)}" />`,
    `<meta name="twitter:card" content="${imagemUrl ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${esc(pagina.titulo)}" />`,
    `<meta name="twitter:description" content="${esc(pagina.descricao)}" />`,
  );
  if (urlDe && !naoEncontrada) {
    linhas.push(`<link rel="canonical" href="${urlDe(rota)}" />`, `<meta property="og:url" content="${urlDe(rota)}" />`);
  }
  if (imagemUrl) {
    linhas.push(`<meta property="og:image" content="${imagemUrl}" />`, `<meta name="twitter:image" content="${imagemUrl}" />`);
  }
  if (pagina.marca || pagina.marcas) {
    const imagemDe = (r) => (site && ROTAS[r].imagem ? `${site}${base}assets/${ROTAS[r].imagem}` : null);
    linhas.push(`<script type="application/ld+json">${schemaDaPagina(pagina, urlDe, imagemDe)}</script>`);
  }
  return linhas.join("\n    ");
}
