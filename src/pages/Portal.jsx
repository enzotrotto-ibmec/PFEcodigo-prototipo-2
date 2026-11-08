import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EstilosDaPagina from "../components/EstilosDaPagina.jsx";
import BarraHalter from "../components/portal/BarraHalter.jsx";
import Apresentacao from "../components/portal/Apresentacao.jsx";
import PainelMarca from "../components/portal/PainelMarca.jsx";
import SetasDaBorda from "../components/portal/SetasDaBorda.jsx";
import AvisoRedirecionamento from "../components/portal/AvisoRedirecionamento.jsx";
import RodapePortal from "../components/portal/RodapePortal.jsx";
import { BORDA, DESTINOS, TEMPO_AVISO_MS } from "../components/portal/constantes.js";
import { irParaTopo } from "../utils/navegacao.js";
import portalCss from "../styles/portal.css?inline";

// Portal (rota /): o halter arrastável escolhe entre a PKZ (ponta esquerda) e a One To One
// (ponta direita). Soltar perto de uma ponta mostra o aviso "redirecionando..." e abre a marca.
// Era o index.html + js/portal.js do vanilla.
//
// O estado fica aqui porque vários componentes dependem dele:
//   posicao        → posição do halter (0 a 100); define a largura dos painéis e das barras
//   arrastando     → se o halter está sendo segurado
//   jaUsou         → some a dica "arraste e solte" depois do primeiro uso
//   redirecionando → "pkz", "oto" ou null; quando não é null, o aviso aparece
//   temporizador   → id do setTimeout do redirecionamento (para poder cancelar)
export default function Portal() {
  const [posicao, setPosicao] = useState(50);
  const [arrastando, setArrastando] = useState(false);
  const [jaUsou, setJaUsou] = useState(false);
  const [redirecionando, setRedirecionando] = useState(null);
  const [temporizador, setTemporizador] = useState(null);
  const navigate = useNavigate(); // troca de rota pelo código (depois do aviso)

  // A barra fica fixa no topo e os painéis abaixo da apresentação: ao mexer no halter,
  // leva a página até os painéis para o arrasto nunca acontecer "às cegas".
  function mostrarPaineis() {
    const palco = document.getElementById("stage");
    const r = palco.getBoundingClientRect();
    if (r.top < innerHeight * 0.25 && r.bottom > innerHeight * 0.75) return; // já está à vista
    palco.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function primeiroUso() {
    mostrarPaineis();
    setJaUsou(true);
  }

  function redirecionar(marca) {
    if (redirecionando) return;
    setRedirecionando(marca);
    const id = setTimeout(() => {
      irParaTopo();
      navigate(DESTINOS[marca].rota);
    }, TEMPO_AVISO_MS);
    setTemporizador(id);
  }

  function cancelar() {
    clearTimeout(temporizador);
    setRedirecionando(null);
    setPosicao(50);
    document.getElementById("handle").focus();
  }

  // Só redireciona ao soltar (ou Enter/Espaço) perto de uma ponta
  function soltar(p) {
    if (p <= BORDA) redirecionar("pkz");
    else if (p >= 100 - BORDA) redirecionar("oto");
  }

  const larguraPkz = 100 - posicao;

  return (
    <div className="pagina">
      <title>PKZ Lab &amp; Studio One To One | Treino na Barra da Tijuca, RJ</title>
      <meta name="theme-color" content="#020b18" />
      <EstilosDaPagina folhas={[portalCss]} />

      <BarraHalter
        posicao={posicao}
        arrastando={arrastando}
        jaUsou={jaUsou}
        onMover={setPosicao}
        onComecar={primeiroUso}
        onArrastar={setArrastando}
        onSoltar={soltar}
      />

      <main>
        <Apresentacao />

        <section id="portal" aria-label="Escolha seu universo">
          <div id="stage">
            <PainelMarca
              id="pkz"
              rotulo="Universo PKZ"
              largura={larguraPkz}
              comLargura
              tag="Alto Rendimento"
              titulo="PKZ"
              texto="Treino sério, resultados reais. Estrutura completa para quem quer ir além."
              rota="/pkz"
              classeBotao="pkz-btn"
              idBotao="btn-pkz-cta"
              onEntrar={() => redirecionar("pkz")}
            />

            <div id="div-line" aria-hidden="true" style={{ left: `calc(${larguraPkz}% - 1px)` }}></div>

            <PainelMarca
              id="oto"
              rotulo="Universo One To One"
              largura={posicao}
              tag="Personal Training & Saúde"
              titulo="ONE TO ONE"
              subtitulo="Personal Training"
              texto="Acompanhamento exclusivo, totalmente adaptado ao seu objetivo e ritmo."
              rota="/one-to-one"
              classeBotao="oto-btn"
              idBotao="btn-oto-cta"
              onEntrar={() => redirecionar("oto")}
            />
          </div>
        </section>
      </main>

      <SetasDaBorda ladoEsquerdo={posicao <= BORDA} ladoDireito={posicao >= 100 - BORDA} />

      {redirecionando && (
        <AvisoRedirecionamento destino={DESTINOS[redirecionando]} marca={redirecionando} onCancelar={cancelar} />
      )}

      <RodapePortal />
    </div>
  );
}
