import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import { MathNode, MathNodeModes } from "../../../Nodes/Math/MathNode";
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
  const modes: MathNodeModes[] = [
    "Add",
    "Subtract",
    "Multiply",
    "Divide",
    "Max",
    "Min",
  ];
  register.registerNode({
    type: MathNode.TYPE,
    connectionAdded(node, nodeIO, connection) {
      UpdateNumericIOConnectionAdded("io", node, nodeIO, connection);
    },
    connectionRemoved(node, nodeIO, connection) {
      UpdateNumericIOConnectionRemoved("io", node, nodeIO, connection);
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
      category: "Math Standard",
      addNode(x, y, graphEditor) {
        graphEditor.addNode(x, y, MathNode.CreateDefault(mode));
      },
    });
  }
}
