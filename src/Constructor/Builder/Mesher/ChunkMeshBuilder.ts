//types
import type { FullChunkTemplate, VoxelSubstanceType } from "Meta/index";
//objects
import { DVEB } from "../DivineVoxelEngineBuilder.js";
import { DVEC } from "../../DivineVoxelEngineConstructor.js";
import { ConstructorToRenderMessages } from "../../../Shared/InterComms/ConstructorToRender.js";
import { ConstructorToWorldMessages } from "../../../Shared/InterComms/ConstructorToWorld.js";

export const ChunkMeshBuilder = {
 voxelBuildOrder: <VoxelSubstanceType[]>["solid", "flora", "fluid", "magma"],
 voxelTypeMap: {
  solid: 0,
  flora: 1,
  fluid: 2,
  magma: 3,
 },

 buildChunkMesh(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  template: FullChunkTemplate
 ) {
  let i = this.voxelBuildOrder.length;
  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];

   if (baseTemplate.positionTemplate.length == 0) continue;

   const positions: number[] = [];
   const indices: number[] = [];
   const uvs: number[] = [];
   const AOColors: number[] = [];
   const sunLightColors: number[] = [];
   const colors: number[] = [];
   const RGBLightColors: number[] = [];

   let indicieIndex = 0;
   let faceIndex = 0;
   let shapeIndex = 0;

   let aoIndex = 0;
   let RGBLightIndex = 0;
   let colorIndex = 0;
   let uvIndex = 0;
   let shapeStateIndex = 0;

   for (
    let positionIndex = 0;
    positionIndex < baseTemplate.positionTemplate.length;
    positionIndex += 3
   ) {
    const x = baseTemplate.positionTemplate[positionIndex] + chunkX;
    const y = baseTemplate.positionTemplate[positionIndex + 1] + chunkY;
    const z = baseTemplate.positionTemplate[positionIndex + 2] + chunkZ;

    const shapeId = baseTemplate.shapeTemplate[shapeIndex];
    const shape = DVEB.shapeManager.getShape(shapeId);
    const newIndexes = shape.addToChunkMesh({
     positions: positions,
     indices: indices,
     RGBLightColors: RGBLightColors,
     sunLightColors: sunLightColors,
     colors: colors,
     AOColors: AOColors,
     uvs: uvs,
     face: baseTemplate.faceTemplate[faceIndex],
     indicieIndex: indicieIndex,
     shapeStateTemplate: baseTemplate.shapeStateTemplate,
     shapeStateIndex: shapeStateIndex,
     unTemplate: baseTemplate.uvTemplate,
     uvTemplateIndex: uvIndex,
     colorTemplate: baseTemplate.colorTemplate,
     colorIndex: colorIndex,
     lightTemplate: baseTemplate.lightTemplate,
     lightIndex: RGBLightIndex,
     aoTemplate: baseTemplate.aoTemplate,
     aoIndex: aoIndex,
     position: { x: x, y: y, z: z },
    });
    indicieIndex = newIndexes.newIndicieIndex;
    aoIndex = newIndexes.newAOIndex;
    uvIndex = newIndexes.newUVTemplateIndex;
    RGBLightIndex = newIndexes.newlightIndex;
    colorIndex = newIndexes.newColorIndex;
    shapeStateIndex++;
    shapeIndex++;
    faceIndex++;
   }

   const positionArray = new Float32Array(positions);
   const indiciesArray = new Int32Array(indices);
   const AOColorsArray = new Float32Array(AOColors);
   const RGBLightColorsArray = new Float32Array(RGBLightColors);
   const sunLightColorsArray = new Float32Array(sunLightColors);
   const colorsArray = new Float32Array(colors);
   const uvArray = new Float32Array(uvs);


   DVEC.renderComm.sendMessage(
    ConstructorToRenderMessages.setChunk,
    [
     (this as any).voxelTypeMap[type],
     chunkX,
     chunkY,
     chunkZ,
     positionArray.buffer,
     indiciesArray.buffer,
     AOColorsArray.buffer,
     RGBLightColorsArray.buffer,
     sunLightColorsArray.buffer,
     colorsArray.buffer,
     uvArray.buffer,
    ],
    [
     positionArray.buffer,
     indiciesArray.buffer,
     AOColorsArray.buffer,
     RGBLightColorsArray.buffer,
     sunLightColorsArray.buffer,
     colorsArray.buffer,
     uvArray.buffer,
    ]
   );
  }
  DVEC.worldComm.sendMessage(ConstructorToWorldMessages.chunkDoneBuilding, []);
 },
};
