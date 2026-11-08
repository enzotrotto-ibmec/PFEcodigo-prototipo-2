import { asset } from "../../utils/asset.js";

// Tela cheia "redirecionando..." com o logo da marca escolhida e o botão Cancelar.
// Só é renderizada enquanto o redirecionamento está em andamento.
//
// Props:
//   destino    → { nome, fundo, logo } (portal/constantes.js)
//   marca      → "pkz" ou "oto" (o CSS usa #redir[data-marca] para dimensionar o logo)
//   onCancelar → função
export default function AvisoRedirecionamento({ destino, marca, onCancelar }) {
  return (
    <div
      id="redir"
      className="on"
      data-marca={marca}
      role="dialog"
      aria-modal="true"
      aria-labelledby="redir-name"
      aria-describedby="redir-sub"
      style={{ background: destino.fundo, color: "#ffffff" }}
      onKeyDown={(e) => e.key === "Escape" && onCancelar()}
    >
      <h2 id="redir-name">
        <img id="redir-logo" src={asset(destino.logo)} alt="" />
        <span className="visually-hidden">{destino.nome}</span>
      </h2>
      <small id="redir-sub">redirecionando...</small>
      {/* autoFocus: o foco vai para o Cancelar assim que o aviso aparece */}
      <button type="button" id="redir-cancel" onClick={onCancelar} autoFocus>
        Cancelar
      </button>
    </div>
  );
}
