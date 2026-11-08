// Desenho do halter (SVG) que fica no meio da barra do portal.
export default function DesenhoHalter() {
  const anilha = { fill: "url(#pg)", strokeWidth: 0.4 };
  const risco = { stroke: "#555", strokeWidth: 1.3, strokeLinecap: "round", y1: 15.5, y2: 20.5 };
  return (
    <svg viewBox="0 0 76 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e2e2" />
          <stop offset="45%" stopColor="#c4c4c4" />
          <stop offset="100%" stopColor="#8c8c8c" />
        </linearGradient>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#aaa" />
          <stop offset="55%" stopColor="#777" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="2" width="9" height="32" rx="2.5" stroke="#666" {...anilha} />
      <rect x="9.5" y="8" width="5" height="20" rx="2" stroke="#777" {...anilha} />
      <rect x="14.5" y="15" width="47" height="6" rx="3" fill="url(#bg)" />
      <line x1="28" x2="28" {...risco} />
      <line x1="34" x2="34" {...risco} />
      <line x1="40" x2="40" {...risco} />
      <line x1="46" x2="46" {...risco} />
      <rect x="61.5" y="8" width="5" height="20" rx="2" stroke="#777" {...anilha} />
      <rect x="66.5" y="2" width="9" height="32" rx="2.5" stroke="#666" {...anilha} />
    </svg>
  );
}
