// Testes do <head> gerado por rota. Rodam com o Node, sem instalar nada: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { montarHead, ROTAS } from "./seo.js";

const SITE = { site: "https://exemplo.github.io", base: "/repo/" };

test("sem endereço público: não inventa canonical, og:url nem imagem", () => {
  const head = montarHead("/pkz", { base: "/repo/" });
  assert.match(head, /<title>PKZ Lab/);
  assert.match(head, /name="description"/);
  assert.doesNotMatch(head, /canonical|og:url|og:image/);
});

test("com endereço público: canonical, og:url e og:image absolutos", () => {
  const head = montarHead("/pkz", SITE);
  assert.match(head, /<link rel="canonical" href="https:\/\/exemplo\.github\.io\/repo\/pkz\/" \/>/);
  assert.match(head, /og:image" content="https:\/\/exemplo\.github\.io\/repo\/assets\/img\//);
});

test("a home aponta para a raiz do site, sem 'undefined' nem barra dupla", () => {
  assert.match(montarHead("/", SITE), /href="https:\/\/exemplo\.github\.io\/repo\/" \/>/);
});

test("a página 404 não é indexada", () => {
  assert.match(montarHead("404", SITE), /name="robots" content="noindex"/);
});

test("a home descreve as três marcas no mesmo endereço (@graph), cada uma com a sua página", () => {
  const json = montarHead("/", SITE).match(/ld\+json">(.*)<\/script>/)[1];
  const grafo = JSON.parse(json)["@graph"];
  assert.deepEqual(grafo.map((n) => n.name), ["PKZ Lab", "Studio One To One", "Fisioterapia"]);
  assert.match(grafo[2].url, /\/repo\/fisioterapia\/$/);
  assert.equal(new Set(grafo.map((n) => n.address.streetAddress)).size, 1);
});

test("só as páginas das marcas e a home levam JSON-LD, sem '<' solto dentro do script", () => {
  assert.match(montarHead("/fisioterapia", SITE), /"@type":"Physiotherapy"/);
  assert.doesNotMatch(montarHead("/privacidade", SITE), /ld\+json/);
  for (const rota of Object.keys(ROTAS)) {
    const json = montarHead(rota, SITE).match(/ld\+json">(.*)<\/script>/)?.[1];
    if (json) assert.doesNotMatch(json, /</);
  }
});

test("toda descrição cabe no resultado do Google (até 160 caracteres)", () => {
  for (const [rota, pagina] of Object.entries(ROTAS)) {
    assert.ok(pagina.descricao.length <= 160, `${rota}: ${pagina.descricao.length} caracteres`);
  }
});
