import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { montarHead, ROTAS } from "./src/data/seo.js";

// Nome do repositório no GitHub Pages (o site fica em usuario.github.io/NOME-DO-REPO/).
// Se o repositório tiver outro nome, troque SÓ esta linha: o BrowserRouter (main.jsx)
// e as imagens (utils/asset.js) leem esse valor via import.meta.env.BASE_URL.
const NOME_DO_REPO = "PFE-2026-2-Grupo-1-React";

// Política de conteúdo (CSP) do site publicado. O GitHub Pages não deixa configurar cabeçalhos
// HTTP, então vai numa <meta>. Só no build: o servidor de desenvolvimento precisa de scripts inline.
// - style-src 'unsafe-inline': o app injeta <style> por página e o GSAP escreve estilos inline.
// - frame-src google: o mapa de "Nossa Localização". fonts: Google Fonts.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "frame-src https://*.google.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

// Pós-build para GitHub Pages (que não conhece as rotas do React):
// 1. gera um index.html por rota (dist/pkz/index.html...), com o <head> certo, para a URL
//    responder 200 e robôs/prévias de link sem JavaScript lerem título e descrição da página;
// 2. 404.html: o app carrega e o React Router decide (com noindex);
// 3. robots.txt e, se VITE_SITE_URL estiver definido, sitemap.xml.
//    Ex.: VITE_SITE_URL=https://usuario.github.io npm run build
function paginasParaGithubPages() {
  let base = "/";
  return {
    name: "paginas-para-github-pages",
    apply: "build",
    configResolved(config) {
      base = config.base;
    },
    closeBundle() {
      const site = (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
      const modelo = readFileSync(resolve("dist/index.html"), "utf8");
      const comHead = (rota) =>
        modelo
          .replace("<head>", () => `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`)
          .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${montarHead(rota, { site, base })}\n    <!--/seo-->`);

      for (const rota of Object.keys(ROTAS)) {
        const pasta = rota === "/" ? "dist" : `dist${rota}`;
        mkdirSync(resolve(pasta), { recursive: true });
        writeFileSync(resolve(pasta, "index.html"), comHead(rota));
      }
      writeFileSync(resolve("dist/404.html"), comHead("404"));

      const sitemapLinha = site ? `\nSitemap: ${site}${base}sitemap.xml` : "";
      writeFileSync(resolve("dist/robots.txt"), `User-agent: *\nAllow: /${sitemapLinha}\n`);
      if (site) {
        const urls = Object.keys(ROTAS)
          .filter((r) => !r.endsWith("/aula-experimental")) // formulários, sem conteúdo próprio
          .map((r) => `  <url><loc>${site}${base}${r === "/" ? "" : `${r.slice(1)}/`}</loc></url>`)
          .join("\n");
        writeFileSync(
          resolve("dist/sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
      }
    },
  };
}

export default defineConfig({
  base: `/${NOME_DO_REPO}/`,
  plugins: [react(), paginasParaGithubPages()],
});
