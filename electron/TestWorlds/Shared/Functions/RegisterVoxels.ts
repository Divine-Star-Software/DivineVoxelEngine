import { Dreamestone } from "../Voxels/Solid/DreamStone.js";
import { DreamGrassBlock } from "../Voxels/Solid/DreamGrassBlock.js";
import { DebugBox } from "../Voxels/Solid/DebugBox.js";
import { DreamStonePillar } from "../Voxels/Solid/DreamStonePillar.js";
import { DreamGrass } from "../Voxels/Flora/DreamGrass.js";
import { LiquidDreamEther } from "../Voxels/Fluid/LiquidDreamEther.js";
import type { DivineVoxelEngineWorld } from "../../../out/World/DivineVoxelEngineWorld.js";

export function RegisterVoxels(
 DVEW: DivineVoxelEngineWorld,
 voxelPaletteMode: "global" | "per-chunk"
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

 if (voxelPaletteMode == "global") {
  //solid
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(debugBlock);
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamStone);
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamStonePillar);
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamGrassBlock);
  //flora
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(dreamGrass);
  //fluid
  DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(liquidDreamEther);
 }
 if (voxelPaletteMode == "per-chunk") {
  //solid
  DVEW.worldGeneration.voxelPalette.registerVoxelForPerChunkVoxelPalette(debugBlock);
  DVEW.worldGeneration.voxelPalette.registerVoxelForPerChunkVoxelPalette(dreamStone);
  DVEW.worldGeneration.voxelPalette.registerVoxelForPerChunkVoxelPalette(dreamStonePillar);
  DVEW.worldGeneration.voxelPalette.registerVoxelForPerChunkVoxelPalette(dreamGrassBlock);
  //flora
  DVEW.worldGeneration.voxelPalette.registerVoxelForPerChunkVoxelPalette(dreamGrass);
  //fluid
  DVEW.worldGeneration.voxelPalette.registerVoxelForPerChunkVoxelPalette(liquidDreamEther);
 }
 const chunk = DVEW.worldGeneration.getBlankChunk(true,true);
 DVEW.worldGeneration.voxelPalette.addToChunksVoxelPalette(
  chunk,
  dreamStonePillar.data.id,
  "default"
 );
 const paletteId = DVEW.worldGeneration.voxelPalette.getVoxelPaletteId(
  chunk,
  dreamStonePillar.data.id,
  "default"
 );
 if (paletteId) {
  const voxelData = DVEW.worldGeneration.voxelPalette.getVoxelData(
   chunk,
   paletteId
  );
  if (voxelData) {
   const voxelTrueId = voxelData[0];
   const voxelStateId = voxelData[1];
  }
 }
}
