import { BinaryNumberTypes, BinaryStruct } from "@amodx/binary/";
import { WorldSpaces } from "../WorldSpaces.js";
import { ChunkStructProperties } from "./ChunkStructProperties.js";
import { Chunk } from "./Chunk.js";

const ChunkStatStruct = new BinaryStruct("chunk-tags");

export interface ChunkStruct {
  [ChunkStructProperties.minHeight]: number;
  [ChunkStructProperties.maxHeight]: number;
  [ChunkStructProperties.heightMap]: number[];
  [ChunkStructProperties.dirtyMap]: number[];
}

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
