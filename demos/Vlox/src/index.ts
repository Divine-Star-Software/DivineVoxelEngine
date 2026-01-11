import "./core.css";
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(
    new URL(window.location.href).searchParams
  );

  if (!params.has("demo")) {
    const { DemoSelect } = await import("./DemoSelect");
    document.body.append(DemoSelect());
  } else {
    const { Demo: App } = await import("./Demo");
    document.body.append(await App());
  }
});
