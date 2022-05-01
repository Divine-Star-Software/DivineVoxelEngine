//voxels
import { DebugBoxVoxelBuilderThread } from "../../Shared/Voxels/Solid/DebugBox/DebugBox.voxel.builder.js";
import { DreamGrassVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamGrass/DreamGrass.voxel.builder.js";
import { DreamStoneVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamStone/DreamStone.voxel.builder.js";
import { DreamStonePillarVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.builder.js";
export function RegisterVoxelsForBuilderThread(DVEB) {
    //solid
    DVEB.voxelManager.registerVoxel(DebugBoxVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamGrassVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamStonePillarVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamStoneVoxelBuilderThread);
}
