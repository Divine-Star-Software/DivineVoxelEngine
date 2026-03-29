import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import { FlowNodeRegister } from "@amodx-elms/flow";
import { ArgumentsNode } from "../../../../Flow/Nodes/Functions/ArgumentsNode";
import { NodeOutputData } from "@amodx/flow/Node/FlowNode.types";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette,
  argumentData: {
    name: string;
    outputs: NodeOutputData[];
    defaultValue: any | null;
  }[]
) {
  register.registerNode({
    type: ArgumentsNode.TYPE,
  });

  for (const argument of argumentData) {
    palette.register({
      name: argument.name,
      category: "Arguments",
      addNode(x, y, graphEditor) {
        graphEditor.addNode(
          x,
          y,
          ArgumentsNode.CreateDefault(
            argument.name,
            argument.defaultValue,
            argument.outputs
          )
        );
      },
    });
  }
}
