import { IconeWhatsapp } from "../Icones.jsx";
import { linkWhatsapp } from "../../utils/agendamento.js";

// Botão "WhatsApp" (link externo para o wa.me). Aparece na faixa de CTA e na barra fixa do celular.
// Props: marca
export default function BotaoWhatsapp({ marca }) {
  return (
    <a
      href={linkWhatsapp(marca.whatsapp)}
      className="btn cta-btn cta-btn-secondary"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp: falar com a equipe (abre em nova aba)"
    >
      <IconeWhatsapp className="cta-icon" />
      WhatsApp
    </a>
  );
}
