
import { TagManager } from "@divinestar/binary/";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";
import { WorldDataTagIDs } from "../../../Data/Constants/Tags/WorldDataTagIds.js";
import { ChunkTagIDs } from "../../../Data/Constants/Tags/ChunkTagIds.js";
import { Chunk } from "../../../Data/World/Classes/Chunk.js";

export const ChunkDataTags = new TagManager("chunk-tags");
ChunkDataTags.registerTag({
 id: WorldDataTagIDs.header,
 type: "header",
 numberType: "16ui",
});
ChunkDataTags.registerTag({
 id: WorldDataTagIDs.dataType,
 type: "header",
 numberType: "16ui",
});
ChunkDataTags.registerTag({
 id: WorldDataTagIDs.dimensionId,
 type: "typed-number",
 numberType: "16ui",
});
ChunkDataTags.registerTag({
 id: WorldDataTagIDs.positionX,
 type: "typed-number",
 numberType: "32i",
});
ChunkDataTags.registerTag({
 id: WorldDataTagIDs.positionY,
 type: "typed-number",
 numberType: "32i",
});
ChunkDataTags.registerTag({
 id: WorldDataTagIDs.positionZ,
 type: "typed-number",
 numberType: "32i",
});

ChunkDataTags.registerTag({
 id: ChunkTagIDs.minHeight,
 type: "typed-number",
 numberType: "8ui",
});
ChunkDataTags.registerTag({
 id: ChunkTagIDs.maxHeight,
 type: "typed-number",
 numberType: "8ui",
});

export function InitalizeChunkTags() {
 ChunkDataTags.registerTag({
  id: ChunkTagIDs.heightMap,
  type: "bit-array",
  length: WorldSpaces.chunk.getHeight(),
 });
 ChunkDataTags.registerTag({
  id: ChunkTagIDs.dirtyMap,
  type: "bit-array",
  length: WorldSpaces.chunk.getHeight(),
 });

 const initData = ChunkDataTags.$INIT({
  indexBufferMode: "shared",
 });

 Chunk.Tags.$INIT(initData);
}
