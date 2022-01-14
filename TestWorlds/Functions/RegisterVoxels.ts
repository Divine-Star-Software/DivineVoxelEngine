import { Dreamestone } from "../Voxels/Solid/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/Solid/DreamGrassBlock.js";
import { DebugBox } from "../Voxels/Solid/DebugBox.js";
import { DreamStonePillar } from "../Voxels/Solid/DreamStonePillar.js";
import type { DVEW } from "../../out/Meta/World/DVEW";
import { DreamGrass } from "../Voxels/Flora/DreamGrass.js";
import { LiquidDreamEther } from "../Voxels/Fluid/LiquidDreamEther.js";

export function RegisterVoxels(
 DVEW: DVEW,
 voxelPalletMode: "global" | "per-chunk"
) {
 //solid
 const debugBlock = new DebugBox(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(debugBlock);
 const dreamStone = new Dreamestone(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamStone);
 const dreamStonePillar = new DreamStonePillar(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamStonePillar);
 const dreamGrassBlock = new DreamGrassBlock(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamGrassBlock);

 //flora
 const dreamGrass = new DreamGrass(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamGrass);

 //fluid
 const liquidDreamEther = new LiquidDreamEther(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(liquidDreamEther);

 if (voxelPalletMode == "global") {
  //solid
  DVEW.worldGeneration.addToGlobalVoxelPallet(
   `${debugBlock.data.id}:defualt`,
   debugBlock.data.defaultState
  );

  DVEW.worldGeneration.addToGlobalVoxelPallet(
   `${dreamStone.data.id}:defualt`,
   dreamStone.data.defaultState
  );

  DVEW.worldGeneration.addToGlobalVoxelPallet(
   `${dreamStonePillar.data.id}:defualt`,
   dreamStonePillar.data.defaultState
  );

  DVEW.worldGeneration.addToGlobalVoxelPallet(
   `${dreamGrassBlock.data.id}:defualt`,
   dreamGrassBlock.data.defaultState
  );

  //flora
  DVEW.worldGeneration.addToGlobalVoxelPallet(
   `${dreamGrass.data.id}:defualt`,
   dreamGrass.data.defaultState
  );

  //fluid
  DVEW.worldGeneration.addToGlobalVoxelPallet(
   `${liquidDreamEther.data.id}:defualt`,
   liquidDreamEther.data.defaultState
  );

  // console.log(DVEW.worldGeneration.getGlobalVoxelPallet());
 }
}
