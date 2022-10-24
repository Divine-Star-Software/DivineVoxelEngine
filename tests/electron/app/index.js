const { ipcRenderer } = require('electron');

const worlds = [
    "World1",
    "World2",
    "RunnerTest",
    "ShapeTest",
    "OceanTest",
    "SunLightTest",
    "LitFluidTest",
    "LightUpdateTest",
    "LightTest",
    "LightDebugTest"
  ];

  const div = document.getElementById("world-select-buttons");


  for (const world of worlds) {

    const button = document.createElement("button");
    button.innerText = world;
    button.addEventListener("click", () => {
      window.location = `/worlds/index.html?world=${world}`;
      ipcRenderer.send("world",world);
      console.log("sup");
    });
    button.className = "world-button";

    div.append(button);
  }