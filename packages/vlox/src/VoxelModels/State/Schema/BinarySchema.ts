import { BinarySchemaNode } from "./BinarySchemaNode";
import { BinarySchemaNodeData } from "../State.types";

export class BinarySchema {
  nodeMap = new Map<string, BinarySchemaNode>();
  nodes: BinarySchemaNode[] = [];
  constructor(schema: BinarySchemaNodeData[]) {
    for (const node of schema) {
      if (node.type == "binary") {
        const newNode = new BinarySchemaNode(node);
        this.nodes.push(newNode);
        this.nodeMap.set(node.id, newNode);
      }
    }
  }

  private _value = 0;
  startEncoding() {
    this._value = 0;
    return this;
  }

  getNmber(id: string) {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Node with ${id} does not exist.`);
    return node.getValue(this._value);
  }

  getValue(id: string) {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Node with ${id} does not exist.`);
    if (!node.valuePalette)
      throw new Error(`Node with ${id} does not have a value palette.`);
    return node.valuePalette.getStringId(node.getValue(this._value));
  }

  setNumber(id: string, value: number) {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Node with ${id} does not exist.`);
    this._value = node.setValue(this._value, value);
    return this;
  }

  setValue(id: string, value: string) {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Node with ${id} does not exist.`);
    if (!node.valuePalette)
      throw new Error(`Node with ${id} does not have a value palette.`);
    this._value = node.setValue(
      this._value,
      node.valuePalette.getNumberId(value)
    );
    return this;
  }

  getEncoded() {
    return this._value;
  }
}
