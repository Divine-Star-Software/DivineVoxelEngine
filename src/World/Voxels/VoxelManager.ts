import { DivineVoxelEngineWorld } from "index";
import { VoxelHooks, VoxelInteface,VoxelData } from "Meta/Voxels/Voxel.types";
import { VoxelManagerInterface } from "Meta/Voxels/VoxelManager.interface";

export class VoxelManager {
 voxels: Record<string, VoxelData> = {};
 shapeMap: Record<string, number> = {};
 shapeMapHasBeenSet = false;

 fluidShapeMap: Record<string, number> = {};
 fluidShapeMapHasBeenSet = false;

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 setShapeMap(shapeMap: Record<string, number>) {

 }

 setFluidShapeMap(shapeMap: Record<string, number>) {

 }

 shapMapIsSet() {
  return this.shapeMapHasBeenSet;
 }

 fluidShapMapIsSet() {
  return this.fluidShapeMapHasBeenSet;
 }

 getVoxel(id: string): VoxelData {
     console.log(id);
  return this.voxels[id];
 }

 registerVoxelData(voxel: VoxelData) {
  this.voxels[voxel.id] = voxel;
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
/*   for (const voxelID of Object.keys(this.voxels)) {
   const voxel = this.voxels[voxelID];
   if (!voxel.hooks[hook]) continue;
   voxel.hooks[hook]();
  } */
 }
}
