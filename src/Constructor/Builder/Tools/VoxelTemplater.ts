//types
import type { VoxelTemplate } from "Meta/Constructor/VoxelTemplate.types";
import type { TextureRotations } from "Meta/Constructor/Geometry/Geometry.types";
import type { DirectionNames } from "Meta/Util.types";
import type { DataTool } from "Tools/Data/DataTool";
//objects
import { Processor } from "../Processor/Processor.js";
import { FaceRecord } from "../../../Data/Constants/Util/Faces.js";

class VoxelTemplaterBase {
 _template = <VoxelTemplate>{};
 _faces = 0;

 currentVoxel = <DataTool>{};
 utilDataTool = <DataTool>{};
 addUV(index: number, forNumFaces = 1) {
  while (forNumFaces--) {
   this._template.uvTemplate.push(index);
  }
  return this;
 }
 addOverlayUVs(
  index: [number] | [number, number, number, number],
  forNumFaces = 1
 ) {
  if (index.length == 1) {
   while (forNumFaces--) {
    this._template.overlayUVTemplate.push(
     index[0],
     index[0],
     index[0],
     index[0]
    );
   }
   return this;
  }
  while (forNumFaces--) {
   this._template.overlayUVTemplate.push(...index);
  }
  return this;
 }
 addAOValue(value: number, forNumFaces = 1) {
  while (forNumFaces--) {
   this._template.aoTemplate.push(value);
  }
  return this;
 }
 addLightValue(value: number, forNumFaces = 1) {
  while (forNumFaces--) {
   this._template.lightTemplate.push(value);
  }
  return this;
 }
 addCurrentLightValue(forNumFaces = 1) {
  const l = this.currentVoxel.getLight();
  while (forNumFaces--) {
   this._template.lightTemplate.push(l);
  }
  return this;
 }
 setTextureRotation(face: DirectionNames, rotation: TextureRotations) {
  Processor.textureRotation[FaceRecord[face]] = rotation;
  return this;
 }
 isFaceExpposed(face: DirectionNames) {
  return Processor.exposedFaces[FaceRecord[face]] == 1;
 }
 processVoxelLight(ignoreAO = false) {
  Processor.doVoxelLight(
   this._template,
   this.currentVoxel.x,
   this.currentVoxel.y,
   this.currentVoxel.z,
   ignoreAO,
   Processor.LOD
  );
  return this;
 }
}
export const VoxelTemplater = new VoxelTemplaterBase();
