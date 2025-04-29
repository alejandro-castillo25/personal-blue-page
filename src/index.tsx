import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);


  // document.documentElement.classList.add("dark");


  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
