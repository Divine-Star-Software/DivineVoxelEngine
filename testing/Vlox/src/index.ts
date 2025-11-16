import "./core.css";
document.addEventListener("DOMContentLoaded", async () => {
  const quantum = new URL(window.location.href).searchParams.has("quantum");
 // if (quantum) {
 //   const { App } = await import("./QuantumApp");
 //   document.body.append(await App());
 // } else {
    const { App } = await import("./BabylonApp");
    document.body.append(await App());
//  }
});
