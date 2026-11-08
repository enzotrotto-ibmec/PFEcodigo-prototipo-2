import { useState } from "react";
import { IconeAlfinete } from "../Icones.jsx";

// Seção "Nossa Localização" (id="location"): endereço, mapa e "Como chegar".
//
// O Google Maps pesa ~1 MB, então ele só carrega quando a pessoa clica em "Ver mapa".
// O estado mapaAberto decide o que aparece: o botão (false) ou o <iframe> do mapa (true).
// Props: marca
export default function Localizacao({ marca }) {
  const [mapaAberto, setMapaAberto] = useState(false);
  const { endereco } = marca;
  const tituloDoMapa = `Localização ${marca.nomeCurto}`;

  return (
    <section id="location" className="location-section">
      <h2>Nossa Localização</h2>
      <p className="location-address">
        <span className="location-address-header">
          <IconeAlfinete className="meta-icon" />
          <strong>{endereco.rua}</strong>
        </span>
        <span className="location-city">{endereco.cidade}</span>
      </p>

      <div className="map-wrapper" role={mapaAberto ? "region" : undefined} aria-label={mapaAberto ? `Mapa: ${tituloDoMapa}` : undefined}>
        {mapaAberto ? (
          <iframe
            src={endereco.mapaEmbed}
            title={tituloDoMapa}
            width="100%"
            height="400"
            allowFullScreen
            tabIndex={-1}
          ></iframe>
        ) : (
          <button type="button" className="map-facade" onClick={() => setMapaAberto(true)}>
            <IconeAlfinete tamanho={40} espessura={1.8} />
            <span className="map-facade-label">Ver mapa</span>
            <span className="map-facade-hint">Carrega o mapa do Google nesta página</span>
          </button>
        )}
      </div>

      <div className="location-actions">
        <a
          className="btn btn-primary"
          href={endereco.rota}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Como chegar: abrir a rota no Google Maps (abre em nova aba)"
        >
          Como chegar
        </a>
      </div>
    </section>
  );
}
