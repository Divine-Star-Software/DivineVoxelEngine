import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export class PerlinNoise3DNode extends DVEFlowNode {
  static readonly TYPE = "PerlinNoise3DNode";

  static CreateDefault() {
    return FlowGraph.CreateNode({
      type: PerlinNoise3DNode.TYPE,
      name: "Perlin Noise 3D",
      properties: {
        noiseSegment: "Default",
      },
      inputs: [
        {
          name: "x",
          value: 0,
          valueType: "float",
        },
        {
          name: "y",
          value: 0,
          valueType: "float",
        },
        {
          name: "z",
          value: 0,
          valueType: "float",
        },
      ],
      outputs: [
        {
          name: "output",
          value: 0,
          valueType: "float",
        },
      ],
    });
  }

  get TYPE() {
    return PerlinNoise3DNode.TYPE;
  }
}
