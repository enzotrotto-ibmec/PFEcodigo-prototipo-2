import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Movimento das páginas de marca. O site "vai aparecendo" conforme você desce (e se desfaz ao
// subir), tudo preso à rolagem com scrub. O estado inicial (escondido) só existe enquanto o
// GSAP roda: se o JS falhar, o conteúdo continua visível.

// Blocos de uma seção: desce pelos wrappers de filho único e abre as grades,
// para cada card/destaque/linha animar sozinho.
const GRADES = ".card-grid, .about-highlights, .fisio-etapas, .cta-band, .numeros-grid";
// Estes têm movimento próprio (seção travada + acende em sequência): ficam fora da entrada genérica
const PROPRIOS = ".about-lead, .highlight-item, .fisio-etapas";
function blocosDe(secao) {
  let filhos = [...secao.children];
  while (filhos.length === 1 && filhos[0].children.length) filhos = [...filhos[0].children];
  return filhos
    .flatMap((el) => (el.matches(GRADES) && el.children.length ? [...el.children] : [el]))
    .filter((el) => !el.matches(PROPRIOS));
}

// Troca cada palavra do texto por um <span class="pal-acende"> (mantém <strong> e outros filhos).
// reverter() devolve o HTML original.
function dividirPalavras(el) {
  const original = el.innerHTML;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nos = [];
  while (walker.nextNode()) nos.push(walker.currentNode);
  const palavras = [];
  nos.forEach((no) => {
    const frag = document.createDocumentFragment();
    no.textContent.split(/(\s+)/).forEach((parte) => {
      if (!parte) return;
      if (/^\s+$/.test(parte)) return frag.append(parte);
      const span = document.createElement("span");
      span.className = "pal-acende";
      span.textContent = parte;
      frag.append(span);
      palavras.push(span);
    });
    no.replaceWith(frag);
  });
  return { palavras, reverter: () => (el.innerHTML = original) };
}

// Altura do bloco sem o espaço que o pin acrescenta (um filho travado vira .pin-spacer, bem mais alto).
// Duas colunas (grade com mais de uma coluna): vale a maior; uma coluna: a soma.
function alturaNatural(bloco) {
  const alturas = [...bloco.children].map((c) => (c.classList.contains("pin-spacer") ? c.firstElementChild : c).offsetHeight);
  const colunas = getComputedStyle(bloco).gridTemplateColumns.split(" ").filter(Boolean).length;
  return colunas > 1 ? Math.max(...alturas) : alturas.reduce((a, b) => a + b, 0);
}

// Trava a seção no meio da tela e roda a linha do tempo conforme a rolagem (a página só volta a descer
// quando termina; rolar para cima desfaz). Se a seção for mais alta que a tela não dá para travar:
// nesse caso a mesma sequência acompanha a rolagem sem pin.
function travarEAcender(alvo, montar) {
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  montar(tl);
  const cabe = alvo.offsetHeight <= window.innerHeight * 0.95;
  return ScrollTrigger.create({
    animation: tl,
    trigger: alvo,
    scrub: 0.4,
    invalidateOnRefresh: true,
    // Guarda onde a trava termina: link de âncora (rolarParaSecao) leva a seção até lá, com o texto já aceso
    onRefresh: (self) => (self.pin ? (alvo.dataset.fimPin = Math.round(self.end)) : delete alvo.dataset.fimPin),
    ...(cabe
      ? { start: "center center", end: () => `+=${Math.round(window.innerHeight * Math.min(3, 0.4 + tl.duration() * 0.22))}`, pin: true, anticipatePin: 1 }
      : { start: "top 85%", end: "bottom 75%" }),
  });
}

// Cards com profundidade (tilt 3D + brilho que segue o mouse) e botões "magnéticos".
// Só em dispositivos com mouse; o toque não tem hover.
const CARTOES = ".eco-card, .service-card, .fisio-card, .cross-brand-card, .sport-card, .team-support-card, .trust-card, .numero-card";
function ligarInteracoes(raiz) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => {};

  const aoMover = (e) => {
    const card = e.target.closest?.(CARTOES);
    if (card) {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      gsap.to(card, { rotateY: (px - 0.5) * 8, rotateX: (0.5 - py) * 8, transformPerspective: 900, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    }
    const btn = e.target.closest?.(".btn");
    if (btn) {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    }
  };
  const aoSair = (e) => {
    const card = e.target.closest?.(CARTOES);
    if (card && !card.contains(e.relatedTarget)) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
    const btn = e.target.closest?.(".btn");
    if (btn && !btn.contains(e.relatedTarget)) gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
  };

  raiz.addEventListener("pointermove", aoMover);
  raiz.addEventListener("pointerout", aoSair);
  return () => {
    raiz.removeEventListener("pointermove", aoMover);
    raiz.removeEventListener("pointerout", aoSair);
  };
}

export function useAnimacoesScroll(raizRef) {
  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;
    const reversoes = []; // devolvem o texto dividido em palavras ao estado original

    const ctx = gsap.context(() => {
      // barra de progresso de leitura no topo
      gsap.fromTo(".scroll-progress", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      // cabeçalho ganha sombra e mais blur depois de rolar um pouco
      ScrollTrigger.create({
        start: 12, end: "max",
        onToggle: (self) => raiz.querySelector(".site-header")?.classList.toggle("is-scrolled", self.isActive),
      });

      // hero: o título entra palavra por palavra, depois o resto e a foto
      const entrada = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });
      entrada
        .from(".hero-content h1 .palavra-i", { yPercent: 115, duration: 1.1, ease: "power4.out", stagger: 0.09 })
        .from(".hero-content > :not(h1)", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.7")
        .from(".hero-image", { y: 50, opacity: 0, scale: 0.96, duration: 1.2 }, 0.3);

      // ao rolar: o texto sobe e esmaece enquanto a foto e o shader afundam
      const saida = { trigger: ".hero-wrap", start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".hero-content", { y: -70, opacity: 0.15, ease: "none", scrollTrigger: saida });
      gsap.to(".hero-image img", { yPercent: 10, scale: 1.1, ease: "none", scrollTrigger: saida });
      gsap.to(".hero-shader", { yPercent: 20, opacity: 0.3, ease: "none", scrollTrigger: saida });

      // todas as outras seções e o rodapé: cada bloco sobe e aparece conforme entra na tela
      const secoes = gsap.utils.toArray("main > section").filter((s) => !s.closest(".hero-wrap"));
      secoes.push(...gsap.utils.toArray(".site-footer-page"));
      secoes.forEach((secao) => {
        blocosDe(secao).forEach((el, i) => {
          // Já está dentro da tela ao abrir: nasce visível. Senão a rolagem ainda não "terminou" de
          // revelá-lo e ele ficaria meio apagado até o primeiro scroll (monitores altos).
          if (el.getBoundingClientRect().top < window.innerHeight * 0.98) return;
          gsap.fromTo(el, { y: 80, opacity: 0, scale: 0.97 }, {
            y: 0, opacity: 1, scale: 1, ease: "none",
            // fica 100% visível quando o topo do bloco chega a 70% da tela, antes de ele ocupar o meio
            scrollTrigger: { trigger: el, start: `top ${98 - (i % 3) * 3}%`, end: "top 70%", scrub: 0.5 },
          });
        });
      });

      // números: contam de 0 até o valor quando a faixa entra na tela
      gsap.utils.toArray(".numero-contador").forEach((el) => {
        const alvo = Number(el.dataset.valor);
        if (!Number.isFinite(alvo)) return;
        const conta = { n: 0 };
        gsap.to(conta, {
          n: alvo, duration: 1.8, ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(conta.n)),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        el.textContent = 0;
      });

      // imagens: "zoom out" suave enquanto o card atravessa a tela
      gsap.utils.toArray(".service-img-wrapper img, .fisio-etapas-img img, .about-container img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.25 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom 45%", scrub: 0.8 },
        });
      });

    }, raiz);

    // Sobre e etapas da Fisioterapia: seção travada + acende em sequência. Ficam num contexto próprio porque
    // "trava ou não" depende do tamanho da tela e é refeito se ele mudar (zoom, girar o celular, imagens que carregam).
    // Travar uma seção mais alta que a tela cortaria o conteúdo, então nesse caso não há pin.
    const sequencias = [];
    gsap.utils.toArray(".about-section").forEach((secao) => {
      const lead = secao.querySelector(".about-lead");
      if (!lead) return;
      const { palavras, reverter } = dividirPalavras(lead);
      reversoes.push(reverter);
      const itens = gsap.utils.toArray(".highlight-item", secao);
      sequencias.push({
        alvo: () => secao,
        montar: (tl) => {
          // Sobre: o texto de abertura acende palavra por palavra e depois os destaques entram um a um
          tl.fromTo(palavras, { opacity: 0.2 }, { opacity: 1, duration: 0.3, stagger: 0.15 })
            .fromTo(itens, { opacity: 0.2, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.4 }, ">-0.2")
            .to({}, { duration: 0.4 });
        },
      });
    });
    gsap.utils.toArray(".fisio-etapas").forEach((bloco) => {
      const etapas = gsap.utils.toArray(".fisio-lista li", bloco);
      const fill = bloco.querySelector(".fisio-linha-fill");
      if (!etapas.length) return;
      sequencias.push({
        // se o bloco inteiro não cabe na tela (celular), trava só a coluna das etapas
        alvo: () => (alturaNatural(bloco) <= window.innerHeight * 0.95 ? bloco : bloco.querySelector(".fisio-etapas-texto") || bloco),
        montar: (tl) => {
          // Fisioterapia: as etapas acendem uma a uma, com a linha se enchendo junto
          etapas.forEach((li, i) => {
            const num = li.querySelector(".fisio-num");
            tl.fromTo(li, { opacity: 0.25 }, { opacity: 1, duration: 0.5 }, i);
            if (num) tl.fromTo(num, { scale: 0.8 }, { scale: 1, duration: 0.5 }, i);
          });
          if (fill) tl.fromTo(fill, { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", duration: etapas.length - 0.5 }, 0);
          tl.to({}, { duration: 0.5 });
        },
      });
    });

    let ctxSeq = null;
    let chaveSeq = "";
    const montarSequencias = () => {
      const chave = sequencias.map((s) => `${s.alvo().className}:${s.alvo().offsetHeight <= window.innerHeight * 0.95}`).join("|");
      if (ctxSeq && chave === chaveSeq) return;
      ctxSeq?.revert();
      raiz.querySelectorAll("[data-fim-pin]").forEach((el) => delete el.dataset.fimPin);
      chaveSeq = chave;
      ctxSeq = gsap.context(() => {
        sequencias.forEach((s) => travarEAcender(s.alvo(), s.montar));
        ScrollTrigger.sort(); // triggers com pin precisam estar na ordem da página
      }, raiz);
    };
    montarSequencias();
    let timerResize = 0;
    const aoRedimensionar = () => {
      clearTimeout(timerResize);
      timerResize = setTimeout(montarSequencias, 250);
    };
    window.addEventListener("resize", aoRedimensionar);

    const desligar = ligarInteracoes(raiz);

    // imagens com loading="lazy" mudam a altura da página depois: refaz as sequências (se preciso) e recalcula os gatilhos
    const recalcular = () => {
      montarSequencias();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", recalcular);
    const t = setTimeout(recalcular, 600);
    document.fonts?.ready.then(recalcular).catch(() => {});

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", recalcular);
      desligar();
      window.removeEventListener("resize", aoRedimensionar);
      clearTimeout(timerResize);
      ctxSeq?.revert();
      ctx.revert();
      reversoes.forEach((f) => f());
    };
  }, [raizRef]);
}

