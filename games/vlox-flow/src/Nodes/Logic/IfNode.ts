import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";

export class IfNode extends DVEFlowNode {
  static readonly TYPE = "IfNode";

  static CreateDefault() {
    return FlowGraph.CreateNode({
      type: IfNode.TYPE,
      name: "If",
      properties: {},
      inputs: [
        {
          name: "input",
          value: 0,
          valueType: "boolean",
        },
      ],
      outputs: [
        {
          name: "true",
          value: -1,
          valueType: "flow",
        },
        {
          name: "false",
          value: -1,
          valueType: "flow",
        },
      ],
    });
  }

  get TYPE() {
    return IfNode.TYPE;
  }
}
