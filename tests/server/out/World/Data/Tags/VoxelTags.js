import { VoxelTagIDs } from "../../../Data/Constants/Tags/VoxelTagIds.js";
import { TagManager } from "../../../Libs/DivineBinaryTags/TagManager.js";
export const VoxelDataTags = new TagManager("voxel-tags");
export function InitalizeVoxelTags() {
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.substance,
        type: "typed-number",
        numberType: "8ui",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.shapeID,
        type: "typed-number",
        numberType: "16ui",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.material,
        type: "typed-number",
        numberType: "16ui",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.hardness,
        type: "typed-number",
        numberType: "16ui",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.colliderID,
        type: "typed-number",
        numberType: "16ui",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.isLightSource,
        type: "boolean",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.lightValue,
        type: "typed-number",
        numberType: "16ui",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.isRich,
        type: "boolean",
    });
    VoxelDataTags.registerTag({
        id: VoxelTagIDs.checkCollisions,
        type: "boolean",
    });
}
