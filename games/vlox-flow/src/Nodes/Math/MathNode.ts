import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export type MathNodeModes =
  | "Add"
  | "Subtract"
  | "Multiply"
  | "Divide"
  | "Max"
  | "Min";

export class MathNode extends DVEFlowNode {
  static readonly TYPE = "MathNode";
  
  static CreateDefault(mode: MathNodeModes) {
    return FlowGraph.CreateNode({
      type: MathNode.TYPE,
      name: mode,
      properties: {
        mode,
      },
      inputs: [
        {
          name: "left",
          value: 0,
          valueType: "numeric",
        },
        {
          name: "right",
          value: 0,
          valueType: "numeric",
        },
      ],
      outputs: [
        {
          name: "output",
          value: 0,
          valueType: "numeric",
        },
      ],
    });
  }

  get TYPE() {
    return MathNode.TYPE;
  }
}
