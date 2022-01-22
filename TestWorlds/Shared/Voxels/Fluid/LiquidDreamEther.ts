import type {
 VoxelAOCalcData,
 VoxelData,
 VoxelInteface,
 VoxelLightCalcData,
 VoxelProcessData,
} from "../../../../out/Meta/World/Voxels/Voxel.types";
import type { VoxelHelperInterface } from "../../../../out/Meta/World/Voxels/VoxelHelper.interface";

export class LiquidDreamEther implements VoxelInteface {
 constructor(public voxelHelper: VoxelHelperInterface) {}
 data = <VoxelData>{
  name: "Liquid Dream Ether",
  shapeId: "Box",
  id: "dve:liquiddreamether",
  substance: "fluid",
  defaultState: ["dve:liquiddreamether", 0],
 };
 hooks = {};
 trueShapeId = 0;

 getShapeId(voxelData: any[]): number {
  return this.trueShapeId;
 }

 getUVs(
  uvs: number[],
  chunkX: number,
  chunkZ: number,
  voxelExposedFaceEncodedBit: number,
  voxelData: any[]
 ): void {
  let uv = this.voxelHelper.textureManager.getTextureUV(
   "fluid",
   "liquid-dream-ether",
   "still-1"
  );
  if (this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "top")) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "bottom")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "east")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "west")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "south")
  ) {
   uvs.push(uv);
  }
  if (
   this.voxelHelper.util.isFaceExposexd(voxelExposedFaceEncodedBit, "north")
  ) {
   uvs.push(uv);
  }
 }

 getAO(data: VoxelAOCalcData): void {
  if (data.exposedFaces[0]) {
   data.aoTemplate.push(1, 1, 1, 1);
  }
  if (data.exposedFaces[1]) {
   data.aoTemplate.push(1, 1, 1, 1);
  }
  if (data.exposedFaces[2]) {
   data.aoTemplate.push(1, 1, 1, 1);
  }
  if (data.exposedFaces[3]) {
   data.aoTemplate.push(1, 1, 1, 1);
  }
  if (data.exposedFaces[4]) {
   data.aoTemplate.push(1, 1, 1, 1);
  }
  if (data.exposedFaces[5]) {
   data.aoTemplate.push(1, 1, 1, 1);
  }
 }
 getLight(data: VoxelLightCalcData): void {
  this.voxelHelper.calculateVoxelLight(data, this);
 }
 process(data: VoxelProcessData): void {
    if (data.exposedFaces[0]) {
        data.sunLightTemplate.push(0b1111,0b1111,0b1111,0b1111);
       }
       if (data.exposedFaces[1]) {
         data.sunLightTemplate.push(0b1111,0b1111,0b1111,0b1111);
       }
       if (data.exposedFaces[2]) {
         data.sunLightTemplate.push(0b1111,0b1111,0b1111,0b1111);
       }
       if (data.exposedFaces[3]) {
         data.sunLightTemplate.push(0b1111,0b1111,0b1111,0b1111);
       }
       if (data.exposedFaces[4]) {
         data.sunLightTemplate.push(0b1111,0b1111,0b1111,0b1111);
       }
       if (data.exposedFaces[5]) {
         data.sunLightTemplate.push(0b1111,0b1111,0b1111,0b1111);
       }
 }
}
