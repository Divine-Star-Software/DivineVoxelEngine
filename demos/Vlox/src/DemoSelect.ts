type DemoData = {
  id: string;
  title: string;
};
const demos: DemoData[] = [
  {
    id: "classic",
    title: "Classic",
  },
  {
    id: "dream-ether",
    title: "Dream Ether",
  },
  {
    id: "dread-ether",
    title: "Dread Ether",
  },
  {
    id: "forest",
    title: "Forest",
  },
  {
    id: "dread-and-dream-world",
    title: "Dread And Dream World",
  },
];

function DemoOption(data: DemoData, params: URLSearchParams) {
  const div = document.createElement("div");
  div.className = "demo-container";
  div.addEventListener("click", () => {
    params.set("demo", data.id);
    window.location.search = params.toString();
  });
  const text = document.createElement("p");
  text.innerText = data.title;
  div.append(text);
  return div;
}

function DebugMapCheckbox(params: URLSearchParams) {
  const container = document.createElement("div");
  container.className = "debug-checkbox-container";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "debug-map";
  checkbox.checked = params.has("debug-map");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      params.set("debug-map", "true");
    } else {
      params.delete("debug-map");
    }
  });

  const label = document.createElement("label");
  label.htmlFor = "debug-map";
  label.innerText = "Debug Map";

  container.append(checkbox, label);
  return container;
}

export function DemoSelect() {
  const appContainer = document.createDocumentFragment();
  const title = document.createElement("h1");
  title.className = "demo-title";
  title.innerText = `Divine Voxel Engine Demos`;
  appContainer.append(title);

  const params = new URLSearchParams(window.location.search);



  const demoConatiner = document.createElement("div");
  demoConatiner.className = "demos";
    demoConatiner.append(DebugMapCheckbox(params));
  for (const demo of demos) {
    demoConatiner.append(DemoOption(demo, params));
  }
  appContainer.append(demoConatiner);
  return appContainer;
}
