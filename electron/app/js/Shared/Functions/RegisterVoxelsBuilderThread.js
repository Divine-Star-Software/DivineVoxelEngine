//voxels
import { DebugBoxVoxelBuilderThread } from "../../Shared/Voxels/Solid/DebugBox/DebugBox.voxel.builder.js";
import { DreamGrassBlockVoxelBuilderThread } from "../Voxels/Solid/DreamGrass/DreamGrassBlock.voxel.builder.js";
import { DreamStoneVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamStone/DreamStone.voxel.builder.js";
import { DreamStonePillarVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.builder.js";
import { DreamLampVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamLamp/DreamLamp.voxel.builder.js";
import { LightDebugBoxVoxelBuilderThread } from "../../Shared/Voxels/Solid/LightDebugBox/LightDebugBox.voxel.builder.js";
import { LiquidDreamEtherVoxelBuilderThread } from "../../Shared/Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.builder.js";
import { DreamGrassVoxelBuilderThread } from "../../Shared/Voxels/Flora/DreamGrass/DreamGrass.voxel.builder.js";
import { DreamStoneSlabVoxelBuilderThread } from "../../Shared/Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.builder.js";
export function RegisterVoxelsForBuilderThread(DVEB) {
    //solid
    DVEB.voxelManager.registerVoxel(DebugBoxVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamGrassBlockVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamStonePillarVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamStoneVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(LightDebugBoxVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamLampVoxelBuilderThread);
    DVEB.voxelManager.registerVoxel(DreamStoneSlabVoxelBuilderThread);
    //flora
    DVEB.voxelManager.registerVoxel(DreamGrassVoxelBuilderThread);
    //fluid
    DVEB.voxelManager.registerVoxel(LiquidDreamEtherVoxelBuilderThread);
}
