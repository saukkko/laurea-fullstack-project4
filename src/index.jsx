import React from "react";
import ReactDOM from "react-dom/client";
import "purecss";
import "./css/index.css";
import "@fontsource/roboto";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
