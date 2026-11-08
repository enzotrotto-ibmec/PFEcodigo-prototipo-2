import { Link } from "react-router-dom";

// Opacidade do conteúdo do painel: 0 abaixo de 22% de largura, 1 acima de 38%, linear no meio
function opacidadePelaLargura(largura) {
  return Math.max(0, Math.min(1, (largura - 22) / 16));
}

// Um dos dois painéis do portal (PKZ à esquerda, One To One à direita).
//
// Props:
//   id, rotulo   → "pkz"/"oto" e o aria-label da seção
//   largura      → largura do painel em % (vem da posição do halter)
//   tag, titulo, subtitulo, texto → conteúdo
//   rota         → página da marca
//   classeBotao, idBotao → estilo do botão "Quero conhecer"
//   onEntrar     → função chamada no clique do botão (mostra o aviso "redirecionando...")
export default function PainelMarca({
  id,
  rotulo,
  largura,
  tag,
  titulo,
  subtitulo,
  texto,
  rota,
  classeBotao,
  idBotao,
  comLargura = false,
  onEntrar,
}) {
  const opacidade = opacidadePelaLargura(largura);

  function aoClicar(e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; // deixa abrir em nova aba
    e.preventDefault(); // em vez de ir direto, mostra o aviso antes
    onEntrar();
  }

  return (
    // Só o painel da PKZ recebe width: o da One To One ocupa o resto (flex: 1 no CSS)
    <section id={id} aria-label={rotulo} style={comLargura ? { width: `${largura}%` } : undefined}>
      <div className="p-inner" style={{ opacity: opacidade, visibility: opacidade === 0 ? "hidden" : "visible" }}>
        <div className="tag">{tag}</div>
        <div className="title-box">
          <h2>{titulo}</h2>
          {subtitulo && <div className="sub">{subtitulo}</div>}
        </div>
        <p>{texto}</p>
        <Link to={rota} className={`cta-button ${classeBotao}`} id={idBotao} onClick={aoClicar}>
          Quero conhecer
        </Link>
      </div>
    </section>
  );
}
