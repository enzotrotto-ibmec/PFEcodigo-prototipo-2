import { IconeTraco } from "../Icones.jsx";

// Seção "Sobre" (id="sobre", alvo do link do menu).
//
// Props:
//   tag        → etiqueta acima do título (ex.: "Sobre a PKZ")
//   lead       → parágrafo de abertura (pode ter <strong>, por isso é JSX)
//   children   → demais parágrafos
//   destaques  → lista de { icone, titulo, texto }; icone é o desenho SVG (paths) do ícone
export default function Sobre({ tag, lead, children, destaques }) {
  return (
    <section id="sobre" className="about-section">
      <div className="about-container">
        <div className="about-content-col">
          <span className="section-tag">{tag}</span>
          <h2>Quem somos e o que fazemos</h2>
          <p className="about-lead">{lead}</p>
          {children}
          <div className="about-highlights">
            {/* .map() transforma cada item da lista em um bloco; a key ajuda o React a identificá-los */}
            {destaques.map((destaque) => (
              <div className="highlight-item" key={destaque.titulo}>
                <span className="highlight-icon">
                  <IconeTraco className="highlight-svg">{destaque.icone}</IconeTraco>
                </span>
                <div>
                  <strong>{destaque.titulo}</strong>
                  <p>{destaque.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
