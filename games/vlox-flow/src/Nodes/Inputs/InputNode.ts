import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export class InputNode extends DVEFlowNode {
  static readonly TYPE = "InputNode";
  static CreateDefault(name: string, valueType: string, initalValue: any = 0) {
    return FlowGraph.CreateNode({
      type: "InputNode",
      name,
      properties: {
        type: name,
      },
      outputs: [
        {
          name: "output",
          value: initalValue,
          valueType,
        },
      ],
    });
  }

  get TYPE() {
    return InputNode.TYPE;
  }
}
