import type { Util } from "Global/Util.helper";
import type { InfoByte } from "Global/Util/InfoByte";
import type { MeshData } from "Meta/Util.types";
import type { MeshBuilder } from "./Meshes/MeshBuilder";
import type { ShapeManager } from "./Shapes/ShapeManager";

export class ChunkMeshBuilder {
 infoByte: InfoByte;
 constructor(
  private meshBuilder: MeshBuilder,
  private shapeManager: ShapeManager,
  private UTIL: Util
 ) {
  this.infoByte = this.UTIL.getInfoByte();
 }
 buildChunkMesh(
  chunkX: number,
  chunkZ: number,
  chunkPositions: Uint16Array,
  chunkFaces: Uint8Array,
  chunkBlocks: Uint16Array,
  chunkAmbientOcculusion: Float32Array
 ): MeshData {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const shape = this.shapeManager.shapes[0];
  let indicieIndex = 0;
  let aoIndex = 0;
  let faceIndex = 0;

  for (
   let positionIndex = 0;
   positionIndex < chunkPositions.length;
   positionIndex += 3
  ) {
   const x = chunkPositions[positionIndex];
   const y = chunkPositions[positionIndex + 1];
   const z = chunkPositions[positionIndex + 2];

   const newIndexes = shape.addToChunkMesh({
    postions: positions,
    indices: indices,
    fullColors: [],
    linearColors: colors,
    uvs: uvs,
    face: chunkFaces[faceIndex],
    indicieIndex: indicieIndex,
    unTemplate: new Uint16Array(),
    uvTemplateIndex: 0,
    lightTemplate: chunkAmbientOcculusion,
    lightIndex: 0,
    aoTemplate: chunkAmbientOcculusion,
    aoIndex: aoIndex,
    position: { x: x, y: y, z: z },
   });
   indicieIndex = newIndexes.newIndicieIndex;
   aoIndex = newIndexes.newAOIndex;

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
