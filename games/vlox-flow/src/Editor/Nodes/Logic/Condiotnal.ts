import { FlowNodeRegister } from "@amodx-elms/flow";
import { IfNode } from "../../../Nodes/Logic/IfNode";
import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  register.registerNode({
    type: IfNode.TYPE,
    enableFlowInput: true,
  });
  palette.register({
    name: "If",
    category: "Logic",
    addNode(x, y, editor) {
      editor.addNode(x, y, IfNode.CreateDefault());
    },
  });
}
