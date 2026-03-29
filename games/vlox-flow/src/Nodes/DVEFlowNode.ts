import type { NodeData } from "@amodx/flow/Node/FlowNode.types";

export interface DVEFlowNodeConstructor {
  readonly TYPE: string;
  new (data: NodeData): DVEFlowNode;
}

export interface DVEFlowNode {}

export abstract class DVEFlowNode {
  abstract readonly TYPE: string;
  constructor(public data: NodeData) {}
}
