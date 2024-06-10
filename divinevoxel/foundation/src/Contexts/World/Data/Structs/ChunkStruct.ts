import { BinaryNumberTypes, BinaryStruct } from "@divinestar/binary/";
import { WorldSpaces } from "@divinevoxel/core/Data/World/WorldSpaces.js";
import { WorldDataStructProperties } from "../../../../Data/Constants/Structs/WorldDataStructProperties.js";
import { ChunkStructProperties } from "../../../../Data/Constants/Structs/ChunkStructProperties.js";
import { Chunk } from "../../../../Data/World/Classes/Chunk.js";

export const ChunkStatStruct = new BinaryStruct("chunk-tags");
ChunkStatStruct.registerProperty(
  {
    id: WorldDataStructProperties.header,
    type: "header",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.dataType,
    type: "header",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.dimensionId,
    type: "typed-number",
    numberType: BinaryNumberTypes.Uint16,
  },
  {
    id: WorldDataStructProperties.positionX,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: WorldDataStructProperties.positionY,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
  {
    id: WorldDataStructProperties.positionZ,
    type: "typed-number",
    numberType: BinaryNumberTypes.Int32,
  },
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
