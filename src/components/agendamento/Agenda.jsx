// Celular: centraliza o botão do dia escolhido na faixa que rola de lado, sem rolar a página.
// É passada no "ref" só do botão selecionado: o React a chama com o elemento quando ele
// passa a ser o selecionado (inclusive ao abrir a página, com o dia de hoje).
function centralizarNaFaixa(chip) {
  if (!chip) return;
  const faixa = chip.parentElement;
  faixa.scrollLeft = chip.offsetLeft - (faixa.clientWidth - chip.offsetWidth) / 2;
}

// Agenda da aula experimental: botões de dia + lista de horários do dia escolhido.
// O componente não guarda estado: quem sabe o dia escolhido é a página (AulaExperimental),
// que passa o valor e as funções por props. No vanilla isso era montado com createElement.
//
// Props:
//   horarios          → { dias, horas } (data/marcas.js)
//   diaSelecionado    → objeto do dia escolhido
//   onEscolherDia     → função(dia)
//   onEscolherHorario → função(hora)
export default function Agenda({ horarios, diaSelecionado, onEscolherDia, onEscolherHorario }) {
  return (
    <>
      <div className="day-chips" role="group" aria-label="Escolha o dia">
        {horarios.dias.map((dia) => (
          <button
            key={dia.nome}
            type="button"
            className="day-chip"
            aria-label={dia.nome}
            aria-pressed={dia.nome === diaSelecionado.nome}
            ref={dia.nome === diaSelecionado.nome ? centralizarNaFaixa : undefined}
            onClick={() => onEscolherDia(dia)}
          >
            {dia.curto}
          </button>
        ))}
      </div>

      <h3 id="time-heading" className="time-heading" aria-live="polite">
        Horários de {diaSelecionado.nome}
      </h3>
      <ul className="time-list" aria-labelledby="time-heading">
        {horarios.horas.map((hora) => (
          <li key={hora}>
            <button
              type="button"
              className="time-slot"
              aria-label={`${diaSelecionado.nome} às ${hora}`}
              onClick={() => onEscolherHorario(hora)}
            >
              {hora}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
