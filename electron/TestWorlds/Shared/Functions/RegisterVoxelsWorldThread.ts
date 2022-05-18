//types
import type { DivineVoxelEngineWorld } from "../../../out/index.js"; //voxels
//voxels
import { DebugBoxVoxelData } from "../../Shared/Voxels/Solid/DebugBox/DebugBox.voxel.data.js";
import { LightDebugBoxVoxelData } from "../../Shared/Voxels/Solid/LightDebugBox/LightDebugBox.voxel.data.js";
import { DreamStoneVoxelData } from "../../Shared/Voxels/Solid/DreamStone/DreamStone.voxel.data.js";
import { DreamStonePillarVoxelData } from "../../Shared/Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.data.js";
import { DreamGrassBlockVoxelData } from "../../Shared/Voxels/Solid/DreamGrass/DreamGrass.voxel.data.js";
import { DreamLampVoxelData } from "../../Shared/Voxels/Solid/DreamLamp/DreamLamp.voxel.data.js";
import { DreamGrassVoxelData } from "../../Shared/Voxels/Flora/DreamGrass/DreamGrass.voxel.data.js";
import { LiquidDreamEtherVoxelData } from "../../Shared/Voxels/Fluid/LiquidDreamEther/LiquidDreamEther.voxel.data.js";
import { DreamStoneSlabVoxelData } from "../../Shared/Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.data.js";

export function RegisterVoxels(DVEW: DivineVoxelEngineWorld,test?:string) {
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