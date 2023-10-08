import { TNM } from "./NodeMaker.js";
import { TypedNode } from "./Classes/TypedNode.js";
import { BufferToDBO } from "./DBO/BufferToDBO.js";
import { ObjectToBuffer } from "./DBO/ObjectToBuffer.js";
import { DBOToBuffer } from "./DBO/DBOToBuffer.js";

export const DBO = {
  nodes: TNM,

  bufferToObject<T>(buffer: ArrayBuffer, byteOffSet: number = 0) {
    return BufferToDBO.toObject<T>(buffer);
  },

  objectToBuffer(obj: any) {
    return ObjectToBuffer.toBuffer(obj);
  },

  objectToDBO(object: any) {
    return ObjectToBuffer.toDBO(object);
  },

  dboToBuffer(data: TypedNode<any>) {
    return DBOToBuffer.toBuffer(data);
  },

  bufferToDBO<T>(
    buffer: ArrayBuffer,
    byteOffSet: number = 0,
    byteOffSetEnd: number = 0
  ): TypedNode<T> {
    return BufferToDBO.toDBO(buffer, byteOffSet, byteOffSetEnd);
  },
};
