import type {
 VoxelData,
 VoxelInteface,
 VoxelProcessData,
} from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class DreamStonePillar implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Dream Stone Pillar",
  shapeId: "Box",
  id: "dve:dreamstonepillar",
  substance: "solid",
  defaultState: ["dve:dreamstonepillar", 0],
 };
 hooks = {};
 trueShapeId = 0;

 process(data: VoxelProcessData): void {
  let topBottomUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar",
   "top"
  );
  let sideUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar"
  );
  let sideTopUV = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar",
   "side-top"
  );
  let sideBottom = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone-pillar",
   "side-bottom"
  );

  if (data.exposedFaces[0]) {
   data.uvTemplate.push(topBottomUV);
   sideUV = sideTopUV;
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(topBottomUV);
  }
  if (data.exposedFaces[0] && data.exposedFaces[1]) {
   sideUV = topBottomUV;
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(sideUV);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(sideUV);
  }

  data.shapeTemplate.push(this.trueShapeId);
  data.shapeStateTemplate.push(data.voxelData[1]);
  this.voxelHelper.processVoxelLight(data, this);
 }
}
