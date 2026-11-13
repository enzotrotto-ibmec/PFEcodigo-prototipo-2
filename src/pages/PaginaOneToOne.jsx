import FaixaNumeros from "../components/marca/FaixaNumeros.jsx";
import LayoutMarca from "../components/marca/LayoutMarca.jsx";
import Hero from "../components/marca/Hero.jsx";
import Sobre from "../components/marca/Sobre.jsx";
import Faq from "../components/marca/Faq.jsx";
import FaixaCta from "../components/marca/FaixaCta.jsx";
import Localizacao from "../components/marca/Localizacao.jsx";
import ConhecaTambem from "../components/marca/ConhecaTambem.jsx";
import SecaoServicos from "../components/one-to-one/SecaoServicos.jsx";
import LinkInterno from "../components/LinkInterno.jsx";
import { MARCAS } from "../data/marcas.js";
import { ROTAS } from "../data/seo.js";

// Página inicial do Studio One To One (rota /one-to-one). Era o pages/one-to-one.html do vanilla.
// Usa os mesmos componentes da PKZ, com outros dados (props).
const marca = MARCAS.oto;

const DESTAQUES = [
  {
    titulo: "Atendimento 1-para-1 Genuíno",
    texto: "Acompanhamento exclusivo de profissionais dedicados ao seu treino.",
    icone: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
];

const PERGUNTAS = [
  {
    pergunta: "Como agendo a aula experimental?",
    resposta: (
      <>
        Escolha o dia e o horário na página{" "}
        <LinkInterno to="/one-to-one/aula-experimental">Aula Experimental</LinkInterno> e envie o pedido pelo WhatsApp.
      </>
    ),
  },
  {
    pergunta: "Quais serviços vocês oferecem?",
    resposta: "Personal Training, Fisioterapia e Nutrição, com atendimento individualizado.",
  },
  {
    pergunta: "Onde fica o Studio One To One?",
    resposta: `${marca.endereco.rua}, ${marca.endereco.cidade}.`,
  },
  {
    pergunta: "Como falo com a equipe?",
    resposta: (
      <>
        Pelo WhatsApp, usando o botão desta página, ou pelo Instagram{" "}
        <a href={marca.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${marca.instagram.usuario} (abre em nova aba)`}>
          {marca.instagram.usuario}
        </a>
        .
      </>
    ),
  },
];

export default function PaginaOneToOne() {
  return (
    <LayoutMarca marcaId="oto" titulo={ROTAS["/one-to-one"].titulo} paginaInicial>
      <Hero
        titulo="Evolua com Propósito"
        subtitulo="Atendimento individualizado e ambiente sofisticado."
        botao={{ texto: "Aula Experimental", to: "/one-to-one/aula-experimental", comCaixa: true }}
        imagem={{ base: "img/one-to-one/equipe", alt: "Equipe multidisciplinar" }}
      />

      <Sobre
        tag="Sobre a One To One"
        lead={
          <>
            A <strong>One To One</strong> é um estúdio de saúde e bem-estar premium dedicado ao
            desenvolvimento físico integral através de atendimento estritamente individualizado.
          </>
        }
        destaques={DESTAQUES}
      >
        <p>
          Unimos ciência, acolhimento e tecnologia para transformar objetivos em longevidade e alta
          performance. Nosso corpo técnico integra <strong>Personal Training</strong>,{" "}
          <strong>Fisioterapia</strong> e <strong>Nutrição</strong>.
        </p>
      </Sobre>

      <FaixaNumeros
        itens={[
          { valor: marca.modalidades.length, rotulo: "serviços integrados" },
          { valor: marca.horarios.dias.length, rotulo: "dias de atendimento por semana" },
          { valor: marca.horarios.horas.length, rotulo: "horários por dia" },
        ]}
      />

      <SecaoServicos />
      <Faq marca={marca} itens={PERGUNTAS} />
      <FaixaCta marca={marca} />
      <Localizacao marca={marca} />
      <ConhecaTambem
        marca={marca}
        texto="Alto rendimento esportivo para crianças, adolescentes e adultos, com metodologia acadêmica e equipe especializada."
      />
    </LayoutMarca>
  );
}
