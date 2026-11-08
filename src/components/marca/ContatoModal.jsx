import { useState } from "react";
import { abrirComoModal } from "../../utils/dialogo.js";
import { linkWhatsapp } from "../../utils/agendamento.js";

// Janela "Fale Conosco": a pessoa digita o nome e abrimos o WhatsApp com a mensagem pronta.
//
// Props:
//   marca    → objeto da marca (textos e número vêm de data/marcas.js)
//   aberto   → true/false (o estado fica no LayoutMarca, que também é dono do botão "Contato")
//   onFechar → função que fecha a janela
export default function ContatoModal({ marca, aberto, onFechar }) {
  // input controlado: o valor do campo mora no estado "nome"
  const [nome, setNome] = useState("");

  if (!aberto) return null; // fechada: não renderiza nada

  const textos = marca.contato;

  function enviarParaWhatsapp() {
    const mensagem = textos.mensagem(nome.trim() || textos.nomePadrao);
    window.open(linkWhatsapp(marca.whatsapp, mensagem), "_blank", "noopener,noreferrer");
  }

  return (
    <dialog
      ref={abrirComoModal}
      className="modal-dialog"
      aria-labelledby="modal-title"
      onClose={onFechar} // Esc
      onClick={(e) => e.target === e.currentTarget && onFechar()} // clique no fundo escuro
    >
      <div className="modal-box">
        <button type="button" className="modal-close" aria-label="Fechar janela" onClick={onFechar}>
          &times;
        </button>
        <div className="modal-header">
          <span className="modal-badge">Fale Conosco</span>
          <h2 id="modal-title">{textos.titulo}</h2>
          <p>{textos.texto}</p>
        </div>
        <div className="modal-body">
          <label htmlFor="name" className="modal-label">
            {textos.rotulo}
          </label>
          <input
            type="text"
            id="name"
            data-autofocus
            className="modal-input"
            placeholder={textos.placeholder}
            autoComplete="name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <button type="button" className="btn btn-modal" onClick={enviarParaWhatsapp}>
            {textos.botao}
          </button>
        </div>
      </div>
    </dialog>
  );
}
