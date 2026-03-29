import { FlowEditorPanelComponentRegister } from "../FlowEditorPanelComponentRegister";
import Label from "./Shared/Label";

export const TextInput = FlowEditorPanelComponentRegister.registerType<{
  getText?(): string;
  text?: string;
  onInput?(value: string): void;
}>({
  type: "text-input",
  css: /* css */ `
.textInputLine {
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 120px auto;
  .label {
    grid-column: 1;
    display: flex;
    align-items: center;
  }
  .value {
    display: flex;
    align-items: center;
    grid-column: 2;
  }
}
`,
  render(container, label, data) {
    container.classList.add("textInputLine");
    const valueContainer = container.ownerDocument.createElement("div");
    valueContainer.className = "value";
    const valueInput = container.ownerDocument.createElement("input");
    valueInput.type = "text";
    valueInput.value = data.getText ? data.getText() : data.text || "";
    valueContainer.append(valueInput);
    if (data.onInput)
      valueContainer.addEventListener("input", () =>
        data.onInput!(valueInput.value)
      );
    container.append(Label(container.ownerDocument, label), valueContainer);
  },
});
