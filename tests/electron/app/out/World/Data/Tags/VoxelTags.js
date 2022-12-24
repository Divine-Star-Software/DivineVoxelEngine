import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
export const VoxelDataTags = new TagManager("voxel-tags");
VoxelDataTags.registerTag({
    id: "#dve_substance",
    type: "typed-number",
    numberType: "8ui",
});
VoxelDataTags.registerTag({
    id: "#dve_shape_id",
    type: "typed-number",
    numberType: "16ui",
});
VoxelDataTags.registerTag({
    id: "#dve_material",
    type: "typed-number",
    numberType: "16ui",
});
VoxelDataTags.registerTag({
    id: "#dve_hardness",
    type: "typed-number",
    numberType: "16ui",
});
VoxelDataTags.registerTag({
    id: "#dve_collider_id",
    type: "typed-number",
    numberType: "16ui",
});
VoxelDataTags.registerTag({
    id: "#dve_is_light_source",
    type: "boolean",
});
VoxelDataTags.registerTag({
    id: "#dve_light_value",
    type: "typed-number",
    numberType: "16ui",
});
VoxelDataTags.registerTag({
    id: "#dve_is_rich",
    type: "boolean",
});
VoxelDataTags.registerTag({
    id: "#dve_check_collisions",
    type: "boolean",
});
