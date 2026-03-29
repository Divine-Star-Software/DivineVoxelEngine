import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export class OutputNode extends DVEFlowNode {
  static readonly TYPE = "OutputNode";
  static CreateDefault(name: string, valueType: string, initalValue: any = 0) {
    return FlowGraph.CreateNode({
      type: OutputNode.TYPE,
      name,
      properties: {
        type: name,
      },
      inputs: [
        {
          name: "output",
          value: initalValue,
          valueType,
        },
      ],
    });
  }

  get TYPE() {
    return OutputNode.TYPE;
  }
}
