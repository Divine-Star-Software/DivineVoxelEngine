import type { Util } from "Global/Util.helper";
import type { InfoByte } from "Global/Util/InfoByte";
import type { MeshData } from "Meta/Util.types";
import type { ShapeManager } from "./Shapes/ShapeManager";

export class ChunkMeshBuilder {
 infoByte: InfoByte;
 constructor(
  private shapeManager: ShapeManager,
  private UTIL: Util
 ) {
  this.infoByte = this.UTIL.getInfoByte();
 }
 buildChunkMesh(
  positionsTemplate: Uint16Array,
  faceTemplate: Uint8Array,
  shapeTemplate: Uint16Array,
  uvTemplate: Uint16Array,
  lightTemplate: Float32Array,
  aoTemplate: Float32Array
 ): MeshData {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];

  let indicieIndex = 0;
  let aoIndex = 0;
  let uvIndex = 0;
  let faceIndex = 0;
  let shapeIndex = 0;

  for (
   let positionIndex = 0;
   positionIndex < positionsTemplate.length;
   positionIndex += 3
  ) {
   const x = positionsTemplate[positionIndex];
   const y = positionsTemplate[positionIndex + 1];
   const z = positionsTemplate[positionIndex + 2];

   const shapeId = shapeTemplate[shapeTemplate[shapeIndex]];
   const shape = this.shapeManager.shapes[shapeId];
   const newIndexes = shape.addToChunkMesh({
    positions: positions,
    indices: indices,
    fullColors: [],
    linearColors: colors,
    uvs: uvs,
    face: faceTemplate[faceIndex],
    indicieIndex: indicieIndex,
    unTemplate: uvTemplate,
    uvTemplateIndex: uvIndex,
    lightTemplate: aoTemplate,
    lightIndex: 0,
    aoTemplate: aoTemplate,
    aoIndex: aoIndex,
    position: { x: x, y: y, z: z },
   });
   indicieIndex = newIndexes.newIndicieIndex;
   aoIndex = newIndexes.newAOIndex;
   uvIndex = newIndexes.newUVTemplateIndex;

   faceIndex++;
  }

  return {
   positions: positions,
   indices: indices,
   colors: colors,
   uvs: uvs,
  };
 }
}
