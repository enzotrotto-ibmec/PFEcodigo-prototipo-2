// Valores compartilhados pelos componentes do portal
export const BORDA = 10; // soltar com posição <= 10 (PKZ) ou >= 90 (One To One) abre a marca
export const TEMPO_AVISO_MS = 1500; // tempo do aviso "redirecionando..." (dá tempo de cancelar)

// Dados de cada marca no aviso de redirecionamento
export const DESTINOS = {
  pkz: { nome: "PKZ Lab", fundo: "#07111e", rota: "/pkz", logo: "img/logos/pkz-lab-empilhado-branco.svg" },
  oto: { nome: "Studio One To One", fundo: "#014c6f", rota: "/one-to-one", logo: "img/logos/one-to-one-branco.svg" },
};
