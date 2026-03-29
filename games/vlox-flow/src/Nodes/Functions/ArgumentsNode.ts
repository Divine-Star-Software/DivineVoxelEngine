import { FlowGraph } from "@amodx/flow/Graph/FlowGraph";
import { DVEFlowNode } from "../DVEFlowNode";
import { NodeOutputData } from "@amodx/flow/Node/FlowNode.types";

export class ArgumentsNode extends DVEFlowNode {
  static readonly TYPE = "ArgumentsNode";
  static CreateDefault(argumentName: string, defaultValue:any|null,outputs: NodeOutputData[]) {
    return FlowGraph.CreateNode({
      type: ArgumentsNode.TYPE,
      name: argumentName,
      outputs,
      properties: {
        argumentName,
        defaultValue
      },
    });
  }

  get TYPE() {
    return ArgumentsNode.TYPE;
  }
}