// Página inicial (ecossistema): entrada do hero, manifesto que acende com a rolagem, cartões em
// sequência, fio que liga as três marcas e números que contam. O estado inicial (escondido) só
// existe enquanto o GSAP roda: se o JS falhar, o conteúdo continua visível.
export function useAnimacoesHome(raizRef) {
  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".scroll-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
      ScrollTrigger.create({
        start: 12, end: "max",
        onToggle: (self) => raiz.querySelector(".home-header")?.classList.toggle("is-scrolled", self.isActive),
      });

      // hero: título palavra por palavra, depois texto e botão; as três faixas aparecem em sequência
      gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 })
        .from(".tri-faixa", { opacity: 0, yPercent: 6, duration: 1.1, stagger: 0.14 })
        .from(".pal-i", { yPercent: 115, duration: 1.1, ease: "power4.out", stagger: 0.09 }, 0.25)
        .from(".hero-texto p, .hero-texto .btn", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.6");
      gsap.to(".tri-faixa > img", { yPercent: 8, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-texto", { y: -60, opacity: 0.1, ease: "none", scrollTrigger: { trigger: ".home-hero", start: "top top", end: "bottom top", scrub: true } });

      // manifesto: a tela TRAVA (pin) quando a seção ocupa a tela inteira e as palavras acendem uma a
      // uma conforme a rolagem; só depois de a última acender a página volta a descer.
      // Rolar para cima desfaz palavra por palavra. O tween vazio no fim segura a frase completa um instante.
      const palavras = gsap.utils.toArray(".manif .w");
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".manif", start: "top top",
          end: () => `+=${Math.round(window.innerHeight * (0.5 + palavras.length * 0.06))}`, // ~6% da altura da tela por palavra
          pin: true, scrub: 0.4, anticipatePin: 1, invalidateOnRefresh: true,
        },
      })
        .fromTo(palavras, { opacity: 0.2 }, { opacity: 1, duration: 0.3, stagger: 0.3 }) // o 0.2 só existe com o GSAP rodando: sem JS o texto fica legível
        .to({}, { duration: 0.4 });

      // ecossistema: o fio se desenha e os cartões entram um depois do outro
      gsap.fromTo(".fio-linha", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".eco-grid", start: "top 80%", end: "top 40%", scrub: true } });
      gsap.from(".fio-no", { scale: 0, stagger: 0.25, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: ".eco-grid", start: "top 80%" } });
      gsap.from(".eco-card", { y: 80, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: ".eco-grid", start: "top 75%" } });

      gsap.utils.toArray(".numero-contador").forEach((el) => {
        const alvo = Number(el.dataset.valor);
        if (!Number.isFinite(alvo)) return;
        const conta = { n: 0 };
        gsap.to(conta, { n: alvo, duration: 1.6, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(conta.n)), scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        el.textContent = 0;
      });
      gsap.from(".home-local > *", { y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".home-local", start: "top 80%" } });
    }, raiz);

    const desligar = ligarInteracoes(raiz);
    const recalcular = () => ScrollTrigger.refresh();
    window.addEventListener("load", recalcular);
    const t = setTimeout(recalcular, 600);
    // a fonte do título muda a altura do texto quando carrega: sem recalcular, os gatilhos ficam desalinhados
    document.fonts?.ready.then(recalcular).catch(() => {});

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", recalcular);
      desligar();
      ctx.revert();
    };
  }, [raizRef]);
}
