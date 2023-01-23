import { TypedNode } from "../Classes/TypedNode.js";
import { BToMMD } from "./BufferToMMD.js";
import { MMDToBuffer } from "./MMDToBuffer.js";

export const MMDP = {
  toBuffer(data: TypedNode<any>) {
    return MMDToBuffer.toBuffer(data);
  },

  toObject<T>(buffer: ArrayBuffer, byteOffSet: number = 0) {
    return BToMMD.toObject<T>(buffer);
  },

  toMMD<T>(buffer: ArrayBuffer, byteOffSet: number = 0, byteOffSetEnd: number = 0): TypedNode<T> {
    return BToMMD.toMMD(buffer,byteOffSet,byteOffSetEnd);
  },

  toToekns(data: TypedNode<any>) {
    return MMDToBuffer.toTokens(data);
  },

  toeknsToBuffer(data: any, size: number, buffer: ArrayBuffer, byteOffSet = 0) {
    return MMDToBuffer.toeknsToBuffer(data, size, buffer, byteOffSet);
  },
};
