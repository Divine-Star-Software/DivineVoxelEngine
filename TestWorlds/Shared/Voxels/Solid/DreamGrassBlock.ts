import type {
 VoxelData,
 VoxelInteface,
 VoxelProcessData,
} from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class DreamGrassBlock implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Dream Grass Block",
  shapeId: "Box",
  id: "dve:dreamgrassblock",
  substance: "solid",
  defaultState: ["dve:dreamgrassblock", 0],
 };
 hooks = {};
 trueShapeId = 0;

 process(data: VoxelProcessData): void {
  const uv = this.voxelHelper.textureManager.getTextureUV(
   "solid",
   "dreamstone",
   "grassy-top"
  );

  if (data.exposedFaces[0]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[1]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[2]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[3]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[4]) {
   data.uvTemplate.push(uv);
  }
  if (data.exposedFaces[5]) {
   data.uvTemplate.push(uv);
  }
  
  data.shapeTemplate.push(this.trueShapeId);
  this.voxelHelper.processVoxelLight(data, this);
 }
}
