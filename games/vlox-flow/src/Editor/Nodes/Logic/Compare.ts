import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import {
  CompareNode,
  CompareNodeModes,
} from "../../../Nodes/Logic/CompareNode";
import { FlowNodeRegister } from "@amodx-elms/flow";
import RenderComponents from "../Components/RenderComponents";
import { Select } from "../Components/Select";
import {
  UpdateNumericIOConnectionAdded,
  UpdateNumericIOConnectionRemoved,
} from "../Shared/UpdateNumericIO";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  const modes: CompareNodeModes[] = [
    "Equal",
    "NotEqual",
    "LessThan",
    "GreaterThan",
    "LessOrEqual",
    "GreaterOrEqual",
    "Xor",
    "Or",
    "And",
  ];
  register.registerNode({
    type: CompareNode.TYPE,
    connectionAdded(node, nodeIO, connection) {
      UpdateNumericIOConnectionAdded("input", node, nodeIO, connection);
    },
    connectionRemoved(node, nodeIO, connection) {
      UpdateNumericIOConnectionRemoved("input", node, nodeIO, connection);
    },
    renderBody(container, node) {
      RenderComponents(container, [
        Select({
          value: node.flowNode.properties.mode,
          onChange(mode) {
            node.flowNode.properties.mode = mode;
          },
          options: modes,
        }),
      ]);
    },
  });
  for (const mode of modes) {
    palette.register({
      name: mode,
      category: "Compare",
      addNode(x, y, graphEditor) {
        graphEditor.addNode(x, y, CompareNode.CreateDefault(mode));
      },
    });
  }
}
