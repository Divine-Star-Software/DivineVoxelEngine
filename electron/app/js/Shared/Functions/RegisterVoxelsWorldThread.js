//voxels
import { DebugBoxVoxelData } from "../../Shared/Voxels/Solid/DebugBox/DebugBox.voxel.data.js";
import { LightDebugBoxVoxelData } from "../../Shared/Voxels/Solid/LightDebugBox/LightDebugBox.voxel.data.js";
import { DreamStoneVoxelData } from "../../Shared/Voxels/Solid/DreamStone/DreamStone.voxel.data.js";
import { DreamStonePillarVoxelData } from "../../Shared/Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.data.js";
import { DreamGrassBlockVoxelData } from "../../Shared/Voxels/Solid/DreamGrass/DreamGrass.voxel.data.js";
import { DreamLampVoxelData } from "../../Shared/Voxels/Solid/DreamLamp/DreamLamp.voxel.data.js";
import { DreamGrassVoxelData } from "../../Shared/Voxels/Flora/DreamGrass/DreamGrass.voxel.data.js";
import { LiquidDreamEtherVoxelData } from "../../Shared/Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.data.js";
export function RegisterVoxels(DVEW, voxelPaletteMode) {
    DVEW.voxelManager.registerVoxelData(DebugBoxVoxelData);
    DVEW.voxelManager.registerVoxelData(LightDebugBoxVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStoneVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamStonePillarVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamGrassBlockVoxelData);
    DVEW.voxelManager.registerVoxelData(DreamLampVoxelData);
    //flora
    DVEW.voxelManager.registerVoxelData(DreamGrassVoxelData);
    //fluid
    DVEW.voxelManager.registerVoxelData(LiquidDreamEtherVoxelData);
}
