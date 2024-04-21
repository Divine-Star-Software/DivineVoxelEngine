import CompressorCore from "./CompressorCore.js";
import { TypeArraysNames, TypedArrays } from "./Meta/Array.types.js";

export const Compressor = {
  core: CompressorCore,
  version: 0.0,
  async compressArray(array: TypedArrays) {
    const returnArray = await this.core.compressArrayBuffer(array.buffer);
    return returnArray;
  },
  async decompressArray(buffer: ArrayBuffer, type: TypeArraysNames) {
    const returnData = await this.core.decompressArrayBuffer(buffer);
    return this.core.processArray(type, returnData);
  },
};
