import { ChunkTags } from "../../../Data/World/Chunk/ChunkTags.js";
import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
import { WorldSpaces } from "../../../Data/World/WorldSpaces.js";

export const ChunkDataTags = new TagManager("chunk-tags");
ChunkDataTags.registerTag({
 id: "#dve_header",
 type: "header",
 numberType: "16ui",
});
ChunkDataTags.registerTag({
 id: "#dve_data_type",
 type: "header",
 numberType: "16ui",
});
ChunkDataTags.registerTag({
 id: "#dve_dimension_id",
 type: "typed-number",
 numberType: "16ui",
});
ChunkDataTags.registerTag({
 id: "#dve_p_x",
 type: "typed-number",
 numberType: "32i",
});
ChunkDataTags.registerTag({
 id: "#dve_p_y",
 type: "typed-number",
 numberType: "32i",
});
ChunkDataTags.registerTag({
 id: "#dve_p_z",
 type: "typed-number",
 numberType: "32i",
});

ChunkDataTags.registerTag({
 id: "#dve_min_height",
 type: "typed-number",
 numberType: "8ui",
});
ChunkDataTags.registerTag({
 id: "#dve_max_height",
 type: "typed-number",
 numberType: "8ui",
});

export function InitalizeChunkTags() {
 ChunkDataTags.registerTag({
  id: "#dve_height_map",
  type: "typed-number-array",
  numberType: "32ui",
  length: WorldSpaces.chunk.getArea() * 2,
 });
 ChunkDataTags.registerTag({
  id: "#dve_voxel_id",
  type: "typed-number-array",
  numberType: "16ui",
  length: WorldSpaces.chunk.getVolume(),
 });
 ChunkDataTags.registerTag({
  id: "#dve_voxel_light",
  type: "typed-number-array",
  numberType: "16ui",
  length: WorldSpaces.chunk.getVolume(),
 });
 ChunkDataTags.registerTag({
  id: "#dve_voxel_state",
  type: "typed-number-array",
  numberType: "16ui",
  length: WorldSpaces.chunk.getVolume(),
 });
 ChunkDataTags.registerTag({
  id: "#dve_voxel_secondary_id",
  type: "typed-number-array",
  numberType: "16ui",
  length: WorldSpaces.chunk.getVolume(),
 });
 const initData = ChunkDataTags.$INIT({
  indexBufferMode: "shared",
 });

 ChunkTags.$INIT(initData);
}
