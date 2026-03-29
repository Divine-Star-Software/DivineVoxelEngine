import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export class FunctionNode extends DVEFlowNode {
  static readonly TYPE = "FunctionNode";
  static CreateDefault() {
    return FlowGraph.CreateNode({
      type: FunctionNode.TYPE,
      name: "Function",
      properties: {},
      outputs: [
        {
          name: "output",
          value: -1,
          valueType: "flow",
        },
      ],
    });
  }

  get TYPE() {
    return FunctionNode.TYPE;
  }
}
