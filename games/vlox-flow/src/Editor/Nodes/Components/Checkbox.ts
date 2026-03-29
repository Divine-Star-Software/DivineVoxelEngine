import { FlowEditorNodeComponentRegister } from "../FlowEditorNodeComponentRegister";

export const Checkbox = FlowEditorNodeComponentRegister.registerType<{
  onChange(checked: boolean): void;
  checked: boolean;
  label: string;
}>({
  type: "checkbox",
  css: /* css */ `
.checkbox {
 label {
  display: flex;
  flex-direction: row;
 }
}
`,
  render(container, data) {
    container.classList.add("checkbox");
    const document = container.ownerDocument;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.checked;
    checkbox.addEventListener("change", () =>
      data.onChange(Boolean(checkbox.checked))
    );
    const label = document.createElement("label");
    const text = document.createTextNode(data.label);
    label.append(checkbox, text);
    container.append(label);
  },
});
