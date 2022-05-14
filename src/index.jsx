import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./css/tailwind.css";
import "purecss";
import "./css/index.css";
import "@fontsource/roboto";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/open-sans/700.css";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
