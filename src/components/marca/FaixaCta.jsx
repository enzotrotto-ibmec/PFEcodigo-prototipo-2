import LinkInterno from "../LinkInterno.jsx";
import BotaoWhatsapp from "./BotaoWhatsapp.jsx";

// Faixa de conversão: título + "Agendar aula" + WhatsApp. Props: marca
export default function FaixaCta({ marca }) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="cta-band-text">
        <h2 id="cta-band-title">{marca.ctaBand.titulo}</h2>
        <p className="cta-band-sub">Escolha o melhor horário e fale com a equipe.</p>
      </div>
      <div className="cta-band-actions">
        <LinkInterno to={`${marca.rota}/aula-experimental`} className="btn cta-btn cta-btn-primary">
          Agendar aula
        </LinkInterno>
        <BotaoWhatsapp marca={marca} />
      </div>
    </section>
  );
}
