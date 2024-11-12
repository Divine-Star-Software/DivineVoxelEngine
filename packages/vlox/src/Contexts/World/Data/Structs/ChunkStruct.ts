import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { WorldSpaces } from "../../../../Data/World/WorldSpaces.js";
import { ChunkStructProperties } from "../../../../Data/Constants/Structs/ChunkStructProperties.js";
import { Chunk } from "../../../../Data/World/Classes/Chunk.js";

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
