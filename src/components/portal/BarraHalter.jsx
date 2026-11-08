import LinkInterno from "../LinkInterno.jsx";
import DesenhoHalter from "./DesenhoHalter.jsx";
import { BORDA } from "./constantes.js";

// Converte a posição do mouse/dedo em porcentagem (0 a 100) ao longo do trilho
function paraPorcentagem(clientX) {
  const trilho = document.getElementById("track").getBoundingClientRect();
  return Math.max(0, Math.min(100, ((clientX - trilho.left) / trilho.width) * 100));
}

// Texto lido por leitores de tela para cada posição do halter
function textoDaPosicao(p) {
  if (p <= BORDA) return "PKZ. Pressione Enter para visitar";
  if (p >= 100 - BORDA) return "One To One. Pressione Enter para visitar";
  if (p < 45) return "Mais perto da PKZ";
  if (p > 55) return "Mais perto da One To One";
  return "Centro";
}

// Barra fixa do topo do portal: rótulos das marcas, dica "arraste e solte" e o halter arrastável.
//
// Props (o estado mora no Portal, que também usa a posição para dimensionar os painéis):
//   posicao      → 0 (ponta da PKZ) a 100 (ponta da One To One)
//   arrastando   → true enquanto o dedo/mouse segura o halter
//   jaUsou       → depois do primeiro uso some a dica e para o "empurrão" do halter
//   onMover      → função(novaPosicao)
//   onComecar    → função() no primeiro toque/tecla
//   onArrastar   → função(true/false)
//   onSoltar     → função(posicaoFinal): perto de uma ponta, abre a marca
export default function BarraHalter({ posicao, arrastando, jaUsou, onMover, onComecar, onArrastar, onSoltar }) {
  const larguraPkz = 100 - posicao;

  // Pointer Events cobrem mouse, toque e caneta (o touch-action: none do CSS evita rolar a página)
  function aoPressionar(e) {
    if (e.button !== 0) return;
    onArrastar(true);
    onComecar();
    e.currentTarget.setPointerCapture(e.pointerId); // continua recebendo o movimento fora do halter
    e.preventDefault();
  }

  function aoMover(e) {
    if (arrastando) onMover(paraPorcentagem(e.clientX));
  }

  function aoSoltar(e) {
    if (!arrastando) return;
    onArrastar(false);
    const final = paraPorcentagem(e.clientX);
    onMover(final);
    onSoltar(final);
  }

  // Teclado: setas/Home/End só movem; Enter/Espaço entram se estiver numa ponta
  function aoTeclar(e) {
    const passo = 5;
    let nova = posicao;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") nova = Math.max(0, posicao - passo);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") nova = Math.min(100, posicao + passo);
    else if (e.key === "Home") nova = 0;
    else if (e.key === "End") nova = 100;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSoltar(posicao);
      return;
    } else return;

    e.preventDefault();
    if (nova !== posicao) {
      onComecar();
      onMover(nova);
    }
  }

  return (
    <header id="bar">
      <div id="drag-hint" style={{ opacity: jaUsou ? 0 : undefined }}>
        <div className="hint-box pkz-box" style={{ width: `${larguraPkz}%` }}>
          <span className="hint-pkz">← arraste e solte</span>
        </div>
        <div className="hint-box oto-box">
          <span className="hint-oto">arraste e solte →</span>
        </div>
      </div>

      <div className="bar-labels">
        <LinkInterno className="bar-label pkz" to="/pkz">
          <span aria-hidden="true">← </span>PKZ
        </LinkInterno>
        <LinkInterno className="bar-label oto" to="/one-to-one">
          ONE TO ONE<span aria-hidden="true"> →</span>
        </LinkInterno>
      </div>

      <p id="handle-help" className="visually-hidden">
        Use as setas para mover. Em uma das pontas, pressione Enter ou Espaço para entrar.
      </p>

      <div id="track-area">
        <div id="track">
          <div id="fill-l" style={{ width: `${larguraPkz}%` }}></div>
          <div id="fill-r" style={{ width: `${posicao}%` }}></div>
        </div>

        <div
          id="handle"
          className={jaUsou ? "used" : undefined}
          style={{ left: `${posicao}%` }}
          role="slider"
          aria-label="Seletor de marcas PKZ e One To One"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(posicao)}
          aria-valuetext={textoDaPosicao(posicao)}
          aria-describedby="handle-help"
          tabIndex={0}
          onPointerDown={aoPressionar}
          onPointerMove={aoMover}
          onPointerUp={aoSoltar}
          onPointerCancel={() => onArrastar(false)}
          onKeyDown={aoTeclar}
        >
          <DesenhoHalter />
        </div>
      </div>
    </header>
  );
}
