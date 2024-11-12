import { StateSchema } from "./Schema/StateSchema";

export class StateTreeReader {
  startingIndex = 0;
  constructor(
    public schema: StateSchema,
    public defaultValue = 0,
    public tree: any[]
  ) {}

  getState(shapeState: number) {
    if (!this.tree.length) return this.defaultValue;
    let found = -1;
    let index = this.startingIndex;
    let curretNode = this.tree;

    while (found == -1) {
      curretNode =
        curretNode[index][this.schema.nodes[index].getValue(shapeState)];

      if (typeof curretNode == "number") {
        return curretNode;
      }
      for (let i = 0; i < curretNode.length; i++) {
        if (curretNode[i]) {
          index = i;
          break;
        }
      }
      if (typeof curretNode == "number") {
        return curretNode;
      }
    }

    return found;
  }
}
