import { BinarySchemaNode } from "./BinarySchemaNode";
import { VoxelBinaryStateSchemaNode } from "../State.types";

type StateObject = (string | number)[];
export class BinarySchema {
  nodeMap = new Map<string, BinarySchemaNode>();
  nodes: BinarySchemaNode[] = [];
  constructor(schema: VoxelBinaryStateSchemaNode[]) {
    for (const node of schema) {
      const newNode = new BinarySchemaNode(node);
      this.nodes.push(newNode);
      this.nodeMap.set(node.name, newNode);
    }
  }

  private _value = 0;

  toStateString() {
    if (!this.nodes.length) return "*";
    let stateString: string[] = [];
    for (let i = 0; i < this.nodes.length; i++) {
      stateString.push(
        `${this.nodes[i].name}=${String(this.get(this.nodes[i].name))}`
      );
    }
    return stateString.join(",");
  }

  readString(stateString: string) {
    if (stateString == "*") return 0;
    const split = stateString.split(",");
    let ecnoded = 0;
    for (const pair of split) {
      const [key, v] = pair.split("=");
      if (v == "*") continue;
      const node = this.nodeMap.get(key);
      if (!node) continue;
      if (node.valuePalette) {
        const value = node.valuePalette.getNumberId(v);
        if (value === undefined)
          throw new Error(
            `Binary schema string node value with id ${v} does not exist.`
          );
        ecnoded = node.setValue(ecnoded, value);
      } else {
        ecnoded = node.setValue(ecnoded, Number(v));
      }
    }
    return ecnoded;
  }

  fromStateObject(stateObject: StateObject) {
    let encodedValue = 0;

    for (let i = 0; i < stateObject.length; i += 2) {
      const key = stateObject[i];
      if (typeof key !== "string") continue;
      const value = stateObject[i + 1];
      const node = this.nodeMap.get(key);
      if (!node) continue;

      if (typeof value == "string") {
        if (!node.valuePalette) continue;
        encodedValue = node.setValue(
          encodedValue,
          node.valuePalette!.getNumberId(value) || 0
        );
        continue;
      }
      encodedValue = node.setValue(encodedValue, value);
    }

    return encodedValue;
  }

  getStateObject(stateValue: number) {
    const stateArray: StateObject = [];
    for (const node of this.nodes) {
      if (node.valuePalette) {
        stateArray.push(
          node.name,
          node.valuePalette.getStringId(node.getValue(stateValue))
        );
        continue;
      }
      stateArray.push(node.name, node.getValue(stateValue));
    }
    return stateArray;
  }

  compareString(stateString: string, ecnoded: number): boolean {
    if (stateString == "*") return true;
    const split = stateString.split(",");
    for (const pair of split) {
      const [key, v] = pair.split("=");
      if (v == "*") continue;
      const node = this.nodeMap.get(key);
      if (!node) continue;
      if (node.valuePalette) {
        const value = node.valuePalette.getNumberId(v);
        if (value === undefined)
          throw new Error(
            `Binary schema string node value  with id ${key} does not exist.`
          );
        if (node.getValue(ecnoded) !== value) {
          return false;
        }
      } else {
        if (node.getValue(ecnoded) !== Number(v)) {
          return false;
        }
      }
    }
    return true;
  }

  startEncoding(value = 0) {
    this._value = value;
    return this;
  }

  get(id: string): string | number {
    const node = this.nodeMap.get(id);
    if (!node) throw new Error(`Node with ${id} does not exist.`);
    if (node.valuePalette)
      return node.valuePalette.getStringId(node.getValue(this._value));
    return node.getValue(this._value);
  }

  getNumber(id: string) {
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
