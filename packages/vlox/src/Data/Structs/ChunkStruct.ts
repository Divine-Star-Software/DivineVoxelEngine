import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { WorldSpaces } from "../World/WorldSpaces.js";
import { ChunkStructProperties } from "../Structs/Constants/ChunkStructProperties.js";
import { Chunk } from "../World/Classes/Chunk.js"

export const ChunkStatStruct = new BinaryStruct("chunk-tags");
ChunkStatStruct.registerProperty(
  {
    id: ChunkStructProperties.minHeight,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint8,
  },
  {
    id: ChunkStructProperties.maxHeight,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint8,
  }
);

export function InitalizeChunkTags() {
  ChunkStatStruct.registerProperty(
    {
      id: ChunkStructProperties.heightMap,
      type: "bit-array",
      length: WorldSpaces.chunk.getHeight(),
    },
    {
      id: ChunkStructProperties.dirtyMap,
      type: "bit-array",
      length: WorldSpaces.chunk.getHeight(),
    }
  );

  const initData = ChunkStatStruct.init({
    indexBufferMode: "shared",
  });

  Chunk.StateStruct.init(initData);
}
