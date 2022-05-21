//voxels
import { DebugBoxVoxelData } from "../Voxels/Solid/DebugBox/DebugBox.voxel.data.js";
import { LightDebugBoxVoxelData } from "../Voxels/Solid/LightDebugBox/LightDebugBox.voxel.data.js";
import { DreamStoneVoxelData } from "../Voxels/Solid/DreamStone/DreamStone.voxel.data.js";
import { DreamStonePillarVoxelData } from "../Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.data.js";
import { DreamGrassBlockVoxelData } from "../Voxels/Solid/DreamGrass/DreamGrass.voxel.data.js";
import { DreamLampVoxelData } from "../Voxels/Solid/DreamLamp/DreamLamp.voxel.data.js";
import { DreamGrassVoxelData } from "../Voxels/Flora/DreamGrass/DreamGrass.voxel.data.js";
import { LiquidDreamEtherVoxelData } from "../Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.data.js";
import { DreamStoneSlabVoxelData } from "../Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.data.js";
export function RegisterVoxels(DVEW) {
    DVEW.voxelManager.registerVoxelData(DebugBoxVoxelData);
    DVEW.voxelManager.registerVoxelData(LightDebugBoxVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStoneVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStonePillarVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamGrassBlockVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamLampVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStoneSlabVoxelData);
    //flora
    DVEW.voxelManager.registerVoxelData(DreamGrassVoxelData);
    //fluid
    DVEW.voxelManager.registerVoxelData(LiquidDreamEtherVoxelData);
}
