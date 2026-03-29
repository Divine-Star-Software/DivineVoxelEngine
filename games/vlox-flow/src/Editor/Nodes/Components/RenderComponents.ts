import { FlowEditorNodeComponentData } from "../FlowEditorNode.types";
import { FlowEditorNodeComponentRegister } from "../FlowEditorNodeComponentRegister";

export default function RenderComponents(
  container: HTMLElement,
  data: FlowEditorNodeComponentData<any>[]
) {
  for (const elm of data) {
    const div = container.ownerDocument.createElement("div");
    div.addEventListener("pointerdown", (event) => event.stopPropagation());
    const type = FlowEditorNodeComponentRegister.getType(elm.type);
    type.render(div, elm.data);
    container.append(div);
  }
}
