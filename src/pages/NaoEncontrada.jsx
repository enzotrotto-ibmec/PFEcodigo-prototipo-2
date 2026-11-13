import EstilosDaPagina from "../components/EstilosDaPagina.jsx";
import LinkInterno from "../components/LinkInterno.jsx";
import legalCss from "../styles/legal.css?inline";
import { NAO_ENCONTRADA } from "../data/seo.js";

// Página 404 (rota "*": qualquer endereço que não bate com as outras rotas). Era o 404.html.
// No vanilla ela precisava de <base href> para os caminhos não quebrarem; com o React Router não precisa.
export default function NaoEncontrada() {
  return (
    <div className="pagina">
      <title>{NAO_ENCONTRADA.titulo}</title>
      <meta name="robots" content="noindex" />
      <meta name="theme-color" content="#0e1116" />
      <EstilosDaPagina folhas={[legalCss]} />

      <main id="main" className="legal-main not-found" tabIndex={-1}>
        <h1>Página não encontrada</h1>
        <p>O endereço pode estar errado ou a página mudou de lugar. Escolha uma das unidades para continuar.</p>
        <div className="btn-row">
          <LinkInterno className="btn" to="/pkz">
            PKZ Lab
          </LinkInterno>
          <LinkInterno className="btn" to="/one-to-one">
            Studio One To One
          </LinkInterno>
        </div>
        <p>
          <LinkInterno to="/">Ir para a página inicial</LinkInterno>
        </p>
      </main>
    </div>
  );
}
