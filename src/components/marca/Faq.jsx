import { asset } from "../../utils/asset.js";

// Perguntas frequentes. Cada pergunta é um <details>: o próprio HTML abre e fecha a resposta.
//
// Props:
//   marca → para o logo ao lado do título
//   itens → lista de { pergunta, resposta } (resposta pode ser JSX, com links)
export default function Faq({ marca, itens }) {
  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Perguntas frequentes</h2>
      <img
        className="faq-logo"
        src={asset(marca.logoFaq.src)}
        alt=""
        width={marca.logoFaq.largura}
        height={marca.logoFaq.altura}
        loading="lazy"
      />
      <div className="faq-list">
        {itens.map((item) => (
          <details className="faq-item" key={item.pergunta}>
            <summary>{item.pergunta}</summary>
            <p>{item.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
