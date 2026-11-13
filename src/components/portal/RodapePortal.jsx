import { IconeInstagram } from "../Icones.jsx";
import { asset } from "../../utils/asset.js";
import { MARCAS } from "../../data/marcas.js";

// Rodapé do portal: logos das três marcas e cards do Instagram (a Fisioterapia ainda não tem perfil).
export default function RodapePortal() {
  return (
    <footer id="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <img src={asset("img/logos/pkz-lab-horizontal-branco.svg")} alt="PKZ Lab" width="849" height="255" loading="lazy" />
            <span className="footer-amp" aria-hidden="true">
              &amp;
            </span>
            <span className="visually-hidden"> e </span>
            <img src={asset("img/logos/one-to-one-branco.svg")} alt="Studio One To One" width="140" height="47" loading="lazy" />
            <span className="footer-amp" aria-hidden="true">
              &amp;
            </span>
            <span className="visually-hidden"> e </span>
            <img src={asset("img/logos/fisio-provisorio-branco.svg")} alt="Fisioterapia" width="260" height="60" loading="lazy" />
          </span>
          <p>Três estruturas parceiras, um só padrão de treino, cuidado e performance.</p>
        </div>

        <div className="footer-social">
          <CardInstagram classe="social-pkz" nome="PKZ" instagram={MARCAS.pkz.instagram} />
          <CardInstagram classe="social-oto" nome="One To One" instagram={MARCAS.oto.instagram} />
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 PKZ, Studio One To One e Fisioterapia. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

// Card de Instagram (link externo). Props: classe, nome, instagram { url, usuario }
function CardInstagram({ classe, nome, instagram }) {
  return (
    <a
      className={`social-card ${classe}`}
      href={instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${nome} ${instagram.usuario}, Instagram (abre em nova aba)`}
    >
      <span className="social-icon">
        <IconeInstagram />
      </span>
      <span className="social-text">
        <strong>{nome}</strong>
        <small>{instagram.usuario}</small>
      </span>
    </a>
  );
}
