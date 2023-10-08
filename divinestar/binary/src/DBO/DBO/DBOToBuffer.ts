import { MetaValues, MetaMapValues } from "../Constants/MetaValues.js";
import { TypedNode } from "../Classes/TypedNode.js";
import { ByteCounts, ByteParser } from "../Constants/ByteData.js";
import { DBOPrimitive } from "../Types/DBO.types";
import { DBOMarks } from "../Types/DBO.types";

export const DBOToBuffer = {
  _proto: <number[]>[],
  _tokenizeString(string: string) {
    for (let i = 0; i < string.length; i++) {
      this._addToken("16ui", string.charCodeAt(i));
    }
  },

  _traverseObj(data: TypedNode<any>) {
    this._addMarker("object-start");
    //for the object start and end marks

    for (const key of Object.keys(data.value)) {
      let length = key.length;
      if (length > 255) {
        throw new Error("An object key cannot be longer then 255 chars.");
      }

      this._addMarker("name");
      this._addToken("8ui", key.length);
      this._tokenizeString(key);

      const node = <TypedNode<any>>data.value[key];

      if (node.typeName == "object" && !ArrayBuffer.isView(node.value)) {
        this._traverseObj(node);
        continue;
      }
      if (node.typeName == "array" && !ArrayBuffer.isView(node.value)) {
        this._traverseArray(node);
        continue;
      }

      this._tokenizePrimiives(node);
    }

    this._addMarker("object-end");
  },

  _traverseArray(data: TypedNode<any>) {
    this._addMarker("array-start");
    //for object array start and end marks
    const array = data.value;

    for (const node of array) {
      if (
        typeof node.value == "object" &&
        !Array.isArray(node.value) &&
        !ArrayBuffer.isView(node.value)
      ) {
        this._traverseObj(node);
        continue;
      }
      if (
        typeof node.value == "object" &&
        Array.isArray(node.value) &&
        !ArrayBuffer.isView(node.value)
      ) {
        this._traverseArray(node);
        continue;
      }
      this._tokenizePrimiives(node);
    }
    this._addMarker("array-end");
  },

  _tokenizePrimiives(node: TypedNode<any>) {
    if (node.typeName == "string") {
      this._addMarker("string");
      this._addToken("32ui", node.value.length);
      for (let i = 0; i < node.value.length; i++) {
        this._addToken("16ui", node.value.charCodeAt(i));
      }
      return;
    }
    if (typeof node.value == "number") {
      this._addMarker(node.typeName);
      this._addToken(node.primiteName, node.value);
      return;
    }
    if (typeof node.value == "boolean") {
      this._addMarker(node.typeName);
      this._addToken("8ui", node.value ? 0 : 1);
      return;
    }
    if (typeof node.value == "undefined") {
      this._addMarker(node.typeName);
      return;
    }
    if (node.typeName == "typed-array") {
      this._addMarker("typed-array");
      this._addToken("8ui", node.listType);
      this._addToken("32ui", node.value.length);
      let array = node.value;
      for (let i = 0; i < array.length; i++) {
        this._addToken(node.listTypeName, array[i]);
      }
    }
    if (node.typeName == "string-array") {
      this._addMarker("string-array");
      this._addToken("32ui", node.value.length);
      let array = <string[]>node.value;
      for (let i = 0; i < array.length; i++) {
        const value = array[i];
        this._addToken("32ui", value.length);
        for (let k = 0; k < value.length; k++) {
          this._addToken("16ui", value.charCodeAt(k));
        }
      }
      return;
    }
    if (node.typeName == "json") {
      let json = "";
      if (typeof node.value == "object") {
        json = JSON.stringify(node.value);
      } else {
        json = node.value;
      }
      this._addMarker("json");
      this._addToken("32ui", json.length);
      for (let i = 0; i < json.length; i++) {
        this._addToken("16ui", json.charCodeAt(i));
      }
      return;
    }
  },

  _tokenize(node: TypedNode<any>) {
    //start as two bytes for the stand and end tags

    if (node.typeName == "object" && !Array.isArray(node.value)) {
      this._traverseObj(node);
    }
    if (node.typeName == "array" && Array.isArray(node.value)) {
      this._traverseArray(node);
    }
  },

  toBuffer(data: TypedNode<any>, byteOffSet = 0): ArrayBuffer {

    this._addMarker("start");
    this._tokenize(data);
    this._addMarker("end");
    const array = Uint8Array.from(this._proto);
    this._proto = [];
    return array.buffer;
  },

  _addMarker(marker: DBOMarks) {
    ByteParser.setValue("8ui", MetaValues[marker]).addBytes(this._proto);
  },

  _addToken(type: DBOPrimitive, value: number) {
    ByteParser.setValue(type, value).addBytes(this._proto);
  },
};
