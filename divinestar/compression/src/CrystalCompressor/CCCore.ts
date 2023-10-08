import { TypeArraysNames, TypedArrays } from "./Meta/Array.types";

export const CCCore = {
 async compressArrayBuffer(input: ArrayBuffer) {
  //@ts-ignore
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  writer.write(input);
  writer.close();
  const output: Uint8Array[] = [];
  const reader = cs.readable.getReader();
  let totalSize = 0;
  while (true) {
   const { value, done } = await reader.read();
   if (done) break;
   output.push(value);
   totalSize += value.byteLength;
  }
  const concatenated = new Uint8Array(totalSize);
  let offset = 0;
  for (const array of output) {
   concatenated.set(array, offset);
   offset += array.byteLength;
  }
  return concatenated;
 },

 async decompressArrayBuffer(input: ArrayBuffer): Promise<Uint8Array> {
  //@ts-ignore
  const ds = new DecompressionStream("gzip");
  const writer: WritableStreamDefaultWriter = await ds.writable.getWriter();
  writer.write(input);

  const output: Uint8Array[] = [];
  const reader: ReadableStreamDefaultReader = await ds.readable.getReader();
  writer.close();
  let totalSize = 0;
  while (true) {
   const { value, done } = await reader.read();
   if (done) break;
   output.push(value);
   totalSize += value.byteLength;
  }
  const concatenated = new Uint8Array(totalSize);
  let offset = 0;
  for (const array of output) {
   concatenated.set(array, offset);
   offset += array.byteLength;
  }

  return concatenated;
 },

 processArray(type: TypeArraysNames, array: Uint8Array) {
  const returnArray = this.getArray[type](array.buffer);
  return returnArray;
 },

 getArray: {
  Int8: (buffer: ArrayBuffer) => {
   return new Int8Array(buffer);
  },
  Uint8: (buffer: ArrayBuffer) => {
   return new Uint8Array(buffer);
  },
  Uint8Clamped: (buffer: ArrayBuffer) => {
   return new Uint8ClampedArray(buffer);
  },
  Int16: (buffer: ArrayBuffer) => {
   return new Int16Array(buffer);
  },
  Uint16: (buffer: ArrayBuffer) => {
   return new Uint16Array(buffer);
  },
  Int32: (buffer: ArrayBuffer) => {
   return new Int32Array(buffer);
  },
  Uint32: (buffer: ArrayBuffer) => {
   return new Uint32Array(buffer);
  },
  Float32: (buffer: ArrayBuffer) => {
   return new Float32Array(buffer);
  },
  Float64: (buffer: ArrayBuffer) => {
   return new Float64Array(buffer);
  },
  BigInt64: (buffer: ArrayBuffer) => {
   return new BigInt64Array(buffer);
  },
  BigUint64: (buffer: ArrayBuffer) => {
   return new BigUint64Array(buffer);
  },
 },
};
