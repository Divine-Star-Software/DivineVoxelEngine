import { ChunkData } from "Meta/Data/WorldData.types.js";
import { ChunkReader } from "../../Data/Chunk/ChunkReader.js";
import { HeightMapData } from "../../Data/Chunk/HeightMapData.js";

export const DataCreator = {
 chunk: {
  getBuffer(buffer: ArrayBuffer | false = false): SharedArrayBuffer {
   if (buffer) {
    const sab = new SharedArrayBuffer(buffer.byteLength);
    const temp = new Uint8Array(buffer);
    const temp2 = new Uint8Array(sab);
    temp2.set(temp, 0);
    return sab;
   }
   const chunkSAB = new SharedArrayBuffer(ChunkReader.chunkByteSize);
   const data = new DataView(chunkSAB);
  // HeightMapData.initalizeChunk(data);

   return chunkSAB;
  },
 },
};
