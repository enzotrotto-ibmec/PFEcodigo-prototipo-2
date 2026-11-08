import { asset, srcsetDe } from "../../utils/asset.js";

// Texto de apresentação do portal, com as duas fotos das equipes.
export default function Apresentacao() {
  return (
    <section id="intro" aria-label="Apresentação">
      <div className="intro-inner">
        <div className="intro-text">
          <span className="intro-tag">Portal PKZ &amp; One To One</span>
          <h1>Duas estruturas, um só padrão de excelência</h1>
          <p>
            Reunimos em um só lugar a alta performance esportiva da PKZ e o acompanhamento
            individualizado do Studio One To One. Cada marca tem sua própria identidade, metodologia e
            equipe especializada, mas compartilham o mesmo compromisso: resultado real, com segurança e
            acompanhamento de perto.
          </p>
          <p>
            Escolha abaixo o universo que combina com o seu objetivo — treino de alto rendimento ou
            musculação com atendimento individualizado — e conheça de perto a estrutura de cada uma.
          </p>
        </div>

        <div className="intro-media" aria-hidden="true">
          <img
            className="intro-photo photo-pkz"
            src={asset("img/pkz/EquipePKZ-800.webp")}
            srcSet={srcsetDe("img/pkz/EquipePKZ")}
            sizes="(max-width: 860px) 290px, 320px"
            alt=""
            width="2760"
            height="1504"
            decoding="async"
            loading="lazy"
          />
          <img
            className="intro-photo photo-oto"
            src={asset("img/one-to-one/equipe-800.webp")}
            srcSet={srcsetDe("img/one-to-one/equipe")}
            sizes="(max-width: 860px) 235px, 260px"
            alt=""
            width="2760"
            height="1504"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
