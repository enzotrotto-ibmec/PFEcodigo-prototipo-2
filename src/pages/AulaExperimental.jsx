import { useState } from "react";
import LayoutMarca from "../components/marca/LayoutMarca.jsx";
import Hero from "../components/marca/Hero.jsx";
import Agenda from "../components/agendamento/Agenda.jsx";
import AgendamentoModal from "../components/agendamento/AgendamentoModal.jsx";
import { MARCAS } from "../data/marcas.js";

// Página de agendamento da aula experimental. Um só componente serve às duas marcas:
// a rota passa a marca por props (<AulaExperimental marca="pkz" /> em App.jsx).
// Era o pages/pkz-aula-experimental.html e o pages/one-to-one-aula-experimental.html.
//
// Estados:
//   dia     → dia escolhido na agenda (começa no dia de hoje)
//   horario → { dia, hora } clicado; quando não é null, a janela do formulário abre
export default function AulaExperimental({ marca: marcaId }) {
  const marca = MARCAS[marcaId];
  const { horarios } = marca;

  // useState(() => ...) calcula o valor inicial só na primeira vez
  const [dia, setDia] = useState(() => {
    const hoje = new Date().getDay();
    return horarios.dias.find((d) => d.dow === hoje) || horarios.dias[0];
  });
  const [horario, setHorario] = useState(null);

  return (
    <LayoutMarca marcaId={marcaId} titulo={`Aula Experimental | ${marca.nome}`}>
      <Hero
        id="aula-hero"
        titulo="Aula Experimental"
        subtitulo={`Escolha o melhor dia e horário para conhecer a ${marca.nomeCurto} de perto.`}
      />

      <section id="agenda" className="schedule-section">
        <span className="section-tag">Marque sua Aula</span>
        <h2>Escolha o Dia e o Horário</h2>
        <p className="schedule-intro">
          Escolha o dia e toque em um horário para preencher seus dados. Nossa equipe confirma sua vaga
          em seguida.
        </p>

        <Agenda
          horarios={horarios}
          diaSelecionado={dia}
          onEscolherDia={setDia}
          onEscolherHorario={(hora) => setHorario({ dia: dia.nome, hora })}
        />
      </section>

      <AgendamentoModal marca={marca} horario={horario} onFechar={() => setHorario(null)} />
    </LayoutMarca>
  );
}
