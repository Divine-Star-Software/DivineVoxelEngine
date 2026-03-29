import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export type MathScientificNodeModes =
  | "Cos"
  | "Sin"
  | "Abs"
  | "Exp"
  | "Exp2"
  | "Round"
  | "Floor"
  | "Ceiling"
  | "Sqrt"
  | "Log"
  | "Tan"
  | "ArcTan"
  | "ArcCos"
  | "ArcSin"
  | "Sign"
  | "Negate"
  | "OneMinus"
  | "Reciprocal"
  | "ToDegrees"
  | "ToRadians"
  | "Fract";

export class MathScientificNode extends DVEFlowNode {
  static readonly TYPE = "MathScientificNode";
  static CreateDefault(mode: MathScientificNodeModes) {
    return FlowGraph.CreateNode({
      type: MathScientificNode.TYPE,
      name: mode,
      properties: {
        mode,
      },
      inputs: [
        {
          name: "input",
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
    return MathScientificNode.TYPE;
  }
}
