import { DVEFlowNodeConstructor } from "./DVEFlowNode";

export class DVEFlowNodeRegister {
  static nodes = new Map<string, DVEFlowNodeConstructor>();
  static register(...nodes: DVEFlowNodeConstructor[]) {
    for (const node of nodes) {
      this.nodes.set(node.TYPE, node);
    }
  }

  static get(type: string) {
    const node = this.nodes.get(type);
    if (!node) throw new Error(`Could not find node with type ${type}`);
    return node;
  }
}
