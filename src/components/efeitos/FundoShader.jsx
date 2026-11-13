import { useEffect, useRef } from "react";

// Fundo "premium" do hero: gradiente fluido (domain warping + ruído) em WebGL puro.
// As cores vêm das variáveis CSS da marca, então PKZ (escuro) e One To One (claro) ganham
// o mesmo efeito com paletas diferentes, sem mudar o shader.
//
// Cuidados: DPR limitado, pausa fora da tela/aba oculta, e sem WebGL o canvas some
// e sobra o fundo normal da página.

const VERTEX = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uBg;
uniform vec3 uA;
uniform vec3 uB;
uniform float uMix;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 q = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.045;

  // duas camadas de warp: dá o aspecto de seda/aurora
  vec2 w = vec2(fbm(q * 1.6 + vec2(0.0, t)), fbm(q * 1.6 + vec2(5.2, -t)));
  float n = fbm(q * 1.4 + 2.2 * w + vec2(t, 0.0));

  // o brilho segue o mouse de leve
  float glow = smoothstep(0.9, 0.0, distance(uv, uMouse));

  vec3 col = uBg;
  col = mix(col, uA, smoothstep(0.25, 0.8, n) * uMix);
  col = mix(col, uB, smoothstep(0.55, 1.0, n + 0.25 * glow) * uMix * 0.9);
  col += uB * glow * 0.10 * uMix;

  // vinheta + grão fino (tira o aspecto de degradê plano)
  col = mix(uBg, col, 1.0 - 0.7 * dot(uv - 0.5, uv - 0.5) * 2.0);
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}`;

// "#rrggbb" ou "#rgb" -> [r, g, b] de 0 a 1. Os temas só usam cores hexadecimais; qualquer outra cai no preto.
function paraRgb(valor) {
  const v = valor.trim().replace("#", "");
  const n = parseInt(v.length === 3 ? v.replace(/./g, "$&$&") : v.slice(0, 6), 16);
  return Number.isNaN(n) ? [0, 0, 0] : [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Variáveis de cor do tema usadas como padrão. A marca pode definir --shader-a, --shader-b e
// --shader-mix para uma paleta própria do efeito (ver pkz.css, one-to-one.css e fisio.css).
const COR_FUNDO = "--bg-base";
const COR_A = "--accent-strong";
const COR_B = "--accent-ink";
const INTENSIDADE = 0.9;
const ESCALA = 0.5; // fração da resolução CSS em que o canvas é desenhado

function compilar(gl, tipo, fonte) {
  const s = gl.createShader(tipo);
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function FundoShader() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) {
      canvas?.remove(); // sem WebGL: fica o fundo normal da página
      return;
    }

    const vs = compilar(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      canvas.remove();
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.remove();
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n) => gl.getUniformLocation(prog, n);
    const U = { res: u("uRes"), time: u("uTime"), mouse: u("uMouse"), bg: u("uBg"), a: u("uA"), b: u("uB"), mix: u("uMix") };

    // cores lidas do tema da marca (o canvas está dentro de .pagina[data-brand])
    const css = getComputedStyle(canvas);
    const ler = (nome) => css.getPropertyValue(nome).trim();
    gl.uniform3fv(U.bg, paraRgb(ler(COR_FUNDO)));
    gl.uniform3fv(U.a, paraRgb(ler("--shader-a") || ler(COR_A)));
    gl.uniform3fv(U.b, paraRgb(ler("--shader-b") || ler(COR_B)));
    gl.uniform1f(U.mix, Number(ler("--shader-mix")) || INTENSIDADE);

    const mouse = { x: 0.7, y: 0.6, alvoX: 0.7, alvoY: 0.6 };
    let visivel = true;
    let raf = 0;
    const t0 = performance.now();

    const medir = () => {
      // Meia resolução: é um degradê suave, o CSS estica o canvas e o visual fica igual.
      // Custa ~1/4 dos pixels (e da GPU) de uma tela cheia.
      const w = Math.max(1, Math.round(canvas.clientWidth * ESCALA));
      const h = Math.max(1, Math.round(canvas.clientHeight * ESCALA));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(U.res, w, h);
      }
    };

    const desenhar = (agora) => {
      medir();
      mouse.x += (mouse.alvoX - mouse.x) * 0.05;
      mouse.y += (mouse.alvoY - mouse.y) * 0.05;
      gl.uniform1f(U.time, (agora - t0) / 1000);
      gl.uniform2f(U.mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const laco = (agora) => {
      desenhar(agora);
      raf = visivel && !document.hidden ? requestAnimationFrame(laco) : 0;
    };
    const iniciar = () => {
      if (!raf) raf = requestAnimationFrame(laco);
    };

    const obs = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) iniciar();
    });
    obs.observe(canvas);

    const aoMover = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.alvoX = (e.clientX - r.left) / r.width;
      mouse.alvoY = 1 - (e.clientY - r.top) / r.height;
    };
    const aoVoltar = () => document.hidden || iniciar();
    window.addEventListener("pointermove", aoMover, { passive: true });
    document.addEventListener("visibilitychange", aoVoltar);
    const ro = new ResizeObserver(() => desenhar(performance.now()));
    ro.observe(canvas);
    iniciar();

    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("visibilitychange", aoVoltar);
      // Só em produção: no desenvolvimento o StrictMode monta o efeito duas vezes no mesmo canvas,
      // e um contexto já perdido não volta. Em produção libera o contexto ao sair da página.
      if (import.meta.env.PROD) gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="hero-shader" aria-hidden="true" />;
}
