import { FlowEditorPanelComponentRegister } from "../FlowEditorPanelComponentRegister";

export const Button = FlowEditorPanelComponentRegister.registerType<{
  onClick(): void;
}>({
  type: "button",
  css: /* css */`
  .button {
    width : 100%;
    padding: 5px;
    button {
      padding: 5px;
      background-color: #232323;
      border: 1px solid var(--primary);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: none;
      color: white;
      transition: .15s;
      &:hover {
        transition: .15s;
        background-color: #606060;
        cursor: pointer;
      }
    }
  }
  `,
  render(container, label, data) {
    container.classList.add("button");
    const button = container.ownerDocument.createElement("button");
    button.innerText = label;
    button.addEventListener("click", () => data.onClick());
    container.append(button);
  },
});
