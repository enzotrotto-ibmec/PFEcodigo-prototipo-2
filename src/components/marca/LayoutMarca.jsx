import { useRef, useState } from "react";
import { useAnimacoesScroll } from "../../utils/animacoes.js";
import EstilosDaPagina from "../EstilosDaPagina.jsx";
import { SimboloWhatsapp } from "../Icones.jsx";
import Cabecalho from "./Cabecalho.jsx";
import Rodape from "./Rodape.jsx";
import ContatoModal from "./ContatoModal.jsx";
import BarraAcoesMobile from "./BarraAcoesMobile.jsx";
import AtalhosFlutuantes from "./AtalhosFlutuantes.jsx";
import { MARCAS } from "../../data/marcas.js";

import baseCss from "../../styles/base.css?inline";
import pkzCss from "../../styles/pkz.css?inline";
import otoCss from "../../styles/one-to-one.css?inline";
import fisioCss from "../../styles/fisio.css?inline";
import ctaCss from "../../styles/cta.css?inline";
import extrasCss from "../../styles/extras.css?inline";

// Moldura comum às páginas das marcas (inicial e aula experimental):
// cabeçalho, <main> com o conteúdo da página (children), rodapé, janela de contato e atalhos.
//
// Props:
//   marcaId        → "pkz" ou "oto"
//   titulo         → texto da aba do navegador
//   paginaInicial  → true na página inicial da marca (tem a barra fixa do celular e o WhatsApp flutuante)
//   children       → as seções da página
//
// A janela de contato é aberta pelo cabeçalho, mas fica aqui embaixo. Por isso o estado
// "contatoAberto" mora neste componente (o "pai" dos dois) e desce para eles via props.
export default function LayoutMarca({ marcaId, titulo, paginaInicial = false, children }) {
  const [contatoAberto, setContatoAberto] = useState(false);
  const marca = MARCAS[marcaId];
  const raizRef = useRef(null);
  useAnimacoesScroll(raizRef);

  // mesma ordem de CSS do vanilla; a aula experimental não carregava o cta.css
  const temaCss = { pkz: pkzCss, oto: otoCss, fisio: fisioCss }[marcaId];
  const folhas = paginaInicial ? [baseCss, temaCss, ctaCss, extrasCss] : [baseCss, temaCss, extrasCss];

  return (
    // data-brand: o cta.css e o extras.css usam [data-brand="pkz"] / [data-brand="oto"]
    <div className="pagina" data-brand={marcaId} ref={raizRef}>
      {/* No React 19, <title> e <meta> vão sozinhos para o <head> */}
      <title>{titulo}</title>
      <meta name="theme-color" content={marca.corTema} />
      <EstilosDaPagina folhas={folhas} />

      {/* Atalho de acessibilidade para pular o menu: âncora dentro da própria página, não é troca de página */}
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <div className="scroll-progress" aria-hidden="true"></div>
      <SimboloWhatsapp />

      <Cabecalho
        marca={marca}
        onAbrirContato={() => setContatoAberto(true)}
        contatoDestacado={!paginaInicial}
      />

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      <Rodape marca={marca} />

      <ContatoModal marca={marca} aberto={contatoAberto} onFechar={() => setContatoAberto(false)} />

      {paginaInicial && <BarraAcoesMobile marca={marca} />}
      <AtalhosFlutuantes marca={marca} comWhatsapp={paginaInicial} />
    </div>
  );
}
