import { Routes, Route } from "react-router-dom";
import Portal from "./pages/Portal.jsx";
import PaginaPkz from "./pages/PaginaPkz.jsx";
import PaginaOneToOne from "./pages/PaginaOneToOne.jsx";
import AulaExperimental from "./pages/AulaExperimental.jsx";
import Privacidade from "./pages/Privacidade.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

// Mapa de rotas do site. Cada <Route> liga um endereço a um componente de página.
// No vanilla eram arquivos .html separados; aqui é tudo um único index.html.
//
//   vanilla                                  React
//   index.html                           →   /
//   pages/pkz.html                       →   /pkz
//   pages/pkz-aula-experimental.html     →   /pkz/aula-experimental
//   pages/one-to-one.html                →   /one-to-one
//   pages/one-to-one-aula-experimental   →   /one-to-one/aula-experimental
//   pages/privacidade.html               →   /privacidade
//   404.html                             →   qualquer outro endereço (path="*")
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portal />} />
      <Route path="/pkz" element={<PaginaPkz />} />
      <Route path="/pkz/aula-experimental" element={<AulaExperimental marca="pkz" />} />
      <Route path="/one-to-one" element={<PaginaOneToOne />} />
      <Route path="/one-to-one/aula-experimental" element={<AulaExperimental marca="oto" />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  );
}
