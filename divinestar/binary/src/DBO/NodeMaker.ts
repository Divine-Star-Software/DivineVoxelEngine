import { DBOPrimitive, TypedArrays } from "./Types/DBO.types";

import { TypedNode } from "./Classes/TypedNode.js";
import { MetaValues } from "./Constants/MetaValues.js";
import { TypedArrayMap } from "./Constants/ByteData.js";

export const TNM = {
  json<T>(data: T) {
    return new TypedNode<T>(MetaValues["json"], data);
  },
  DBO<T>(data: TypedNode<T>) {
    return new TypedNode<TypedNode<T>>(MetaValues["DBO"], data);
  },

  object<T>(data: T) {
    return new TypedNode<T>(MetaValues["object"], data);
  },

  array<T>(data: T) {
    if (!Array.isArray(data))
      throw new Error("Data for array must be an array.");
    return new TypedNode<T>(MetaValues["array"], data);
  },

  _8i(value: number) {
    return new TypedNode<number>(MetaValues["8i"], value);
  },

  _8ui(value: number) {
    return new TypedNode<number>(MetaValues["8ui"], value);
  },

  _16i(value: number) {
    return new TypedNode<number>(MetaValues["16i"], value);
  },

  _16ui(value: number) {
    return new TypedNode<number>(MetaValues["16ui"], value);
  },

  _32ui(value: number) {
    return new TypedNode<number>(MetaValues["32ui"], value);
  },

  _32i(value: number) {
    return new TypedNode<number>(MetaValues["32i"], value);
  },

  _32f(value: number) {
    return new TypedNode<number>(MetaValues["32f"], value);
  },

  _64f(value: number) {
    return new TypedNode<number>(MetaValues["64f"], value);
  },

  bigi(value: number) {
    return new TypedNode<number>(MetaValues["bigi"], value);
  },

  bigui(value: number) {
    return new TypedNode<number>(MetaValues["bigui"], value);
  },

  boolean(value: boolean) {
    return new TypedNode<boolean>(MetaValues["boolean"], value);
  },

  undefined() {
    return new TypedNode<undefined>(MetaValues["undefined"], undefined);
  },

  typedArray(type: DBOPrimitive, value: number[] | ArrayBufferView) {
    return new TypedNode<TypedArrays>(
      MetaValues["typed-array"],
      //@ts-ignore
      ArrayBuffer.isView(value) ? value : TypedArrayMap[type].from(value),
      MetaValues[type]
    );
  },

  stringArray(value: string[]) {
    return new TypedNode<string[]>(MetaValues["string-array"], value);
  },

  string(value: string) {
    return new TypedNode<string>(MetaValues["string"], value);
  },

  fixedString(value: string, length: number) {
    return new TypedNode<string>(MetaValues["fixed-string"], value, 0, length);
  },

  fixedTypedArray(type: DBOPrimitive, value: number[], length: number) {
    return new TypedNode<number[]>(
      MetaValues["fixed-typed-array"],
      value,
      MetaValues[type],
      length
    );
  },

  toJSONString(json: any) {
    if (typeof json === "string") {
      json = JSON.parse(json);
    }
    let output = JSON.stringify(
      json,
      function (k, v) {
        if (v instanceof Array) return JSON.stringify(v);
        return v;
      },
      2
    )
      .replace(/\\/g, "")
      .replace(/\"\[/g, "[")
      .replace(/\]\"/g, "]")
      .replace(/\"\{/g, "{")
      .replace(/\}\"/g, "}");
    return output;
  },
};
