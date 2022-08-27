//voxels
import { DebugBoxVoxelBuilderThread } from "../Voxels/Solid/DebugBox/DebugBox.voxel.builder.js";
import { DreamGrassBlockVoxelBuilderThread } from "../Voxels/Solid/DreamGrass/DreamGrassBlock.voxel.builder.js";
import { DreamStoneVoxelBuilderThread } from "../Voxels/Solid/DreamStone/DreamStone.voxel.builder.js";
import { DreamStonePillarVoxelBuilderThread } from "../Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.builder.js";
import { DreamLampVoxelBuilderThread } from "../Voxels/Solid/DreamLamp/DreamLamp.voxel.builder.js";
import { LightDebugBoxVoxelBuilderThread } from "../Voxels/Solid/LightDebugBox/LightDebugBox.voxel.builder.js";
import { LiquidDreamEtherVoxelBuilderThread } from "../Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.builder.js";
import { DreamGrassVoxelBuilderThread } from "../Voxels/Flora/DreamGrass/DreamGrass.voxel.builder.js";
import { DreamStoneSlabVoxelBuilderThread } from "../Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.builder.js";
import { DreamVineVoxelBuilderThread } from "../Voxels/Flora/DreamVine/DreamVine.voxel.builder.js";
import { DreamLeafVoxelBuilderThread } from "../Voxels/Flora/DreamLeafs/DreamLeafs.voxel.builder.js";
import { DreamLogVoxelBuilderThread } from "../Voxels/Solid/DreamLog/DreamLog.voxel.builder.js";
import { DreamStoneStairVoxelBuilderThread } from "../Voxels/Solid/DreamStoneStair/DreamStoneStair.voxel.builder.js";
import { DataHolderVoxelBuilderThread } from "../Voxels/Solid/DataHolder/DataHolder.voxel.builder.js";
import { MarkerBoxVoxelBuilderThread } from "../Voxels/Solid/MarkerBox/MarkerBox.voxel.builder.js";
export function RegisterVoxelsForConstructor(DVEC) {
    //solid
    DVEC.voxelManager.registerVoxel(DebugBoxVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamGrassBlockVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamStonePillarVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamStoneVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(LightDebugBoxVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamLampVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamStoneSlabVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamLogVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamStoneStairVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DataHolderVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(MarkerBoxVoxelBuilderThread);
    //flora
    DVEC.voxelManager.registerVoxel(DreamGrassVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamVineVoxelBuilderThread);
    DVEC.voxelManager.registerVoxel(DreamLeafVoxelBuilderThread);
    //fluid
    DVEC.voxelManager.registerVoxel(LiquidDreamEtherVoxelBuilderThread);
}
