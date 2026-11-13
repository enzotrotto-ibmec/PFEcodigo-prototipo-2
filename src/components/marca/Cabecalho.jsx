import { useState } from "react";
import LinkInterno from "../LinkInterno.jsx";
import { IconeSetaVoltar } from "../Icones.jsx";
import { asset } from "../../utils/asset.js";
import { MARCAS, outraMarca } from "../../data/marcas.js";

// Cabeçalho das páginas das marcas: voltar ao portal, link para a outra marca, logo e menu.
//
// Props:
//   marca              → objeto da marca (data/marcas.js)
//   onAbrirContato     → função chamada no "Contato" (a janela de contato fica no LayoutMarca)
//   contatoDestacado   → true na Aula Experimental: o "Contato" ganha o estilo de pílula
//
// Menu hambúrguer: o useState guarda se o menu está aberto. No vanilla o JS adicionava e
// removia a classe "nav-open"; aqui a classe depende do estado e o React atualiza sozinho.
export default function Cabecalho({ marca, onAbrirContato, contatoDestacado = false }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const outra = outraMarca(marca.id);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    // Esc fecha o menu (quando o foco está no cabeçalho, ex.: no botão ou num link do menu)
    <header className="site-header" onKeyDown={(e) => e.key === "Escape" && fecharMenu()}>
      <nav className="navbar" aria-label="Principal">
        <div className="nav-left">
          <LinkInterno to="/" className="back-link" aria-label="Voltar para o Portal">
            <IconeSetaVoltar />
            <span className="back-text">Portal</span>
          </LinkInterno>
          <LinkInterno to={outra.rota} className="cross-brand-nav-link">
            {outra.nome} →
          </LinkInterno>
        </div>

        <div className="nav-center">
          <LinkInterno
            to={marca.rota}
            secao="home"
            className="brand-logo-link"
            aria-label={`${marca.nome} — página inicial`}
          >
            <img
              className="brand-logo"
              src={asset(marca.logo.src)}
              alt=""
              width={marca.logo.largura}
              height={marca.logo.altura}
            />
          </LinkInterno>
        </div>

        <div className="nav-right">
          <button
            type="button"
            className={menuAberto ? "menu-toggle active" : "menu-toggle"}
            aria-label="Menu de navegação"
            aria-expanded={menuAberto}
            aria-controls="primary-navigation"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <ul id="primary-navigation" className={menuAberto ? "nav-links nav-open" : "nav-links"}>
            <li>
              <LinkInterno to={marca.rota} secao="sobre" className="nav-link" onClick={fecharMenu}>
                Sobre
              </LinkInterno>
            </li>
            <li>
              <LinkInterno to={marca.rota} secao="location" className="nav-link" onClick={fecharMenu}>
                Localização
              </LinkInterno>
            </li>
            {marca.id !== "fisio" && (
              <li>
                <LinkInterno to={MARCAS.fisio.rota} className="nav-link" onClick={fecharMenu}>
                  {MARCAS.fisio.nome}
                </LinkInterno>
              </li>
            )}
            <li>
              {/* Não troca de página, só abre a janela: por isso é <button>, não link */}
              <button
                type="button"
                className={contatoDestacado ? "nav-link nav-link-highlight" : "nav-link"}
                onClick={() => {
                  fecharMenu();
                  onAbrirContato();
                }}
              >
                Contato
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
