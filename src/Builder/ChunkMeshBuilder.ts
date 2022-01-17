import type { Util } from "Global/Util.helper";
import type { InfoByte } from "Global/Util/InfoByte";
import type { MeshData } from "Meta/Util.types";
import { DivineVoxelEngineBuilder } from "./DivineVoxelEngineBuilder";
import type { ShapeManager } from "./Shapes/ShapeManager";

export class ChunkMeshBuilder {
 infoByte: InfoByte;
 constructor(
  private DVEB : DivineVoxelEngineBuilder,
  private shapeManager: ShapeManager,
  private UTIL: Util
 ) {
  this.infoByte = this.UTIL.getInfoByte();
 }
 buildChunkMesh(
  chunkType : number,
  chunkX : number,
  chunkZ : number,
  positionsTemplate: Uint16Array,
  faceTemplate: Uint8Array,
  shapeTemplate: Uint16Array,
  uvTemplate: Uint16Array,
  lightTemplate: Float32Array,
  aoTemplate: Float32Array
 ) {
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
   const x = positionsTemplate[positionIndex] + chunkX;
   const y = positionsTemplate[positionIndex + 1];
   const z = positionsTemplate[positionIndex + 2] + chunkZ;

   const shapeId = shapeTemplate[shapeIndex];
   const shape = this.shapeManager.getShape(shapeId);
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
   shapeIndex++;
   faceIndex++;
  }


  const positionArray = new Float32Array(positions);
  const indiciesArray = new Int32Array(indices);
  const linearColorsArray = new Float32Array(colors);
  const fullColorsArray = new Float32Array(colors);
  const uvArray = new Float32Array(uvs);

  //@ts-ignore
  this.DVEB.worker.postMessage(
   [
    chunkType,
    chunkX,
    chunkZ,
    positionArray.buffer,
    indiciesArray.buffer,
    linearColorsArray.buffer,
    fullColorsArray.buffer,
    uvArray.buffer,
   ],
   //@ts-ignore
   [
    positionArray.buffer,
    indiciesArray.buffer,
    linearColorsArray.buffer,
    fullColorsArray.buffer,
    uvArray.buffer,
   ]
  );


 }
}
