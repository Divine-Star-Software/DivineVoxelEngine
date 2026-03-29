import { FlowEditorNodeComponentRegister } from "../FlowEditorNodeComponentRegister";

export const Select = FlowEditorNodeComponentRegister.registerType<{
  onChange(selected: string): void;
  value: string;
  options: string[];
}>({
  type: "select",
  css: /* css */ `
.select {
  position: relative;
  .dropdown {
    position: relative;
    height: 30px;
    background-color: #464646;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: white;
      color: #464646;
      cursor: pointer;
    }
  
  }
  .options {
    position: absolute;
    top: 30px;
    width: 100%;
    background-color: #464646;
    display: flex;
    flex-direction: column;
    text-align: center;
    .option {
      height: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        background-color: white;
        color: #464646;
        cursor: pointer;
      }
    }
  }
}
`,
  render(container, data) {
    container.classList.add("select");
    const document = container.ownerDocument;

    const dropDown = document.createElement("div");
    dropDown.classList.add("dropdown");

    dropDown.innerText = data.value;
    dropDown.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      optionContainer.style.display = "flex";
      container.addEventListener(
        "pointerleave",
        () => {
          optionContainer.style.display = "none";
        },
        { once: true }
      );
    });

    const optionContainer = document.createElement("div");
    optionContainer.classList.add("options");
    optionContainer.style.display = "none";

    for (const optionValue of data.options) {
      const option = document.createElement("div");
      option.innerText = optionValue;
      option.classList.add("option");
      option.addEventListener("pointerdown", () => {
        dropDown.innerText = optionValue;
        data.onChange(optionValue);
        optionContainer.style.display = "none";
      });
      optionContainer.append(option);
    }

    container.append(dropDown, optionContainer);
  },
});
