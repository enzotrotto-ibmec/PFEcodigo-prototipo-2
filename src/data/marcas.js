// Fonte única de dados do site (veio do js/data.js do vanilla). Edite aqui.
// Os componentes recebem a marca por props e leem daqui o nome, o WhatsApp, os textos etc.
// Chaves: "pkz" (PKZ Lab) e "oto" (Studio One To One).

// Horários de aula. dow = Date.getDay() (0 = domingo), usado para pré-selecionar o dia de hoje.
// Ajuste aos horários reais; hoje é idêntico nas duas marcas.
const horarios = {
  dias: [
    { curto: "Seg", nome: "Segunda-feira", dow: 1 },
    { curto: "Ter", nome: "Terça-feira", dow: 2 },
    { curto: "Qua", nome: "Quarta-feira", dow: 3 },
    { curto: "Qui", nome: "Quinta-feira", dow: 4 },
    { curto: "Sex", nome: "Sexta-feira", dow: 5 },
    { curto: "Sáb", nome: "Sábado", dow: 6 },
    { curto: "Dom", nome: "Domingo", dow: 0 },
  ],
  horas: [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
  ],
};

const endereco = {
  rua: "Av. Armando Lombardi, 949 — Loja G",
  cidade: "Barra da Tijuca, Rio de Janeiro — RJ",
  mapaEmbed:
    "https://www.google.com/maps?q=Av.+Armando+Lombardi,+949,+Barra+da+Tijuca,+Rio+de+Janeiro&output=embed",
  rota: "https://www.google.com/maps/search/?api=1&query=Av.+Armando+Lombardi,+949,+Barra+da+Tijuca,+Rio+de+Janeiro",
};

export const MARCAS = {
  pkz: {
    id: "pkz",
    nome: "PKZ Lab",
    nomeCurto: "PKZ",
    nomeEquipe: "PKZ Lab", // como a equipe é chamada na mensagem do WhatsApp e na autorização de dados
    rota: "/pkz", // endereço da página da marca no React Router
    corTema: "#020b18", // <meta name="theme-color">
    // Placeholder (DDI + DDD + número, só dígitos). Troque o número real AQUI.
    whatsapp: "5521000000000",
    logo: { src: "img/logos/pkz-lab-horizontal-branco.svg", largura: 849, altura: 255 },
    logoFaq: { src: "img/logos/pkz-lab-empilhado-branco.svg", largura: 390, altura: 521 },
    instagram: { url: "https://www.instagram.com/playmakerz_pkz/", usuario: "@playmakerz_pkz" },
    rodape: {
      frase: "Alto rendimento esportivo para todas as idades e todos os esportes.",
      direitos: "PKZ",
    },
    contato: {
      titulo: "Pronto para o Desafio?",
      texto: "Conecte-se com nossa equipe pelo WhatsApp e monte sua rotina de alta performance.",
      rotulo: "Qual o seu nome?",
      placeholder: "Digite seu nome completo",
      botao: "Enviar para WhatsApp →",
      nomePadrao: "Atleta",
      mensagem: (nome) =>
        `Fala equipe PKZ! Meu nome é ${nome} e gostaria de saber mais sobre as modalidades.`,
    },
    ctaBand: { titulo: "Pronto para subir de nível?" },
    modalidades: ["Karatê", "Jiu-Jitsu", "Vôlei", "Futebol", "Natação", "Atletismo", "Outro esporte"],
    horarios,
    endereco,
  },
  oto: {
    id: "oto",
    nome: "Studio One To One",
    nomeCurto: "One To One",
    nomeEquipe: "One To One",
    rota: "/one-to-one",
    corTema: "#ffffff",
    whatsapp: "5521000000000",
    logo: { src: "img/logos/one-to-one-petroleo.svg", largura: 140, altura: 47 },
    logoFaq: { src: "img/logos/one-to-one-petroleo.svg", largura: 140, altura: 47 },
    instagram: { url: "https://www.instagram.com/studioonetoone/", usuario: "@studioonetoone" },
    rodape: {
      frase: "Atendimento individualizado e ambiente sofisticado, para evoluir com propósito.",
      direitos: "Studio One To One",
    },
    contato: {
      titulo: "Inicie sua Jornada",
      texto: "Fale diretamente com nosso time pelo WhatsApp e agende sua avaliação.",
      rotulo: "Como gostaria de ser chamado?",
      placeholder: "Digite seu nome",
      botao: "Falar com Consultor →",
      nomePadrao: "um visitante",
      mensagem: (nome) =>
        `Olá, equipe One To One. Me chamo ${nome} e gostaria de agendar uma avaliação.`,
    },
    ctaBand: { titulo: "Um treino pensado só para você" },
    modalidades: ["Personal Training", "Fisioterapia", "Nutrição"],
    horarios,
    endereco,
  },
  // Marca independente (só divide o endereço com PKZ e One To One). Sem agendamento de aula.
  // PROVISÓRIO: nome, textos, WhatsApp e Instagram são placeholders, trocar quando a marca definir.
  fisio: {
    id: "fisio",
    nome: "Fisioterapia",
    nomeCurto: "Fisioterapia",
    nomeEquipe: "Fisioterapia",
    rota: "/fisioterapia",
    corTema: "#ffffff",
    agendamento: false, // sem página de aula experimental: os CTAs levam ao WhatsApp
    whatsapp: "5521000000000",
    logo: { src: "img/logos/fisio-provisorio.svg", largura: 260, altura: 60 },
    logoFaq: { src: "img/logos/fisio-provisorio.svg", largura: 260, altura: 60 },
    instagram: null, // PROVISÓRIO: ainda sem perfil; o rodapé e o FAQ escondem o Instagram enquanto for null
    rodape: {
      frase: "Reabilitação e movimento com cuidado individual, na Barra da Tijuca.",
      direitos: "Fisioterapia",
    },
    contato: {
      titulo: "Vamos cuidar de você",
      texto: "Fale com nossa equipe pelo WhatsApp e agende sua avaliação.",
      rotulo: "Como gostaria de ser chamado?",
      placeholder: "Digite seu nome",
      botao: "Falar com a equipe →",
      nomePadrao: "um visitante",
      mensagem: (nome) => `Olá! Me chamo ${nome} e gostaria de agendar uma avaliação de fisioterapia.`,
    },
    ctaBand: { titulo: "Movimente-se sem dor" },
    // texto do card "Conheça também" nas páginas das outras marcas
    resumo: "Reabilitação, pós-operatório e prevenção de lesões, com atendimento individual no mesmo endereço.",
    modalidades: ["Reabilitação", "Pós-operatório", "Prevenção de lesões", "Pilates clínico"],
    horarios,
    endereco,
  },
};

// A "outra" marca: usada no link "Studio One To One →" do cabeçalho e no card "Conheça também".
export function outraMarca(id) {
  return id === "oto" ? MARCAS.pkz : MARCAS.oto; // PKZ e Fisioterapia apontam para a One To One
}
