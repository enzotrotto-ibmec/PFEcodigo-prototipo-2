import { useState } from "react";
import LinkInterno from "../LinkInterno.jsx";
import { abrirComoModal } from "../../utils/dialogo.js";
import { cpfValido, linkWhatsapp, mascararCpf, mascararTelefone } from "../../utils/agendamento.js";

// Formulário vazio (também usado para limpar depois do envio)
const FORMULARIO_VAZIO = {
  modalidade: "",
  nome: "",
  telefone: "",
  cpf: "",
  observacao: "",
  consentimento: false,
};

// Janela de confirmação da aula experimental: formulário → mensagem pronta no WhatsApp.
// Lógica do js/agendamento.js do vanilla (fornecida pelo professor), agora com estado do React.
//
// Props:
//   marca    → objeto da marca (nome, WhatsApp, modalidades)
//   horario  → { dia, hora } escolhido na agenda, ou null (janela fechada)
//   onFechar → função que fecha a janela
export default function AgendamentoModal({ marca, horario, onFechar }) {
  // Estados: os valores dos campos, a lista de campos inválidos e o texto de confirmação
  const [campos, setCampos] = useState(FORMULARIO_VAZIO);
  const [invalidos, setInvalidos] = useState([]); // ex.: ["nome", "cpf"]
  const [confirmacao, setConfirmacao] = useState(""); // vazio = mostra o formulário

  if (!horario) return null;

  const horarioTexto = `${horario.dia} às ${horario.hora}`;

  // Atualiza um campo só, mantendo os outros (o "..." copia o objeto antigo)
  function mudarCampo(nomeDoCampo, valor) {
    setCampos({ ...campos, [nomeDoCampo]: valor });
  }

  function fechar() {
    setConfirmacao("");
    setInvalidos([]);
    onFechar();
  }

  function enviar(evento) {
    evento.preventDefault(); // não recarrega a página

    // validação: cada item é [está inválido?, nome do campo]
    const problemas = [
      [!campos.modalidade, "modalidade"],
      [!campos.nome.trim(), "nome"],
      [campos.telefone.replace(/\D/g, "").length < 10, "telefone"],
      [!cpfValido(campos.cpf.replace(/\D/g, "")), "cpf"],
      [!campos.consentimento, "consentimento"],
    ]
      .filter(([estaInvalido]) => estaInvalido)
      .map(([, campo]) => campo);

    if (problemas.length) {
      setInvalidos(problemas);
      document.getElementById(`booking-${problemas[0]}`).focus(); // foco no primeiro campo com problema
      return;
    }

    const mensagem = [
      `Olá, equipe ${marca.nomeEquipe}! Quero agendar uma aula experimental pelo site.`,
      `Horário: ${horarioTexto}`,
      `Modalidade: ${campos.modalidade}`,
      `Nome: ${campos.nome.trim()}`,
      `Telefone: ${campos.telefone}`,
      `CPF: ${campos.cpf}`,
      campos.observacao.trim() && `Observação: ${campos.observacao.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(linkWhatsapp(marca.whatsapp, mensagem), "_blank", "noopener,noreferrer");

    setInvalidos([]);
    setCampos(FORMULARIO_VAZIO);
    setConfirmacao(
      `Abrimos o WhatsApp com o seu pedido para ${horarioTexto}. Envie a mensagem para a equipe confirmar o horário.`,
    );
  }

  // mensagem de erro montada a partir da lista de campos inválidos
  const ROTULOS = {
    modalidade: "a modalidade",
    nome: "seu nome",
    telefone: "um telefone com DDD",
    cpf: "um CPF válido",
    consentimento: "a autorização de uso dos dados",
  };
  const erro = invalidos.length ? `Falta informar: ${invalidos.map((campo) => ROTULOS[campo]).join(", ")}.` : "";

  // atributo aria-invalid só nos campos com problema
  const invalido = (campo) => (invalidos.includes(campo) ? "true" : undefined);

  return (
    <dialog
      ref={abrirComoModal}
      className="modal-dialog"
      aria-labelledby="booking-modal-title"
      onClose={fechar}
      onClick={(e) => e.target === e.currentTarget && fechar()}
    >
      <div className="modal-box">
        <button type="button" className="modal-close" aria-label="Fechar janela" onClick={fechar}>
          &times;
        </button>
        <div className="modal-header">
          <span className="modal-badge">
            {horario.dia} · {horario.hora}
          </span>
          <h2 id="booking-modal-title">Confirme sua Aula Experimental</h2>
          <p>Preencha seus dados: abriremos o WhatsApp com o seu pedido pronto para enviar.</p>
        </div>

        {confirmacao ? (
          <div className="booking-confirmation">
            <p role="status">{confirmacao}</p>
            <button type="button" className="btn btn-modal" onClick={fechar} autoFocus>
              Fechar
            </button>
          </div>
        ) : (
          <form className="modal-body" noValidate onSubmit={enviar}>
            <label htmlFor="booking-modalidade" className="modal-label">
              Modalidade
            </label>
            <select
              id="booking-modalidade"
              className="modal-input"
              data-autofocus
              aria-describedby="booking-error"
              aria-invalid={invalido("modalidade")}
              value={campos.modalidade}
              onChange={(e) => mudarCampo("modalidade", e.target.value)}
            >
              <option value="">Selecione</option>
              {marca.modalidades.map((modalidade) => (
                <option key={modalidade} value={modalidade}>
                  {modalidade}
                </option>
              ))}
            </select>

            <label htmlFor="booking-nome" className="modal-label">
              Nome completo
            </label>
            <input
              type="text"
              id="booking-nome"
              className="modal-input"
              placeholder="Digite seu nome completo"
              autoComplete="name"
              aria-describedby="booking-error"
              aria-invalid={invalido("nome")}
              value={campos.nome}
              onChange={(e) => mudarCampo("nome", e.target.value)}
            />

            <label htmlFor="booking-telefone" className="modal-label">
              Telefone / WhatsApp
            </label>
            <input
              type="tel"
              id="booking-telefone"
              className="modal-input"
              placeholder="(21) 90000-0000"
              autoComplete="tel"
              aria-describedby="booking-error"
              aria-invalid={invalido("telefone")}
              value={campos.telefone}
              onChange={(e) => mudarCampo("telefone", mascararTelefone(e.target.value))}
            />

            <label htmlFor="booking-cpf" className="modal-label">
              CPF
            </label>
            <input
              type="text"
              id="booking-cpf"
              className="modal-input"
              placeholder="000.000.000-00"
              inputMode="numeric"
              maxLength={14}
              aria-describedby="booking-cpf-hint booking-error"
              aria-invalid={invalido("cpf")}
              value={campos.cpf}
              onChange={(e) => mudarCampo("cpf", mascararCpf(e.target.value))}
            />
            <p id="booking-cpf-hint" className="modal-hint">
              Só números; a pontuação entra sozinha.
            </p>

            <label htmlFor="booking-observacao" className="modal-label">
              Dúvida ou observação (opcional)
            </label>
            <textarea
              id="booking-observacao"
              className="modal-input"
              rows={3}
              placeholder="Alguma informação que queira compartilhar?"
              value={campos.observacao}
              onChange={(e) => mudarCampo("observacao", e.target.value)}
            ></textarea>

            <label className="booking-consent">
              <input
                type="checkbox"
                id="booking-consentimento"
                aria-invalid={invalido("consentimento")}
                checked={campos.consentimento}
                onChange={(e) => mudarCampo("consentimento", e.target.checked)}
              />
              <span>
                Autorizo o uso dos meus dados, inclusive o CPF, apenas para o agendamento e o controle
                interno da {marca.nomeEquipe}. Veja a{" "}
                <LinkInterno
                  to="/privacidade"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Política de Privacidade (abre em nova aba)"
                  className="text-link"
                >
                  Política de Privacidade
                </LinkInterno>
                .
              </span>
            </label>

            <p id="booking-error" className="booking-error" role="alert" hidden={!erro}>
              {erro}
            </p>
            <button type="submit" className="btn btn-modal">
              Enviar pelo WhatsApp →
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
