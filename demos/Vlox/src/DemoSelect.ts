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

function CheckBox({
  id,
  name,
  isChecked,
  onChecked,
}: {
  id: string;
  name: string;
  isChecked: boolean;
  onChecked: (isChecked: boolean) => void;
}) {
  const container = document.createElement("div");
  container.className = "debug-checkbox-container";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = isChecked;

  checkbox.addEventListener("change", () => {
    onChecked(checkbox.checked);
  });

  const label = document.createElement("label");
  label.htmlFor = id;
  label.innerText = name;

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

  const optionsContainer = document.createElement("div");
  optionsContainer.className = "options";
  optionsContainer.append(
    CheckBox({
      id: "debug-map",
      name: "Debug Map",
      isChecked: params.has("debug-map"),
      onChecked(isChecked) {
        if (isChecked) {
          params.set("debug-map", "true");
        } else {
          params.delete("debug-map");
        }
      },
    }),
    CheckBox({
      id: "pbr",
      name: "PBR",
      isChecked: params.has("pbr"),
      onChecked(isChecked) {
        if (isChecked) {
          params.set("pbr", "true");
        } else {
          params.delete("pbr");
        }
      },
    }),
/*     CheckBox({
      id: "webgpu",
      name: "WebGPU",
      isChecked: params.has("webgpu"),
      onChecked(isChecked) {
        if (isChecked) {
          params.set("webgpu", "true");
        } else {
          params.delete("webgpu");
        }
      },
    }), */
    CheckBox({
      id: "tools",
      name: "Tools",
      isChecked: params.has("tools"),
      onChecked(isChecked) {
        if (isChecked) {
          params.set("tools", "true");
        } else {
          params.delete("tools");
        }
      },
    }),
  );
  const demoConatiner = document.createElement("div");
  demoConatiner.className = "demos";

  for (const demo of demos) {
    demoConatiner.append(DemoOption(demo, params));
  }
  appContainer.append(optionsContainer, demoConatiner);
  document.body.append(appContainer);
}
