//import { Approutes } from "Routes";
import { createRoot } from "react-dom/client";

import "./core.css";

const quantum = new URL(window.location.href).searchParams.has("quantum");

const root = createRoot(document.getElementById("root")!);
document.getElementById("root")!.classList.add("bp5-dark");

if (quantum) {
  const { App } = await import("./QuantumApp");
  root.render(
    <>
      <App />
    </>
  );
} else {
  const { App } = await import("./BabylonApp");
  root.render(
    <>
      <App />
    </>
  );
}

document.body.classList.add("bp5-dark");
