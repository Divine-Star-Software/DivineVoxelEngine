import "./core.css";
import App from "./App";
document.addEventListener("DOMContentLoaded", async () => {
  document.body.append(await App());
});
