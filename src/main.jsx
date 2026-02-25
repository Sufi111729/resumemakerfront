import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { applyMockAdapter } from "./api/mockServer";
import { http } from "./api/http";

if (import.meta.env.VITE_USE_MOCK === "true") {
  applyMockAdapter(http);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
