//types
import type { DivineVoxelEngineWorld } from "out/World/DivineVoxelEngineWorld.js"; //voxels
//voxels
import { DebugBoxVoxelData } from "../Voxels/Solid/DebugBox/DebugBox.voxel.data.js";
import { LightDebugBoxVoxelData } from "../Voxels/Solid/LightDebugBox/LightDebugBox.voxel.data.js";
import { DreamStoneVoxelData } from "../Voxels/Solid/DreamStone/DreamStone.voxel.data.js";
import { DreamStonePillarVoxelData } from "../Voxels/Solid/DreamStonePillar/DreamStonePillar.voxel.data.js";
import { DreamGrassBlockVoxelData } from "../Voxels/Solid/DreamGrass/DreamGrassBlock.voxel.data.js";
import { DreamLampVoxelData } from "../Voxels/Solid/DreamLamp/DreamLamp.voxel.data.js";
import { DreamGrassVoxelData } from "../Voxels/Flora/DreamGrass/DreamGrass.voxel.data.js";
import { LiquidDreamEtherVoxelData } from "../Voxels/Liquid/LiquidDreamEther/LiquidDreamEther.voxel.data.js";
import { DreamStoneSlabVoxelData } from "../Voxels/Solid/DreamStoneSlab/DreamStoneSlab.voxel.data.js";
import { DreamVineVoxelData } from "../Voxels/Flora/DreamVine/DreamVine.voxel.data.js";
import { DreamLeafsVoxelData } from "../Voxels/Flora/DreamLeafs/DreamLeafs.voxel.data.js";
import { DreamLogVoxelData } from "../Voxels/Solid/DreamLog/DreamLog.voxel.data.js";
import { DreamStoneStairVoxelData } from "../Voxels/Solid/DreamStoneStair/DreamStoneStair.voxel.data.js";
import { DataHolderVoxelData } from "../Voxels/Solid/DataHolder/DataHolder.voxel.data.js";
import { MarkerBoxVoxelData } from "../Voxels/Solid/MarkerBox/MarkerBox.voxel.data.js";
import { DreadStoneVoxelData } from "../Voxels/Solid/DreadStone/DreadStone.voxel.data.js";
import { DreadGrassBlockVoxelData } from "../Voxels/Solid/DreadGrass/DreadGrassBlock.voxel.data.js";
import { DreadGrassVoxelData } from "../Voxels/Flora/DreadGrass/DreadGrass.voxel.data.js";
import { LiquidDreadEtherVoxelData } from "../Voxels/Liquid/LiquidDreadEther/LiquidDreadEther.voxel.data.js";
import { DreadLampVoxelData } from "../Voxels/Solid/DreadLamp/DreadLamp.voxel.data.js";
import { DreadStonePillarVoxelData } from "../Voxels/Solid/DreadStonePillar/DreadStonePillar.voxel.data.js";

export function RegisterVoxels(DVEW: DivineVoxelEngineWorld) {
 const voxelData = [];
 voxelData.push(
  //util
  DebugBoxVoxelData,
  LightDebugBoxVoxelData,
  DataHolderVoxelData,
  MarkerBoxVoxelData,
  //dream
  DreamStoneVoxelData,
  DreamStonePillarVoxelData,
  DreamGrassBlockVoxelData,
  DreamLampVoxelData,
  DreamStoneSlabVoxelData,
  DreamLogVoxelData,
  DreamStoneStairVoxelData,
  DreamGrassVoxelData,
  DreamVineVoxelData,
  DreamLeafsVoxelData,
  LiquidDreamEtherVoxelData,
  //dread
  DreadStoneVoxelData,
  DreadGrassBlockVoxelData,
  DreadGrassVoxelData,
  DreadLampVoxelData,
  DreadStonePillarVoxelData,
  LiquidDreadEtherVoxelData
 );

 for (const voxel of voxelData) {
  DVEW.voxelManager.registerVoxelData(voxel);
 }
}
