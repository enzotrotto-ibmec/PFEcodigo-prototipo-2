import FaixaNumeros from "../components/marca/FaixaNumeros.jsx";
import LayoutMarca from "../components/marca/LayoutMarca.jsx";
import Hero from "../components/marca/Hero.jsx";
import Sobre from "../components/marca/Sobre.jsx";
import Faq from "../components/marca/Faq.jsx";
import FaixaCta from "../components/marca/FaixaCta.jsx";
import Localizacao from "../components/marca/Localizacao.jsx";
import ConhecaTambem from "../components/marca/ConhecaTambem.jsx";
import SecaoFamilia from "../components/pkz/SecaoFamilia.jsx";
import SecaoEsportes from "../components/pkz/SecaoEsportes.jsx";
import LinkInterno from "../components/LinkInterno.jsx";
import { MARCAS } from "../data/marcas.js";
import { ROTAS } from "../data/seo.js";

// Página inicial da PKZ Lab (rota /pkz). Era o pages/pkz.html do vanilla.
// A página só monta as seções: cada uma é um componente que recebe os dados por props.
const marca = MARCAS.pkz;

const DESTAQUES = [
  {
    titulo: "Metodologia de Elite",
    texto: "Periodização estratégica inspirada em programas de treinamento profissionais.",
    icone: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    titulo: "Suporte Multidisciplinar Científico",
    texto: "Acompanhamento integrado de fisiologia, nutrição e análise corporal.",
    icone: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  },
];

const PERGUNTAS = [
  {
    pergunta: "Como agendo a aula experimental?",
    resposta: (
      <>
        Escolha o dia e o horário na página{" "}
        <LinkInterno to="/pkz/aula-experimental">Aula Experimental</LinkInterno> e envie o pedido pelo WhatsApp.
      </>
    ),
  },
  {
    pergunta: "Quais esportes vocês atendem?",
    resposta: "Karatê, jiu-jitsu e vôlei, além de futebol, natação, atletismo e outros. A PKZ atende qualquer esporte que você pratique.",
  },
  {
    pergunta: "Atende crianças e adolescentes?",
    resposta: "Sim. A PKZ é estruturada para atender crianças e adolescentes, com metodologia acadêmica, profissionais qualificados e acompanhamento próximo em cada etapa.",
  },
  {
    pergunta: "Onde fica a PKZ Lab?",
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

export default function PaginaPkz() {
  return (
    <LayoutMarca marcaId="pkz" titulo={ROTAS["/pkz"].titulo} paginaInicial>
      <Hero
        titulo="Treine Como um Profissional"
        subtitulo="Alto rendimento e performance garantida."
        botao={{ texto: "Aula Experimental", to: "/pkz/aula-experimental" }}
        imagem={{ base: "img/pkz/EquipePKZ", alt: "Corpo técnico da PKZ" }}
      />

      <Sobre
        tag="Sobre a PKZ"
        lead={
          <>
            A <strong>PKZ</strong> é um centro de alta performance esportiva desenvolvido para
            potencializar o rendimento de quem busca ir além dos limites convencionais.
          </>
        }
        destaques={DESTAQUES}
      >
        <p>
          Não nos limitamos a treinos genéricos. Integramos <strong>metodologia científica</strong>,{" "}
          <strong>avaliação biomecânica de precisão</strong> e <strong>suporte nutricional contínuo</strong>{" "}
          para que cada atleta evolua com máxima segurança.
        </p>
      </Sobre>

      <FaixaNumeros
        itens={[
          { valor: marca.modalidades.filter((m) => m !== "Outro esporte").length, rotulo: "modalidades esportivas" },
          { valor: marca.horarios.dias.length, rotulo: "dias de aula por semana" },
          { valor: marca.horarios.horas.length, rotulo: "horários por dia" },
        ]}
      />

      <SecaoFamilia />
      <SecaoEsportes />
      <Faq marca={marca} itens={PERGUNTAS} />
      <FaixaCta marca={marca} />
      <Localizacao marca={marca} />
      <ConhecaTambem
        marca={marca}
        texto="Personal training individualizado e ambiente sofisticado, para quem busca evolução física com atendimento exclusivo."
      />
    </LayoutMarca>
  );
}
