import { IconeTraco } from "../Icones.jsx";
import { asset, srcsetDe } from "../../utils/asset.js";

// Seção exclusiva da Fisioterapia: tratamentos oferecidos + "como funciona o atendimento".
// PROVISÓRIO: textos de exemplo, trocar pelos reais quando a equipe enviar.

const TRATAMENTOS = [
  {
    tag: "Ortopedia",
    titulo: "Reabilitação ortopédica",
    texto: "Recuperação de articulações, músculos e tendões com plano de exercícios progressivo.",
    icone: <path d="M3 12h4l3-8 4 16 3-8h4" />,
  },
  {
    tag: "Recuperação",
    titulo: "Pós-operatório",
    texto: "Acompanhamento seguro depois de cirurgias, respeitando cada fase da cicatrização.",
    icone: (
      <>
        <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
      </>
    ),
  },
  {
    tag: "Prevenção",
    titulo: "Prevenção de lesões",
    texto: "Avaliação do movimento e fortalecimento para treinar com mais segurança.",
    icone: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />,
  },
  {
    tag: "Movimento",
    titulo: "Pilates clínico",
    texto: "Controle postural, mobilidade e consciência corporal com orientação individual.",
    icone: (
      <>
        <circle cx="12" cy="5" r="2" />
        <path d="M5 21l4-8 3 3 3-3 4 8M9 13l3-5 3 5" />
      </>
    ),
  },
];

const ETAPAS = [
  { titulo: "Avaliação", texto: "Conversamos sobre seu histórico e analisamos postura, força e mobilidade." },
  { titulo: "Plano individual", texto: "Definimos objetivos e a frequência de sessões que fazem sentido para você." },
  { titulo: "Sessões acompanhadas", texto: "Terapia manual e exercícios guiados, com ajustes a cada evolução." },
  { titulo: "Alta e manutenção", texto: "Você sai com orientações para manter os resultados no dia a dia." },
];

export default function SecaoTratamentos() {
  return (
    <section id="tratamentos" className="fisio-section">
      <h2>Cuidado para cada fase</h2>
      <p className="fisio-subtitle">
        Tratamentos individualizados para recuperar o movimento e voltar à rotina com confiança.
      </p>

      <div className="card-grid">
        {TRATAMENTOS.map((t) => (
          <article className="fisio-card" key={t.titulo}>
            <span className="fisio-icone" aria-hidden="true">
              <IconeTraco tamanho={26}>{t.icone}</IconeTraco>
            </span>
            <span className="service-tag">{t.tag}</span>
            <h3>{t.titulo}</h3>
            <p>{t.texto}</p>
          </article>
        ))}
      </div>

      <div className="fisio-etapas">
        <div className="fisio-etapas-texto">
          <h3>Como funciona o atendimento</h3>
          <div className="fisio-lista-wrap">
            <span className="fisio-linha" aria-hidden="true">
              <span className="fisio-linha-fill"></span>
            </span>
            <ol className="fisio-lista">
              {ETAPAS.map((e, i) => (
                <li key={e.titulo}>
                  <span className="fisio-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <strong>{e.titulo}</strong>
                    <p>{e.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="fisio-etapas-img">
          <img
            src={asset("img/fisio/atendimento-800.webp")}
            srcSet={srcsetDe("img/fisio/atendimento")}
            sizes="(max-width: 860px) calc(100vw - 48px), 520px"
            alt="Fisioterapeuta orientando um exercício durante o atendimento"
            width="2000"
            height="1116"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
