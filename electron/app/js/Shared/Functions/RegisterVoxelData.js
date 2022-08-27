//voxels
import { DebugBoxVoxelData } from "../Voxels/Solid/DebugBox/DebugBox.voxel.data.js";
import { LightDebugBoxVoxelData } from "../Voxels/Solid/LightDebugBox/LightDebugBox.voxel.data.js";
import { DreamStoneVoxelData } from "../Voxels/Solid/DreamStone/DreamStone.voxel.data.js";
import { DreamStonePillarVoxelData } from "../Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.data.js";
import { DreamGrassBlockVoxelData } from "../Voxels/Solid/DreamGrass/DreamGrassBlock.voxel.data.js";
import { DreamLampVoxelData } from "../Voxels/Solid/DreamLamp/DreamLamp.voxel.data.js";
import { DreamGrassVoxelData } from "../Voxels/Flora/DreamGrass/DreamGrass.voxel.data.js";
import { LiquidDreamEtherVoxelData } from "../Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.data.js";
import { DreamStoneSlabVoxelData } from "../Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.data.js";
import { DreamVineVoxelData } from "../Voxels/Flora/DreamVine/DreamVine.voxel.data.js";
import { DreamLeafsVoxelData } from "../Voxels/Flora/DreamLeafs/DreamLeafs.voxel.data.js";
import { DreamLogVoxelData } from "../Voxels/Solid/DreamLog/DreamLog.voxel.data.js";
import { DreamStoneStairVoxelData } from "../Voxels/Solid/DreamStoneStair/DreamStoneStair.voxel.data.js";
import { DataHolderVoxelData } from "../Voxels/Solid/DataHolder/DataHolder.voxel.data.js";
import { MarkerBoxVoxelData } from "../Voxels/Solid/MarkerBox/MarkerBox.voxel.data.js";
export function RegisterVoxels(DVEW) {
    DVEW.voxelManager.registerVoxelData(DebugBoxVoxelData);
    DVEW.voxelManager.registerVoxelData(LightDebugBoxVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStoneVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStonePillarVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamGrassBlockVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamLampVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStoneSlabVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamLogVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStoneStairVoxelData);
    DVEW.voxelManager.registerVoxelData(DataHolderVoxelData);
    DVEW.voxelManager.registerVoxelData(MarkerBoxVoxelData);
    //flora
    DVEW.voxelManager.registerVoxelData(DreamGrassVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamVineVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamLeafsVoxelData);
    //fluid
    DVEW.voxelManager.registerVoxelData(LiquidDreamEtherVoxelData);
}
