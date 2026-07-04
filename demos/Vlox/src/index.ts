import "./core.css";
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(
    new URL(window.location.href).searchParams,
  );

  if (!params.has("demo")) {
    const { DemoSelect } = await import("./DemoSelect");
    DemoSelect();
  } else {
    const { Demo: App } = await import("./Demo");
    await App();
  }
});
