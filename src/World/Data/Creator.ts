import { ChunkDataTags } from "./Tags/ChunkTags.js";
import { ColumnDataTags } from "./Tags/ColumnTags.js";
import { RegionDataTags } from "./Tags/RegionTags.js";

export const DataCreator = {
 convertToSAB(buffer: ArrayBuffer) {
  const sab = new SharedArrayBuffer(buffer.byteLength);
  const temp = new Uint8Array(buffer);
  const temp2 = new Uint8Array(sab);
  temp2.set(temp, 0);
  return sab;
 },
 chunk: {
  getBuffer(buffer: ArrayBuffer | false = false): SharedArrayBuffer {
   if (buffer) {
    return DataCreator.convertToSAB(buffer);
   }

   return new SharedArrayBuffer(ChunkDataTags.initData.bufferSize);
  },
 },
 column: {
  getBuffer(buffer: ArrayBuffer | false = false): SharedArrayBuffer {
   if (buffer) {
    return DataCreator.convertToSAB(buffer);
   }
   return new SharedArrayBuffer(ColumnDataTags.initData.bufferSize);
  },
 },
 region: {
  getBuffer(buffer: ArrayBuffer | false = false): SharedArrayBuffer {
   if (buffer) {
    return DataCreator.convertToSAB(buffer);
   }
   return new SharedArrayBuffer(RegionDataTags.initData.bufferSize);
  },
 },
};
