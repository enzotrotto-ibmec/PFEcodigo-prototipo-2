import { IconeTraco } from "../Icones.jsx";

// "Para Pais e Responsáveis" (exclusiva da PKZ): quatro cards de confiança.
// Os cards vêm de uma lista e são desenhados com .map(): para mudar um texto, mexa só na lista.
const CARDS = [
  {
    titulo: "Profissionais Qualificados",
    texto: "Equipe formada em Educação Física, com registro no CREF e especialização em treinamento infantojuvenil.",
    icone: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    titulo: "Metodologia Acadêmica",
    texto: "Treinos planejados por faixa etária e fase de desenvolvimento motor, seguindo protocolos reconhecidos cientificamente.",
    icone: (
      <>
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </>
    ),
  },
  {
    titulo: "Ambiente Supervisionado",
    texto: "Supervisão constante durante toda a atividade, em espaço estruturado com equipamentos adequados para cada idade.",
    icone: (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    titulo: "Comunicação com a Família",
    texto: "Retorno periódico sobre a evolução do atleta, para que os responsáveis acompanhem de perto cada conquista.",
    icone: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    ),
  },
];

export default function SecaoFamilia() {
  return (
    <section id="familia" className="family-trust-section">
      <span className="section-tag">Para Pais e Responsáveis</span>
      <h2>Seu Filho em Mãos Preparadas</h2>
      <p className="trust-intro">
        Sabemos que confiar o treino do seu filho a outra pessoa não é uma decisão pequena. Por isso,
        a PKZ é estruturada especificamente para atender crianças e adolescentes, com metodologia
        acadêmica, profissionais qualificados e acompanhamento próximo em cada etapa.
      </p>

      <div className="trust-grid">
        {CARDS.map((card) => (
          <CardConfianca key={card.titulo} titulo={card.titulo} texto={card.texto} icone={card.icone} />
        ))}
      </div>
    </section>
  );
}

// Um card da grade. Props: titulo, texto, icone (desenho SVG)
function CardConfianca({ titulo, texto, icone }) {
  return (
    <div className="trust-card">
      <span className="trust-icon">
        <IconeTraco tamanho={22}>{icone}</IconeTraco>
      </span>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}
