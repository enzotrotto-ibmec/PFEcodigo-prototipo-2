import { Link } from "react-router-dom";
import { irParaTopo, rolarParaSecao } from "../utils/navegacao.js";

// <Link> do React Router com rolagem: usado em TODA navegação interna do site
// (no React não usamos <a href> para trocar de página, só para links externos).
//
// Props:
//   to     → rota de destino (ex.: "/pkz")
//   secao  → opcional: id de uma seção da página de destino (ex.: "sobre"); a tela rola até ela
//   o resto (className, aria-label, children, onClick...) vai direto para o <Link>
export default function LinkInterno({ to, secao, onClick, ...resto }) {
  function aoClicar(evento) {
    if (onClick) onClick(evento);
    // Ctrl/Cmd/Shift + clique abre em outra aba: não mexe na rolagem desta
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) return;
    if (secao) rolarParaSecao(secao);
    else irParaTopo();
  }

  return <Link to={secao ? `${to}#${secao}` : to} onClick={aoClicar} {...resto} />;
}
