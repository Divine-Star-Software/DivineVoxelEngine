import { FlowGraphEditorNodePalette } from "../FlowGraphEditorNodePalette";
import { FlowNodeRegister } from "@amodx-elms/flow";
import { PerlinNoise3DNode } from "../../../../Flow/Nodes/Noise/PerlinNoise3DNode";
import { TextInput } from "../../Panel/Components/TextInput";

export default function (
  register: FlowNodeRegister,
  palette: FlowGraphEditorNodePalette
) {
  register.registerNode({
    type: PerlinNoise3DNode.TYPE,
    renderPanel(node) {
      return [
        {
          name: "Properties",
          collapsed: false,
          items: [
            TextInput("Noise Segment", {
              text: node.flowNode.properties.noiseSegment,
              onInput(value) {
                node.flowNode.properties.noiseSegment = value;
              },
            }),
          ],
        },
      ];
    },
  });

  palette.register({
    name: "Perlin Noise 3D",
    category: "Noise",
    addNode(x, y, graphEditor) {
      graphEditor.addNode(x, y, PerlinNoise3DNode.CreateDefault());
    },
  });
}
