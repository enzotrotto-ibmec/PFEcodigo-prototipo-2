import LinkInterno from "../LinkInterno.jsx";
import { MARCAS, outraMarca } from "../../data/marcas.js";

// Cards "Conheça também", que levam para as outras marcas.
// Props: marca (a marca DESTA página), texto (descrição da outra marca principal).
// PKZ e One To One mostram também um card da Fisioterapia (descrição em MARCAS.fisio.resumo).
export default function ConhecaTambem({ marca, texto }) {
  const outra = outraMarca(marca.id);
  const cards = [{ destino: outra, texto }];
  if (marca.id !== "fisio") cards.push({ destino: MARCAS.fisio, texto: MARCAS.fisio.resumo });

  return (
    <section className="cross-brand-section">
      {cards.map(({ destino, texto: descricao }) => (
        <div className="cross-brand-card" key={destino.id}>
          <div className="cross-brand-text">
            <span className="section-tag">Conheça Também</span>
            <h3>{destino.nome}</h3>
            <p>{descricao}</p>
          </div>
          <LinkInterno to={destino.rota} className="btn btn-primary">
            Visitar {destino.nome}
          </LinkInterno>
        </div>
      ))}
    </section>
  );
}
