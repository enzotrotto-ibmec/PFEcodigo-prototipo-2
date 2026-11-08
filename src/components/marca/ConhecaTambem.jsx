import LinkInterno from "../LinkInterno.jsx";
import { outraMarca } from "../../data/marcas.js";

// Card "Conheça também", que leva para a outra marca.
// Props: marca (a marca DESTA página), texto (descrição da outra marca)
export default function ConhecaTambem({ marca, texto }) {
  const outra = outraMarca(marca.id);
  return (
    <section className="cross-brand-section">
      <div className="cross-brand-card">
        <div className="cross-brand-text">
          <span className="section-tag">Conheça Também</span>
          <h3>{outra.nome}</h3>
          <p>{texto}</p>
        </div>
        <LinkInterno to={outra.rota} className="btn btn-primary">
          Visitar {outra.nome}
        </LinkInterno>
      </div>
    </section>
  );
}
