// Monta o caminho de um arquivo da pasta public/assets/.
// Precisa do BASE_URL porque no GitHub Pages o site fica em /NOME-DO-REPO/, não na raiz.
// Ex.: asset("img/pkz/karate-800.webp") → "/PFE-2026-2-Grupo-1-React/assets/img/pkz/karate-800.webp"
export function asset(caminho) {
  return `${import.meta.env.BASE_URL}assets/${caminho}`;
}

// As fotos existem em três larguras (-480, -800 e -1280). Esta função monta o srcset
// a partir do nome base. Ex.: srcsetDe("img/pkz/karate") →
// ".../karate-480.webp 480w, .../karate-800.webp 800w, .../karate-1280.webp 1280w"
export function srcsetDe(base) {
  return [480, 800, 1280].map((largura) => `${asset(`${base}-${largura}.webp`)} ${largura}w`).join(", ");
}
