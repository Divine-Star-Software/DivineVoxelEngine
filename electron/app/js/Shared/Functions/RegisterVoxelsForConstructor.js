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
import { DreadStoneVoxelBuilderThread } from "../Voxels/Solid/DreadStone/DreadStone.voxel.object.js";
import { DreadGrassBlockVoxelBuilderThread } from "../Voxels/Solid/DreadGrass/DreadGrassBlock.voxel.builder.js";
import { DreadGrassVoxelBuilderThread } from "../Voxels/Flora/DreadGrass/DreadGrass.voxel.builder.js";
import { LiquidDreadEtherVoxelBuilderThread } from "../Voxels/Fluid/LiquidDreadEther/LiquidDreadEther.voxel.builder.js";
import { DreadLampVoxelBuilderThread } from "../Voxels/Solid/DreadLamp/DreadLamp.voxel.builder.js";
import { DreadStonePillarVoxelBuilderThread } from "../Voxels/Solid/DreadStonePillar/DreadStonePillar.voxel.builder.js";
export function RegisterVoxelsForConstructor(DVEC) {
    const voxels = [];
    voxels.push(
    //util
    DebugBoxVoxelBuilderThread, LightDebugBoxVoxelBuilderThread, DataHolderVoxelBuilderThread, MarkerBoxVoxelBuilderThread, 
    //dream
    DreamGrassBlockVoxelBuilderThread, DreamStonePillarVoxelBuilderThread, DreamStoneVoxelBuilderThread, DreamLampVoxelBuilderThread, DreamStoneSlabVoxelBuilderThread, DreamLogVoxelBuilderThread, DreamStoneStairVoxelBuilderThread, DreamGrassVoxelBuilderThread, DreamVineVoxelBuilderThread, DreamLeafVoxelBuilderThread, LiquidDreamEtherVoxelBuilderThread, 
    //dread
    DreadStoneVoxelBuilderThread, DreadGrassBlockVoxelBuilderThread, DreadGrassVoxelBuilderThread, DreadLampVoxelBuilderThread, DreadStonePillarVoxelBuilderThread, LiquidDreadEtherVoxelBuilderThread);
    for (const voxel of voxels) {
        DVEC.voxelManager.registerVoxel(voxel);
    }
}
