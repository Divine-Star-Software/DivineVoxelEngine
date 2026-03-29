import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import {
  MathScientificNode,
  MathScientificNodeModes,
} from "../../../Nodes/Math/MathScientificNode";
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
  const modes: MathScientificNodeModes[] = [
    "Cos",
    "Sin",
    "Abs",
    "Exp",
    "Exp2",
    "Round",
    "Floor",
    "Ceiling",
    "Sqrt",
    "Log",
    "Tan",
    "ArcTan",
    "ArcCos",
    "ArcSin",
    "Sign",
    "Negate",
    "OneMinus",
    "Reciprocal",
    "ToDegrees",
    "ToRadians",
    "Fract",
  ];

  register.registerNode({
    type: MathScientificNode.TYPE,
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
      category: "Math Scientific",
      addNode(x, y, graphEditor) {
        graphEditor.addNode(x, y, MathScientificNode.CreateDefault(mode));
      },
    });
  }
}
