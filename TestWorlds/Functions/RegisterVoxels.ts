import { Dreamestone } from "../Voxels/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/DreamGrassBlock.js";
import { DebugBox } from "../Voxels/DebugBox.js";
import { DreamStonePillar } from "../Voxels/DreamStonePillar.js";
import type { DVEW } from "../../out/Meta/World/DVEW";

export function RegisterVoxels(
 DVEW: DVEW,
 voxelPalletMode: "global" | "per-chunk"
) {
 const debugBlock = new DebugBox(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(debugBlock);
 const dreamStone = new Dreamestone(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamStone);
 const dreamStonePillar = new DreamStonePillar(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamStonePillar);
 const dreamGrassBlock = new DreamGrassBlock(DVEW.voxelHelper);
 DVEW.voxelManager.registerVoxelData(dreamGrassBlock);
 if (voxelPalletMode == "global") {
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


  console.log(DVEW.worldGeneration.getGlobalVoxelPallet());
 }
}
