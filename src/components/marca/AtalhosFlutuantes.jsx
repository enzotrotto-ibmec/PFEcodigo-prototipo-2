import { IconeSetaCima, IconeWhatsapp } from "../Icones.jsx";
import { linkWhatsapp } from "../../utils/agendamento.js";

// Botões flutuantes: voltar ao topo e (no desktop) WhatsApp.
//
// Props:
//   marca         → objeto da marca
//   comWhatsapp   → mostra o botão redondo do WhatsApp (as páginas de agendamento não têm)
//
// No vanilla o "voltar ao topo" aparecia depois de 300px de rolagem com um listener de scroll.
// Ouvir o scroll da janela num componente pede o hook useEffect, que ainda vamos ver em aula;
// por enquanto quem faz isso é o CSS (animation-timeline em global.css). Ver o README.
export default function AtalhosFlutuantes({ marca, comWhatsapp = true }) {
  return (
    <aside className="floating-actions" aria-label="Atalhos da página">
      <button
        type="button"
        className="back-to-top show"
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <IconeSetaCima />
      </button>
      {comWhatsapp && (
        <a
          className="wa-fab"
          href={linkWhatsapp(marca.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp: falar com a equipe (abre em nova aba)"
        >
          <IconeWhatsapp />
        </a>
      )}
    </aside>
  );
}
