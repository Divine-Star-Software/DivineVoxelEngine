import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
export const VoxelDataTags = new TagManager("voxel-tags");

VoxelDataTags.registerTag({
 id: "#dve:substance",
 type: "typed-number",
 numberType: "8ui",
});
VoxelDataTags.registerTag({
 id: "#dve:shape_id",
 type: "typed-number",
 numberType: "16ui",
});
VoxelDataTags.registerTag({
 id: "#dve:material",
 type: "typed-number",
 numberType: "16ui",
});
VoxelDataTags.registerTag({
 id: "#dve:hardness",
 type: "typed-number",
 numberType: "16ui",
});
VoxelDataTags.registerTag({
 id: "#dve:collider_id",
 type: "typed-number",
 numberType: "16ui",
});
VoxelDataTags.registerTag({
 id: "#dve:is_light_source",
 type: "boolean",
});
VoxelDataTags.registerTag({
 id: "#dve:light_value",
 type: "typed-number",
 numberType: "16ui",
});
VoxelDataTags.registerTag({
 id: "#dve:is_rich",
 type: "boolean",
});
VoxelDataTags.registerTag({
 id: "#dve:check_collisions",
 type: "boolean",
});
