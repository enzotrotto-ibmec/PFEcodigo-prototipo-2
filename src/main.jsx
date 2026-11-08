import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";

// O BrowserRouter fica em volta de todo o app para que <Link>, <Routes> e <Route>
// funcionem em qualquer componente.
// basename: no GitHub Pages o site mora em /NOME-DO-REPO/ (configurado no vite.config.js).
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
