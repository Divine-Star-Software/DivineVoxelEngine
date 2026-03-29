import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export type CompareNodeModes =
  | "Equal"
  | "NotEqual"
  | "LessThan"
  | "GreaterThan"
  | "LessOrEqual"
  | "GreaterOrEqual"
  | "Xor"
  | "Or"
  | "And";

export class CompareNode extends DVEFlowNode {
  static readonly TYPE = "CompareNode";

  static CreateDefault(mode: CompareNodeModes) {
    return FlowGraph.CreateNode({
      type: CompareNode.TYPE,
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
          valueType: "boolean",
        },
      ],
    });
  }

  get TYPE() {
    return CompareNode.TYPE;
  }
}
