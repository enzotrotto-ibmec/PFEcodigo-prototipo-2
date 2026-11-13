import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { asset } from "../utils/asset.js";

// Cortina de troca de página: a cada mudança de rota, dois painéis na cor da marca de destino
// cobrem a tela, o logo da marca aparece por um instante e os painéis sobem revelando a página nova. Roda antes da pintura (useLayoutEffect), então
// a página nova nunca "pisca" antes da cortina. Na primeira carga não faz nada (nem no StrictMode do desenvolvimento).
const CORES = {
  "/pkz": ["#020b18", "#0a2d6e"],
  "/one-to-one": ["#014c6f", "#00bbff"],
  "/fisioterapia": ["#0f5f58", "#2dd4bf"],
};
const PADRAO = ["#07111e", "#0a2d6e"];
// Logo branco de cada marca (o mesmo do cabeçalho/rodapé). Sem logo (home, privacidade): só a cortina.
const LOGOS = {
  "/pkz": { src: "img/logos/pkz-lab-horizontal-branco.svg", largura: 849, altura: 255, nome: "PKZ Lab" },
  "/one-to-one": { src: "img/logos/one-to-one-branco.svg", largura: 140, altura: 47, nome: "Studio One To One" },
  "/fisioterapia": { src: "img/logos/fisio-provisorio-branco.svg", largura: 260, altura: 60, nome: "Fisioterapia" },
};

export default function TransicaoPagina() {
  const { pathname } = useLocation();
  const raiz = useRef(null);
  const logoRef = useRef(null);
  const anterior = useRef(pathname); // rota já exibida: a primeira carga (e o remontar do StrictMode) não gera cortina

  useLayoutEffect(() => {
    if (anterior.current === pathname) return;
    anterior.current = pathname;
    // A página nova já está no DOM: leva o foco ao <main>, senão ele fica no link que sumiu
    document.getElementById("main")?.focus({ preventScroll: true });
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const rota = pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
    const chave = rota.split("/").slice(0, 2).join("/");
    const [fundo, detalhe] = CORES[chave] || PADRAO;
    const logo = LOGOS[chave];
    const img = logoRef.current;
    const [a, b] = raiz.current.querySelectorAll("div");
    a.style.background = detalhe;
    b.style.background = fundo;

    if (logo) {
      img.src = asset(logo.src);
      img.width = logo.largura;
      img.height = logo.altura;
    }
    // Com logo: cobre, o logo entra, segura um instante, sai, e os painéis sobem (~1,5 s).
    // Sem logo: só os painéis (~1 s), como antes.
    const saida = logo ? 0.7 : 0.1;
    const tl = gsap.timeline();
    tl.set(raiz.current, { display: "block" }).set([a, b], { yPercent: 0 }).set(img, { opacity: 0, y: 24 });
    if (logo) {
      tl.to(img, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }, 0.05).to(img, { opacity: 0, y: -16, duration: 0.25, ease: "power2.in" }, 0.55);
    }
    tl.to(a, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, saida)
      .to(b, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, saida + 0.12)
      .set(raiz.current, { display: "none" });
    return () => tl.kill();
  }, [pathname]);

  return (
    <div className="cortina" ref={raiz} aria-hidden="true">
      <div></div>
      <div></div>
      <img className="cortina-logo" ref={logoRef} alt="" />
    </div>
  );
}
