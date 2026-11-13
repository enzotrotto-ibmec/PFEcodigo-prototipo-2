import LinkInterno from "../LinkInterno.jsx";
import BotaoWhatsapp from "./BotaoWhatsapp.jsx";

// Barra fixa no rodapé do celular: "Agendar aula" + WhatsApp (some no desktop, ver cta.css).
// Props: marca
export default function BarraAcoesMobile({ marca }) {
  return (
    <nav className="mobile-cta" aria-label="Ações rápidas">
      {marca.agendamento !== false && (
        <LinkInterno to={`${marca.rota}/aula-experimental`} className="btn cta-btn cta-btn-primary">
          Agendar aula
        </LinkInterno>
      )}
      <BotaoWhatsapp marca={marca} primario={marca.agendamento === false} />
    </nav>
  );
}
