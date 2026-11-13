import FaixaNumeros from "../components/marca/FaixaNumeros.jsx";
import LayoutMarca from "../components/marca/LayoutMarca.jsx";
import Hero from "../components/marca/Hero.jsx";
import Sobre from "../components/marca/Sobre.jsx";
import Faq from "../components/marca/Faq.jsx";
import FaixaCta from "../components/marca/FaixaCta.jsx";
import Localizacao from "../components/marca/Localizacao.jsx";
import ConhecaTambem from "../components/marca/ConhecaTambem.jsx";
import SecaoTratamentos from "../components/fisio/SecaoTratamentos.jsx";
import { linkWhatsapp } from "../utils/agendamento.js";
import { MARCAS } from "../data/marcas.js";
import { ROTAS } from "../data/seo.js";

// Página inicial da Fisioterapia (rota /fisioterapia). Marca independente, sem aula experimental:
// os botões levam direto ao WhatsApp. PROVISÓRIO: textos de exemplo até a equipe enviar os reais.
const marca = MARCAS.fisio;

const DESTAQUES = [
  {
    titulo: "Avaliação individual",
    texto: "Cada plano parte da sua história, dos seus objetivos e do seu ritmo.",
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
    pergunta: "Como agendo uma avaliação?",
    resposta: "Pelo botão de WhatsApp desta página: a equipe responde e combina o melhor horário com você.",
  },
  {
    pergunta: "Preciso de encaminhamento médico?",
    resposta: "Não é obrigatório para a avaliação. Se você já tem exames ou laudos, leve para a primeira sessão.",
  },
  {
    pergunta: "Onde fica o atendimento?",
    resposta: `${marca.endereco.rua}, ${marca.endereco.cidade}.`,
  },
  {
    pergunta: "Como falo com a equipe?",
    resposta: "Pelo WhatsApp, usando o botão desta página.",
  },
];

export default function PaginaFisio() {
  return (
    <LayoutMarca marcaId="fisio" titulo={ROTAS["/fisioterapia"].titulo} paginaInicial>
      <Hero
        titulo="Movimente‑se sem dor"
        subtitulo="Reabilitação e prevenção com atendimento individual, na Barra da Tijuca."
        botao={{ texto: "Agendar avaliação", href: linkWhatsapp(marca.whatsapp, marca.contato.mensagem(marca.contato.nomePadrao)), comCaixa: true }}
        imagem={{ base: "img/fisio/equipe", alt: "Fisioterapeuta orientando uma paciente em exercício com faixa elástica" }}
      />

      <Sobre
        tag="Sobre a Fisioterapia"
        lead={
          <>
            Um espaço de <strong>reabilitação e movimento</strong> com atendimento individual, do primeiro
            contato até a alta.
          </>
        }
        destaques={DESTAQUES}
      >
        <p>
          Unimos avaliação criteriosa, terapia manual e exercícios orientados para devolver função, aliviar a
          dor e prevenir novas lesões.
        </p>
      </Sobre>

      <FaixaNumeros
        itens={[
          { valor: marca.modalidades.length, rotulo: "tipos de tratamento" },
          { valor: 4, rotulo: "etapas do atendimento" },
          { valor: 1, rotulo: "avaliação individual no início" },
        ]}
      />

      <SecaoTratamentos />
      <Faq marca={marca} itens={PERGUNTAS} />
      <FaixaCta marca={marca} />
      <Localizacao marca={marca} />
      <ConhecaTambem
        marca={marca}
        texto="Personal Training, Fisioterapia e Nutrição com atendimento individualizado e ambiente sofisticado."
      />
    </LayoutMarca>
  );
}
