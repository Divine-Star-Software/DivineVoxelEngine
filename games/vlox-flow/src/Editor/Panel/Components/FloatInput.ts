import { FlowEditorPanelComponentRegister } from "../FlowEditorPanelComponentRegister";
import Label from "./Shared/Label";

export const FloatInput = FlowEditorPanelComponentRegister.registerType<{
  getValue?(): number;
  value?: number;
  onInput?(value: number): void;
}>({
  type: "float-input",
  css: /* css */ `
.floatInputLine {
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
    container.classList.add("floatInputLine");
    const valueContainer = container.ownerDocument.createElement("div");
    valueContainer.className = "value";
    const valueInput = container.ownerDocument.createElement("input");
    valueInput.type = "number";
    valueInput.value = String(
      data.getValue ? data.getValue() : data.value || 0
    );
    valueContainer.append(valueInput);
    if (data.onInput)
      valueContainer.addEventListener("input", () =>
        data.onInput!(Number.parseFloat(valueInput.value))
      );
    container.append(Label(container.ownerDocument, label), valueContainer);
  },
});
