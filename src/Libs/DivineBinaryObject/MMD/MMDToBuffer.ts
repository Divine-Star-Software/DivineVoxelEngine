import { MetaValues, MetaMapValues } from "../Constants/MetaValues.js";
import { TypedNode } from "../Classes/TypedNode.js";
import { ByteCounts, ByteDataSet } from "../Constants/ByteData.js";
import { DBOPrimitive } from "../Types/DBO.types";
type MMDToken =
  | [number, number]
  | [number, -1, string]
  | [number, -2, number[]]
  | [number, -3, string[]];

export const MMDToBuffer = {
  _tokens: <MMDToken[]>[],

  metaValues: MetaValues,
  metaMapValues: MetaMapValues,

  _tokenizeString(string: string) {
    for (let i = 0; i < string.length; i++) {
      this._addToken(MetaValues["16ui"], string.charCodeAt(i));
    }
  },

  _traverseObj(data: TypedNode<any>, size: number) {
    this._addMarker(MetaValues["object-start"]);
    //for the object start and end marks
    size += 2;
    for (const key of Object.keys(data.value)) {
      let length = key.length;
      if (length > 255) {
        throw new Error("An object key cannot be longer then 255 chars.");
      }
      //for size of the key
      size += key.length * ByteCounts["16ui"];
      //for the length of the key adn the name mark
      size += ByteCounts["8ui"] * 2;

      this._addMarker(MetaValues["name"]);
      this._addToken(MetaValues["8ui"], key.length);
      this._tokenizeString(key);

      const node = <TypedNode<any>>data.value[key];

      if (node.typeName == "object") {
        size = this._traverseObj(node, size);
        continue;
      }
      if (node.typeName == "array") {
        size = this._traverseArray(node, size);
        continue;
      }

      size = this._tokenizePrimiives(node, size);
    }

    this._addMarker(MetaValues["object-end"]);
    return size;
  },

  _traverseArray(data: TypedNode<any>, size: number) {
    this._addMarker(MetaValues["array-start"]);
    //for object array start and end marks
    size += 2;
    const array = data.value;

    for (const node of array) {
      if (typeof node.value == "object" && !Array.isArray(node.value)) {
        size = this._traverseObj(node, size);
        continue;
      }
      if (typeof node.value == "object" && Array.isArray(node.value)) {
        size = this._traverseArray(node, size);
        continue;
      }
      size = this._tokenizePrimiives(node, size);
    }
    this._addMarker(MetaValues["array-end"]);
    return size;
  },

  _tokenizePrimiives(node: TypedNode<any>, size: number) {
    if (node.typeName == "string") {
      //for size of the string
      size += node.value.length * 2;
      //for the length of the string
      size += 4;
      //for the marker
      size += 1;

      this._addMarker(MetaValues["string"]);
      this._addToken(MetaValues["32ui"], node.value.length);
      this._tokens.push([MetaValues["string"], -1, node.value]);
      return size;
    }
    if (typeof node.value == "number") {
      //@ts-ignore
      let count = ByteCounts[MetaMapValues[node.type]];

      //for size of the number
      size += count;
      //for the marker
      size += 1;
      this._addMarker(node.type);
      this._addToken(node.type, node.value);
      return size;
    }
    if (MetaMapValues[node.type] == "typed-array") {
      //for size of the type array
      //@ts-ignore
      const count = ByteCounts[MetaMapValues[node.listType]];
      size += node.value.length * count;
      //for the marker
      size += ByteCounts["8ui"] * 2 + ByteCounts["32ui"];

      this._addMarker(MetaValues["typed-array"]);
      this._addToken(MetaValues["8ui"], node.listType);
      this._addToken(MetaValues["32ui"], node.value.length);
      this._tokens.push([node.listType, -2, node.value]);
      return size;
    }
    if (node.typeName == "string-array") {
      //for the marker
      size += ByteCounts["8ui"] + ByteCounts["32ui"];
      for (let i = 0; i < node.value.length; i++) {
        size += node.value[i].length * ByteCounts["16ui"] + ByteCounts["32ui"];
      }
      this._addMarker(MetaValues["string-array"]);
      this._addToken(MetaValues["32ui"], node.value.length);
      this._tokens.push([node.listType, -3, node.value]);
      return size;
    }
    if (node.typeName == "json") {
      let json = "";
      if (typeof node.value == "object") {
        json = JSON.stringify(node.value);
      } else {
        json = node.value;
      }
      //for size of the string
      size += json.length * ByteCounts["16ui"];
      //for the length of the string
      size += ByteCounts["32ui"];
      //for the marker
      size += ByteCounts["8ui"];
      this._addMarker(MetaValues["json"]);
      this._addToken(MetaValues["32ui"], json.length);
      this._tokens.push([MetaValues["string"], -1, json]);
      return size;
    }
    return size;
  },

  _tokenize(data: TypedNode<any>) {
    //start as two bytes for the stand and end tags
    let size = 2;
    if (MetaMapValues[data.type] == "object" && !Array.isArray(data.value)) {
      size = this._traverseObj(data, size);
    }
    if (MetaMapValues[data.type] == "array" && Array.isArray(data.value)) {
      size = this._traverseArray(data, size);
    }
    return size;
  },

  toTokens(data: TypedNode<any>): [MMDToken[], number] {
    this._addMarker(MetaValues["start"]);
    const size = this._tokenize(data);
    this._addMarker(MetaValues["end"]);
    return [this._tokens, size];
  },

  toeknsToBuffer(
    tokens: MMDToken[],
    size: number,
    buffer: ArrayBuffer,
    byteOffSet = 0
  ) {
    this._ToBuffer(tokens, size, byteOffSet, buffer);
  },

  _ToBuffer(tokens: MMDToken[], size: number, byteOffSet = 0, pb?: any) {
    let buffer;
    if (!pb) {
      buffer = new ArrayBuffer(size);
    } else {
      buffer = pb;
    }

    const dv = new DataView(buffer);
    let index = byteOffSet;

    for (const token of tokens) {
      if (token[1] == -1 && typeof token[2] === "string") {
        let string = token[2];
        for (let i = 0; i < string.length; i++) {
          ByteDataSet["16ui"](dv, index, string.charCodeAt(i));
          index += ByteCounts["16ui"];
        }
        continue;
      }

      if (token[1] == -2 && Array.isArray(token[2])) {
        let array = token[2];
        let type = <DBOPrimitive>MetaMapValues[token[0]];
        let count = ByteCounts[type];

        for (let i = 0; i < array.length; i++) {
          ByteDataSet[type](dv, index, array[i]);
          index += count;
        }
        continue;
      }

      if (token[1] == -3 && Array.isArray(token[2])) {
        let array = <string[]>token[2];
        let type = <DBOPrimitive>MetaMapValues[token[0]];
        let count = ByteCounts[type];
        for (let i = 0; i < array.length; i++) {
          const value = array[i];
          ByteDataSet["32ui"](dv, index, value.length);
          index += ByteCounts["32ui"];
          for (let k = 0; k < value.length; k++) {
            ByteDataSet["16ui"](dv, index, value.charCodeAt(k));
            index += ByteCounts["16ui"];
          }
        }
        continue;
      }

      //@ts-ignore
      ByteDataSet[MetaMapValues[token[0]]](dv, index, token[1]);
      //@ts-ignore
      index += ByteCounts[MetaMapValues[token[0]]];
    }

    tokens = [];
    return buffer;
  },

  toBuffer(data: TypedNode<any>, byteOffSet = 0): ArrayBuffer {
    this._tokens = [];
    this._addMarker(MetaValues["start"]);
    const size = this._tokenize(data);
    this._addMarker(MetaValues["end"]);

    return this._ToBuffer(this._tokens, size, byteOffSet);
  },

  _addMarker(value: number) {
    this._tokens.push([MetaValues["8ui"], value]);
  },

  _addToken(dataType: number, value: number) {
    this._tokens.push([dataType, value]);
  },
};
