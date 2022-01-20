import type { ShapeManager } from "Builder/Shapes/ShapeManager";
import type { Util } from "Global/Util.helper";
import { InfoByte } from "Global/Util/InfoByte";
import type { MeshData } from "Meta/Util.types";

export class FluidMeshBuilder {
 infoByte: InfoByte;
 constructor(private shapeManager: ShapeManager, private UTIL: Util) {
  this.infoByte = this.UTIL.getInfoByte();
 }

 templateMap: Record<string, number[]> = {};

 savedTemplates: Record<string, any[]> = {};

 removeTemplate(chunkX: number, chunkY :number,chunkZ: number) {
  delete this.savedTemplates[`${chunkX}-${chunkZ}-${chunkY}`];
  delete this.templateMap[`${chunkX}-${chunkZ}-${chunkY}`];
 }

 generateMesh() {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  let indicieIndex = 0;
  let count = 0;
  for (const chunkKey of Object.keys(this.savedTemplates)) {
   const template = this.savedTemplates[chunkKey];
   const chunkCords = this.templateMap[chunkKey];
   const positionsTemplate = template[0];
   const faceTemplate = template[1];
   const shapeTemplate = template[2];
   const uvTemplate = template[3];
   const lightTemplate = template[4];
   const aoTemplate = template[5];

   let aoIndex = 0;
   let uvIndex = 0;
   let faceIndex = 0;
   let shapeIndex = 0;
   let positionIndex = 0;

   for (let faceIndex = 0; faceIndex < faceTemplate.length; faceIndex++) {
    count++;
    const x = positionsTemplate[positionIndex] + chunkCords[0];
    const y = positionsTemplate[positionIndex + 1];
    const z = positionsTemplate[positionIndex + 2] + chunkCords[1];

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
    positionIndex += 3;
   }
  }

  return [positions, indices, colors, uvs];
 }

 addTemplate(
  chunkX: number,
  chunkY : number,
  chunkZ: number,
  newPositionsTemplate: Uint16Array,
  newFaceTemplate: Uint8Array,
  newShapeTemplate: Uint16Array,
  newUvTemplate: Uint16Array,
  newLightTemplate: Float32Array,
  newAoTemplate: Float32Array
 ) {
  this.savedTemplates[`${chunkX}-${chunkZ}`] = [
   newPositionsTemplate,
   newFaceTemplate,
   newShapeTemplate,
   newUvTemplate,
   newLightTemplate,
   newAoTemplate,
  ];

  this.templateMap[`${chunkX}-${chunkZ}`] = [chunkX, chunkZ];
 }
}
