// Ícones SVG usados em mais de um lugar. Cada ícone é um componente: <IconeSeta />, <IconeInstagram /> ...
// (No JSX os atributos com hífen viram camelCase: stroke-width → strokeWidth.)

// Propriedades comuns dos ícones de traço (estilo "Feather")
const traco = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

// Símbolo do WhatsApp definido uma vez por página; os botões usam <IconeWhatsapp />, que aponta para ele.
export function SimboloWhatsapp() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="icon-whatsapp" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </symbol>
    </svg>
  );
}

export function IconeWhatsapp({ className }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href="#icon-whatsapp" />
    </svg>
  );
}

export function IconeInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" {...traco}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconeSetaVoltar() {
  return (
    <svg className="back-arrow-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" {...traco}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function IconeSetaCima() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2.5" {...traco}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

// Alfinete de mapa: tamanho e espessura variam entre o endereço (20px) e o botão "Ver mapa" (40px)
export function IconeAlfinete({ tamanho = 20, espessura = 2.2, className }) {
  return (
    <svg className={className} width={tamanho} height={tamanho} viewBox="0 0 24 24" strokeWidth={espessura} {...traco}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Ícone genérico de traço 24x24: recebe o desenho (paths) como children.
// Ex.: <IconeTraco tamanho={22}><path d="..." /></IconeTraco>
export function IconeTraco({ tamanho = 20, className, children }) {
  return (
    <svg className={className} width={tamanho} height={tamanho} viewBox="0 0 24 24" strokeWidth="2" {...traco}>
      {children}
    </svg>
  );
}
