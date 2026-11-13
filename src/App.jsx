import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import TransicaoPagina from "./components/TransicaoPagina.jsx";
import Home from "./pages/Home.jsx";
const PaginaPkz = lazy(() => import("./pages/PaginaPkz.jsx"));
const PaginaOneToOne = lazy(() => import("./pages/PaginaOneToOne.jsx"));
const PaginaFisio = lazy(() => import("./pages/PaginaFisio.jsx"));
const AulaExperimental = lazy(() => import("./pages/AulaExperimental.jsx"));
const Privacidade = lazy(() => import("./pages/Privacidade.jsx"));
const NaoEncontrada = lazy(() => import("./pages/NaoEncontrada.jsx"));

// Mapa de rotas do site. Cada <Route> liga um endereço a um componente de página.
// No vanilla eram arquivos .html separados; aqui é tudo um único index.html.
//
//   vanilla                                  React
//   index.html                           →   /
//   pages/pkz.html                       →   /pkz
//   pages/pkz-aula-experimental.html     →   /pkz/aula-experimental
//   pages/one-to-one.html                →   /one-to-one
//   pages/one-to-one-aula-experimental   →   /one-to-one/aula-experimental
//   (novo) Fisioterapia, sem aula experimental →   /fisioterapia
//   pages/privacidade.html               →   /privacidade
//   404.html                             →   qualquer outro endereço (path="*")
export default function App() {
  return (
    <>
      <TransicaoPagina />
      {/* Suspense: enquanto o código da página carrega não mostra nada (a cortina cobre a troca) */}
      <Suspense fallback={null}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pkz" element={<PaginaPkz />} />
      <Route path="/pkz/aula-experimental" element={<AulaExperimental marca="pkz" />} />
      <Route path="/one-to-one" element={<PaginaOneToOne />} />
      <Route path="/one-to-one/aula-experimental" element={<AulaExperimental marca="oto" />} />
      <Route path="/fisioterapia" element={<PaginaFisio />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="*" element={<NaoEncontrada />} />
      </Routes>
      </Suspense>
    </>
  );
}
