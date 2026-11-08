// Ajudante para o <dialog> nativo do HTML, usado pelas janelas de contato e de agendamento.
//
// O componente da janela só é renderizado quando ela está aberta ({aberto && <dialog ...>}).
// Passamos esta função no atributo ref do <dialog>: o React a chama com o elemento logo que
// ele entra na tela, e aí chamamos showModal(), que dá de graça o fundo escuro (::backdrop),
// o foco preso dentro da janela e o fechamento com Esc (que dispara o evento onClose).
// Fica fora dos componentes para ser sempre a mesma função (o React não a chama de novo a cada render).
export function abrirComoModal(dialogo) {
  if (!dialogo || dialogo.open) return;
  dialogo.showModal();
  // o showModal foca o primeiro botão (o "×"); preferimos o campo marcado com data-autofocus
  const campo = dialogo.querySelector("[data-autofocus]");
  if (campo) campo.focus();
}
