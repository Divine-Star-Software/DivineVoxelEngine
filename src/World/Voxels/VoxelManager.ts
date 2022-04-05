import { DivineVoxelEngineWorld } from "index";
import { VoxelHooks, VoxelInteface } from "Meta/World/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/World/Voxels/VoxelManager.interface";

export class VoxelManager implements VoxelManagerInterface {
 voxels: Record<string, VoxelInteface> = {};
 shapeMap: Record<string, number> = {};
 shapeMapHasBeenSet = false;

 fluidShapeMap: Record<string, number> = {};
 fluidShapeMapHasBeenSet = false;

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 setShapeMap(shapeMap: Record<string, number>) {
  this.shapeMap = shapeMap;
  this.shapeMapHasBeenSet = true;
  for (const voxelId of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelId];
   if (voxel.data.substance !== "fluid") {
    voxel.trueShapeId = this.shapeMap[voxel.data.shapeId];
   }
  }
 }

 setFluidShapeMap(shapeMap: Record<string, number>) {
  this.fluidShapeMap = shapeMap;
  this.fluidShapeMapHasBeenSet = true;
  for (const voxelId of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelId];
   if (voxel.data.substance === "fluid") {
    voxel.trueShapeId = this.fluidShapeMap[voxel.data.shapeId];
   }
  }
 }

 shapMapIsSet() {
  return this.shapeMapHasBeenSet;
 }

 fluidShapMapIsSet() {
  return this.fluidShapeMapHasBeenSet;
 }

 getVoxel(id: string): VoxelInteface {
  return this.voxels[id];
 }

 registerVoxelData(voxel: VoxelInteface) {
  this.voxels[voxel.data.id] = voxel;
  if (this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "global") {
   this.DVEW.worldGeneration.voxelPalette.registerVoxelForGlobalPalette(voxel);
  }
  if (
   this.DVEW.engineSettings.settings.world?.voxelPaletteMode == "per-region"
  ) {
   this.DVEW.worldGeneration.voxelPalette.registerVoxelForPerRegionVoxelPalette(
    voxel
   );
  }
 }

 runVoxelHookForAll(hook: VoxelHooks) {
  for (const voxelID of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook]();
  }
 }
}
