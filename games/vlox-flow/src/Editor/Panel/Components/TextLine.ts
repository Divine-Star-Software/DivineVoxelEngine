import { FlowEditorPanelComponentRegister } from "../FlowEditorPanelComponentRegister";
import Label from "./Shared/Label";

export const TextLine = FlowEditorPanelComponentRegister.registerType<{
  getText?(): string;
  text?: string;
}>({
  type: "text-line",
  css: /* css */ `
.textLine {
  min-height: 30px;
  display: grid;
  grid-template-columns: 1fr auto;
  .label {
    grid-column: 1;
    display: flex;
    align-items: center;
  }
  .value {
    grid-column: 2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: end;
    opacity: 0.8;
    margin: 5px;
    margin-top: 6px;
    max-width: 200px;
    user-select: text;
  }
}
`,
  render(container, label, data) {
    container.classList.add("textLine");
    const valueContainer = container.ownerDocument.createElement("div");
    valueContainer.className = "value";
    const valueText = container.ownerDocument.createElement("p");
    valueText.innerText = data.getText ? data.getText() : data.text || "";
    valueContainer.append(valueText);
    container.append(Label(container.ownerDocument, label), valueContainer);
  },
});
