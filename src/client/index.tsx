import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";
import "./assets/scss/main.scss";

const rootEl = document.querySelector("#root");
if (rootEl === null) {
  throw new Error("Cannot find root element with that id");
}
const root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
