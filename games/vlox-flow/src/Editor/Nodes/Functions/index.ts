import { FlowNodeRegister } from "@amodx-elms/flow";
import { OutputNode } from "../../../Nodes/Functions/OutputNode";
import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import { FunctionNode } from "../../../Nodes/Functions/FunctionNode";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  register.registerNode(
    {
      type: OutputNode.TYPE,
      enableFlowInput: true,
    },
    {
      type: FunctionNode.TYPE,
    }
  );
  palette.register(
    {
      name: "Function",
      category: "Function",
      addNode(x, y, editor) {
        editor.addNode(x, y, FunctionNode.CreateDefault());
      },
    },
    {
      name: "Output",
      category: "Function",
      addNode(x, y, editor) {
        editor.addNode(x, y, OutputNode.CreateDefault("Output", "numeric", 0));
      },
    }
  );
}
