import { TypedArrayRecord } from "../Constants/ByteData.js";
import { TypedNode } from "../Classes/TypedNode.js";
import { TNM } from "../NodeMaker.js";
import { DBOToBuffer } from "./DBOToBuffer.js";

export const ObjectToBuffer = {
  _name: "",

  _traverseObj(obj: any) {
    const node = TNM.object(<any>{});

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      this._name = key;

      if (value instanceof TypedNode) {
        node.value[key] = value;
        continue;
      }

      if (ArrayBuffer.isView(value)) {
        node.value[key] = this._addPrimitive(value);
        continue;
      }
      if (typeof value == "object" && !Array.isArray(value)) {
        node.value[key] = this._traverseObj(value);
        continue;
      }
      if (typeof value == "object" && Array.isArray(value)) {
        node.value[key] = this._traverseArray(value);
        continue;
      }

      node.value[key] = this._addPrimitive(value);
    }

    return node;
  },

  _traverseArray(array: any) {
    const node = TNM.array(<any[]>[]);

    for (const value of array) {
      if (value instanceof TypedNode) {
        node.value.push(value);
        continue;
      }
      if (ArrayBuffer.isView(value)) {
        node.value.push(this._addPrimitive(value));
        continue;
      }
      if (typeof value == "object" && !Array.isArray(value)) {
        node.value.push(this._traverseObj(value));
        continue;
      }
      if (typeof value == "object" && Array.isArray(value) && !ArrayBuffer.isView(value)) {
        node.value.push(this._traverseArray(value));
        continue;
      }
      node.value.push(this._addPrimitive(value));
    }


    return node;
  },

  _addPrimitive(node: any) {
    if (typeof node == "string") {
      return TNM.string(node);
    }
    if (typeof node == "number") {
      return TNM._64f(node);
    }
    if (typeof node == "boolean") {
      return TNM.boolean(node);
    }
    if (typeof node == "undefined") {
      return TNM.undefined();
    }
    if (ArrayBuffer.isView(node)) {
      //@ts-ignore
      if (TypedArrayRecord.has(node.constructor)) {
        return TNM.typedArray(
          //@ts-ignore
          TypedArrayRecord.get(node.constructor)!,
          //@ts-ignore
          node
        );
      }
    }
    if (node instanceof TypedNode) {
  
      return node;
    }
  
    throw new Error(`Unsuppourted type for DBO parser.`);
  },

  toDBO(object: any) {
    if (typeof object == "object" && !Array.isArray(object)) {
      const parent = TNM.object(<any>{});

      parent.value = this._traverseObj(object).value;
      return parent;
    }
    if (typeof object == "object" && Array.isArray(object)) {
      const parent = TNM.array(<any>[]);

      parent.value = this._traverseArray(object).value;
      return parent;
    }
  
    return this._addPrimitive(object);
  },

  toBuffer(object: any) {
    const dbo = this.toDBO(object);
    return DBOToBuffer.toBuffer(dbo);
  },
};
