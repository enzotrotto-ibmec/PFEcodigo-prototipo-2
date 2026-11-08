import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Nome do repositório no GitHub Pages (o site fica em usuario.github.io/NOME-DO-REPO/).
// Se o repositório tiver outro nome, troque SÓ esta linha: o BrowserRouter (main.jsx)
// e as imagens (utils/asset.js) leem esse valor via import.meta.env.BASE_URL.
const NOME_DO_REPO = "PFE-2026-2-Grupo-1-React";

// O GitHub Pages não conhece as rotas do React: ao abrir direto /pkz, ele procuraria
// um arquivo pkz.html e mostraria o 404 dele. Copiando o index.html para 404.html,
// o "404" carrega o próprio app e o React Router mostra a página certa.
function copiar404() {
  return {
    name: "copiar-index-para-404",
    closeBundle() {
      copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"));
    },
  };
}

export default defineConfig({
  base: `/${NOME_DO_REPO}/`,
  plugins: [react(), copiar404()],
});
