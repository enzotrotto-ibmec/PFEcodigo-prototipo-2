// Setas "solte para entrar" que pulsam nas bordas quando o halter chega perto de uma ponta.
// Props: ladoEsquerdo, ladoDireito (true = seta acesa)
export default function SetasDaBorda({ ladoEsquerdo, ladoDireito }) {
  const traco = { strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <>
      <div className={ladoEsquerdo ? "arrow-hint l on" : "arrow-hint l"} id="arr-l" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18L9 12L15 6" stroke="#ffffff" strokeWidth="2.5" {...traco} />
          <path d="M15 18L9 12L15 6" stroke="#07111e" strokeWidth="5" opacity="0.6" {...traco} />
        </svg>
      </div>
      <div className={ladoDireito ? "arrow-hint r on" : "arrow-hint r"} id="arr-r" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6L15 12L9 18" stroke="#032b43" strokeWidth="2.5" {...traco} />
          <path d="M9 6L15 12L9 18" stroke="#ffffff" strokeWidth="5" opacity="0.6" {...traco} />
        </svg>
      </div>
    </>
  );
}
