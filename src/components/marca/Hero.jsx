import LinkInterno from "../LinkInterno.jsx";
import { asset, srcsetDe } from "../../utils/asset.js";

// Primeira seção da página (título, frase e foto).
//
// Props:
//   titulo, subtitulo → textos
//   id                → id da seção (padrão "home", alvo do logo no cabeçalho)
//   botao             → opcional: { texto, to, comCaixa } (comCaixa: a One To One embrulha o botão em .hero-actions)
//   imagem            → opcional: { base, alt } — base é o nome sem o tamanho, ex.: "img/pkz/EquipePKZ"
export default function Hero({ titulo, subtitulo, id = "home", botao, imagem }) {
  const link = botao && (
    <LinkInterno to={botao.to} className="btn btn-primary">
      {botao.texto}
    </LinkInterno>
  );

  return (
    <section id={id} className="hero-section">
      <div className="hero-content">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        {botao && (botao.comCaixa ? <div className="hero-actions">{link}</div> : link)}
      </div>
      {imagem && (
        <div className="hero-image">
          <img
            src={asset(`${imagem.base}-800.webp`)}
            srcSet={srcsetDe(imagem.base)}
            sizes="(max-width: 860px) calc(100vw - 48px), (max-width: 1128px) calc((100vw - 96px) * 0.535), 526px"
            alt={imagem.alt}
            width="2760"
            height="1504"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      )}
    </section>
  );
}
