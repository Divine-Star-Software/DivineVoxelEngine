import "./core.css";
document.addEventListener("DOMContentLoaded", async () => {
    const { App } = await import("./App");
    document.body.append(await App());
});
