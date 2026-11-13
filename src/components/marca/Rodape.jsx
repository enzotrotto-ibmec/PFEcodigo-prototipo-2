import LinkInterno from "../LinkInterno.jsx";
import { IconeInstagram } from "../Icones.jsx";
import { asset } from "../../utils/asset.js";
import { MARCAS, outraMarca } from "../../data/marcas.js";

// Rodapé das páginas das marcas. Props: marca (data/marcas.js)
export default function Rodape({ marca }) {
  return (
    <footer className="site-footer-page">
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src={asset(marca.logo.src)}
            alt={marca.nome}
            width={marca.logo.largura}
            height={marca.logo.altura}
            loading="lazy"
          />
          <p>{marca.rodape.frase}</p>
        </div>

        <div className="footer-contact">
          <p>
            {marca.endereco.rua}
            <br />
            {marca.endereco.cidade}
          </p>
        </div>

        {/* Atalhos para as outras marcas do mesmo endereço (a Fisioterapia aparece em todas as páginas) */}
        <nav className="footer-links" aria-label="Outras marcas">
          <span className="footer-links-titulo">Conheça também</span>
          {[outraMarca(marca.id), MARCAS.fisio]
            .filter((m) => m.id !== marca.id)
            .map((m) => (
              <LinkInterno key={m.id} to={m.rota}>
                {m.nome}
              </LinkInterno>
            ))}
        </nav>

        {/* Link externo (Instagram): aqui o <a> continua, porque não é navegação interna */}
        {marca.instagram && (
          <a
            className="footer-social"
            href={marca.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${marca.instagram.usuario} (abre em nova aba)`}
          >
            <span className="footer-social-icon">
              <IconeInstagram />
            </span>
            <span>{marca.instagram.usuario}</span>
          </a>
        )}
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 {marca.rodape.direitos}. Todos os direitos reservados.</span>
        <LinkInterno className="footer-legal" to="/privacidade">
          Política de Privacidade
        </LinkInterno>
      </div>
    </footer>
  );
}
