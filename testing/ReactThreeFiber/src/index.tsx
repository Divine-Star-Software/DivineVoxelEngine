//import { Approutes } from "Routes";
import { createRoot } from "react-dom/client";

import "./core.css";
import { App } from "App";

const root = createRoot(document.getElementById("root")!);
document.getElementById("root")!.classList.add("bp5-dark");

root.render(
  <>
    <App />
  </>
);

document.body.classList.add("bp5-dark");
