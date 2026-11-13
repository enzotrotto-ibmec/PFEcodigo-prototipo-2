import { IconeWhatsapp } from "../Icones.jsx";
import { linkWhatsapp } from "../../utils/agendamento.js";

// Botão "WhatsApp" (link externo para o wa.me). Aparece na faixa de CTA e na barra fixa do celular.
// Props: marca, primario (marca sem agendamento: o WhatsApp vira o botão principal e abre a conversa com a mensagem pronta)
export default function BotaoWhatsapp({ marca, primario = false }) {
  return (
    <a
      href={linkWhatsapp(marca.whatsapp, primario ? marca.contato.mensagem(marca.contato.nomePadrao) : undefined)}
      className={primario ? "btn cta-btn cta-btn-primary" : "btn cta-btn cta-btn-secondary"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp: falar com a equipe (abre em nova aba)"
    >
      <IconeWhatsapp className="cta-icon" />
      WhatsApp
    </a>
  );
}
