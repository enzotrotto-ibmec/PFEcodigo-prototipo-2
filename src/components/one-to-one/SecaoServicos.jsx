import { asset, srcsetDe } from "../../utils/asset.js";

// "Soluções Exclusivas" (exclusiva da One To One): cards de serviço.
const SERVICOS = [
  {
    imagem: "img/one-to-one/personal-training",
    alt: "Personal Training",
    tag: "Treinamento & Força",
    titulo: "Personal Training",
    texto: "Acompanhamento focado nos seus objetivos, com periodização inteligente e correção postural constante.",
  },
  {
    imagem: "img/one-to-one/fisioterapia",
    alt: "Fisioterapia",
    tag: "Reabilitação & Mobilidade",
    titulo: "Fisioterapia",
    texto: "Reabilitação, prevenção de lesões e restauração da mobilidade funcional.",
  },
  {
    imagem: "img/one-to-one/nutricao",
    alt: "Nutricionista",
    tag: "Nutrição & Metabolismo",
    titulo: "Nutricionista",
    texto: "Consultoria nutricional individualizada e planos desenhados para sua rotina.",
  },
];

export default function SecaoServicos() {
  return (
    <section id="services" className="services-section">
      <h2>Soluções Exclusivas</h2>
      <p className="services-subtitle">
        Programas personalizados desenvolvidos para atender suas metas com máxima precisão e conforto.
      </p>
      <div className="card-grid">
        {SERVICOS.map((servico) => (
          <CardServico key={servico.titulo} {...servico} />
        ))}
      </div>
    </section>
  );
}

// Um card de serviço. Props: imagem (nome base), alt, tag, titulo, texto
function CardServico({ imagem, alt, tag, titulo, texto }) {
  return (
    <article className="service-card">
      <div className="service-img-wrapper">
        <img
          src={asset(`${imagem}-800.webp`)}
          srcSet={srcsetDe(imagem)}
          sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 973px) calc((100vw - 76px) / 2), (max-width: 1000px) calc((100vw - 104px) / 3), 299px"
          alt={alt}
          width="2760"
          height="1504"
          decoding="async"
          loading="lazy"
        />
      </div>
      <div className="service-body">
        <span className="service-tag">{tag}</span>
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </div>
    </article>
  );
}
