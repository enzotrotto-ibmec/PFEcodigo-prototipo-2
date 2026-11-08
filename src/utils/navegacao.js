// Ajudantes de rolagem usados pelos links internos (components/LinkInterno.jsx).

// Leva a tela para o topo. Usado ao trocar de página: o React Router troca o
// componente, mas não rola a tela sozinho.
// behavior "instant": o CSS tem scroll-behavior: smooth, e uma rolagem suave seria
// interrompida no meio pela troca de página.
export function irParaTopo() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

// Rola até a seção com esse id (ex.: "sobre").
// Se o link também troca de página (ex.: da Aula Experimental para /pkz#sobre),
// a seção ainda não existe no momento do clique: tentamos de novo a cada quadro
// (requestAnimationFrame) até ela aparecer, por no máximo ~1 segundo.
export function rolarParaSecao(id) {
  let tentativas = 0;
  function tentar() {
    const secao = document.getElementById(id);
    if (secao) {
      secao.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (tentativas < 60) {
      tentativas++;
      requestAnimationFrame(tentar);
    }
  }
  requestAnimationFrame(tentar);
}
