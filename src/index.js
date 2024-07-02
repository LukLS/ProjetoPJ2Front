// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Ajuste o caminho se necessário
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
