import { useRef } from "react";
import EstilosDaPagina from "../components/EstilosDaPagina.jsx";
import LinkInterno from "../components/LinkInterno.jsx";
import RodapePortal from "../components/portal/RodapePortal.jsx";
import { asset, srcsetDe } from "../utils/asset.js";
import { useAnimacoesHome } from "../utils/animacoes.js";
import { MARCAS } from "../data/marcas.js";
import { ROTAS } from "../data/seo.js";
import portalCss from "../styles/portal.css?inline";
import homeCss from "../styles/home.css?inline";

// Página inicial (rota /): mostra que PKZ, One To One e Fisioterapia são um só ecossistema, no mesmo
// endereço, e leva a pessoa para cada uma. Substitui o portal do halter (pages/Portal.jsx, hoje sem uso).
// O texto de cada marca é o mesmo das páginas dela; nada foi inventado.
const ECOSSISTEMA = [
  {
    id: "pkz",
    passo: "1 · Treine",
    nome: "PKZ Lab",
    texto: "Treino esportivo de alto rendimento para todas as idades e todos os esportes.",
    foto: "img/pkz/EquipePKZ",
    logo: { src: "img/logos/pkz-lab-horizontal-branco.svg", largura: 849, altura: 255 },
    cta: "Conhecer a PKZ",
  },
  {
    id: "oto",
    passo: "2 · Evolua",
    nome: "Studio One To One",
    texto: "Personal training e nutrição com acompanhamento individual e ambiente sofisticado.",
    foto: "img/one-to-one/equipe",
    logo: { src: "img/logos/one-to-one-branco.svg", largura: 140, altura: 47 },
    cta: "Conhecer a One To One",
  },
  {
    id: "fisio",
    passo: "3 · Recupere",
    nome: "Fisioterapia",
    texto: "Reabilitação, pós-operatório e prevenção de lesões com atendimento individual.",
    foto: "img/fisio/equipe",
    logo: { src: "img/logos/fisio-provisorio-branco.svg", largura: 260, altura: 60 },
    cta: "Conhecer a Fisioterapia",
  },
];

const MANIFESTO =
  "Treinar, evoluir e se recuperar fazem parte do mesmo caminho. Por isso o treino de alto rendimento, o acompanhamento individual e a fisioterapia ficam juntos, no mesmo endereço.";

const NUMEROS = [
  { valor: 3, rotulo: "especialidades" },
  { valor: 1, rotulo: "endereço" },
  { valor: MARCAS.pkz.horarios.dias.length, rotulo: "dias de aula por semana" },
];

export default function Home() {
  const raiz = useRef(null);
  useAnimacoesHome(raiz);

  return (
    <div className="pagina home" ref={raiz}>
      <title>{ROTAS["/"].titulo}</title>
      <meta name="theme-color" content="#020b18" />
      <EstilosDaPagina folhas={[portalCss, homeCss]} />

      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true"></div>

      <header className="home-header">
        <LinkInterno to="/" className="home-marca">
          Um só endereço
        </LinkInterno>
        <nav className="home-nav" aria-label="Principal">
          {ECOSSISTEMA.map((m) => (
            <LinkInterno key={m.id} to={MARCAS[m.id].rota} className={`home-nav-link n-${m.id}`}>
              {MARCAS[m.id].nomeCurto}
            </LinkInterno>
          ))}
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="home-hero" aria-labelledby="home-titulo">
          {/* As três equipes lado a lado: a mesma cena, três especialidades. Decorativas. */}
          <div className="tri" aria-hidden="true">
            {ECOSSISTEMA.map((m, i) => (
              <div className="tri-faixa" data-marca={m.id} key={m.id}>
                <img
                  src={asset(`${m.foto}-800.webp`)}
                  srcSet={srcsetDe(m.foto)}
                  sizes="(min-width: 768px) 34vw, 100vw"
                  alt=""
                  width={m.id === "fisio" ? 2000 : 2760}
                  height={m.id === "fisio" ? 1116 : 1504}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : undefined}
                />
                <span className="tri-nome">{m.nome}</span>
              </div>
            ))}
          </div>
          <div className="aurora" aria-hidden="true"></div>
          <div className="sombra" aria-hidden="true"></div>

          <div className="hero-texto">
            <h1 id="home-titulo" aria-label="Um só endereço, três especialidades">
              {"Um só endereço, três especialidades".split(" ").map((palavra, i) => (
                <span className="pal" aria-hidden="true" key={i}>
                  <span className="pal-i">{palavra}</span>{" "}
                </span>
              ))}
            </h1>
            <p>Treino de alto rendimento, acompanhamento individual e reabilitação, na Barra da Tijuca.</p>
            <LinkInterno to="/" secao="ecossistema" className="btn btn-home">
              Escolher por onde começar
            </LinkInterno>
          </div>
        </section>

        <section className="manif" aria-label="O ecossistema">
          <p>
            {MANIFESTO.split(" ").map((palavra, i) => (
              <span className="w" key={i}>
                {palavra}{" "}
              </span>
            ))}
          </p>
        </section>

        <section id="ecossistema" className="eco" aria-labelledby="eco-titulo">
          <h2 id="eco-titulo">Escolha por onde começar</h2>
          <p className="eco-sub">Você pode começar por qualquer uma. As três ficam no mesmo endereço.</p>

          <div className="eco-grid">
            <div className="fio" aria-hidden="true">
              <span className="fio-linha"></span>
              <span className="fio-no" style={{ left: "16.6%" }}></span>
              <span className="fio-no" style={{ left: "50%" }}></span>
              <span className="fio-no" style={{ left: "83.4%" }}></span>
            </div>
            {ECOSSISTEMA.map((m) => (
              <article className="eco-card" data-marca={m.id} key={m.id}>
                <img
                  className="eco-foto"
                  src={asset(`${m.foto}-800.webp`)}
                  srcSet={srcsetDe(m.foto)}
                  sizes="(min-width: 960px) 33vw, 100vw"
                  alt=""
                  width={m.id === "fisio" ? 2000 : 2760}
                  height={m.id === "fisio" ? 1116 : 1504}
                  decoding="async"
                  loading="lazy"
                />
                <div className="eco-corpo">
                  <span className="eco-passo">{m.passo}</span>
                  <h3>
                    <img src={asset(m.logo.src)} alt={m.nome} width={m.logo.largura} height={m.logo.altura} loading="lazy" />
                  </h3>
                  <p>{m.texto}</p>
                  <LinkInterno to={MARCAS[m.id].rota} className="btn btn-eco">
                    {m.cta}
                    <span aria-hidden="true"> →</span>
                  </LinkInterno>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-numeros" aria-label="O ecossistema em números">
          <ul>
            {NUMEROS.map(({ valor, rotulo }) => (
              <li key={rotulo}>
                <strong>
                  <span className="numero-contador" data-valor={valor} aria-hidden="true">
                    {valor}
                  </span>
                  <span className="visually-hidden">{valor}</span>
                </strong>
                <span>{rotulo}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-local" aria-labelledby="local-titulo">
          <h2 id="local-titulo">Nosso endereço</h2>
          <p>
            <strong>{MARCAS.pkz.endereco.rua}</strong>
            <br />
            {MARCAS.pkz.endereco.cidade}
          </p>
          <a className="btn btn-home" href={MARCAS.pkz.endereco.rota} target="_blank" rel="noopener noreferrer" aria-label="Como chegar: abrir a rota no Google Maps (abre em nova aba)">
            Como chegar
          </a>
        </section>
      </main>

      <RodapePortal />
    </div>
  );
}
