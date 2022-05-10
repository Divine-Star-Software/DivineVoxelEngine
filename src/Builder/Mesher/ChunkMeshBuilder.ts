import type { InfoByte } from "Global/Util/InfoByte";
import { FullChunkTemplate, VoxelSubstanceType } from "Meta/index";
import { DivineVoxelEngineBuilder } from "../DivineVoxelEngineBuilder";

export class ChunkMeshBuilder {
 infoByte: typeof InfoByte;
 voxelBuildOrder: VoxelSubstanceType[] = ["solid", "flora", "magma"];
 voxelTypeMap = {
  solid: 0,
  flora: 1,
  magma: 3,
 };
 constructor(private DVEB: DivineVoxelEngineBuilder) {
  this.infoByte = this.DVEB.UTIL.getInfoByte();
 }
 async buildChunkMeshO(
  chunkType: number,
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  positionsTemplate: Uint16Array,
  faceTemplate: Uint8Array,
  shapeTemplate: Uint16Array,
  uvTemplate: Uint16Array,
  colorTemplate: Float32Array,
  lightTemplate: Float32Array,
  aoTemplate: Float32Array
 ) {
  const positions: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const AOColors: number[] = [];
  const sunLightColors: number[] = [];
  const colors: number[] = [];
  const RGBLightColors: number[] = [];
  //console.log(lightTemplate);

  let indicieIndex = 0;
  let aoIndex = 0;
  let RGBLightIndex = 0;
  let colorIndex = 0;
  let uvIndex = 0;
  let faceIndex = 0;
  let shapeIndex = 0;

  for (
   let positionIndex = 0;
   positionIndex < positionsTemplate.length;
   positionIndex += 3
  ) {
   const x = positionsTemplate[positionIndex] + chunkX;
   const y = positionsTemplate[positionIndex + 1] + chunkY;
   const z = positionsTemplate[positionIndex + 2] + chunkZ;

   const shapeId = shapeTemplate[shapeIndex];
   const shape = this.DVEB.shapeManager.getShape(shapeId);
   const newIndexes = shape.addToChunkMesh({
    positions: positions,
    indices: indices,
    RGBLightColors: RGBLightColors,
    sunLightColors: sunLightColors,
    colors: colors,
    AOColors: AOColors,
    uvs: uvs,
    face: faceTemplate[faceIndex],
    indicieIndex: indicieIndex,
    unTemplate: uvTemplate,
    uvTemplateIndex: uvIndex,
    colorTemplate: colorTemplate,
    colorIndex: colorIndex,
    lightTemplate: lightTemplate,
    lightIndex: RGBLightIndex,
    aoTemplate: aoTemplate,
    aoIndex: aoIndex,
    position: { x: x, y: y, z: z },
   });
   indicieIndex = newIndexes.newIndicieIndex;
   aoIndex = newIndexes.newAOIndex;
   uvIndex = newIndexes.newUVTemplateIndex;
   RGBLightIndex = newIndexes.newlightIndex;
   colorIndex = newIndexes.newColorIndex;
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

  this.DVEB.renderComm.sendMessage(
   chunkType,
   [
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

 async buildChunkMesh(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  template: FullChunkTemplate
 ) {
  let i = this.voxelBuildOrder.length;
  while (i--) {
   const type = this.voxelBuildOrder[i];
   const baseTemplate = template[type];

   const positions: number[] = [];
   const indices: number[] = [];
   const uvs: number[] = [];
   const AOColors: number[] = [];
   const sunLightColors: number[] = [];
   const colors: number[] = [];
   const RGBLightColors: number[] = [];
   //console.log(lightTemplate);

   let indicieIndex = 0;
   let aoIndex = 0;
   let RGBLightIndex = 0;
   let colorIndex = 0;
   let uvIndex = 0;
   let faceIndex = 0;
   let shapeIndex = 0;

   for (
    let positionIndex = 0;
    positionIndex < baseTemplate.positionTemplate.length;
    positionIndex += 3
   ) {
    const x = baseTemplate.positionTemplate[positionIndex] + chunkX;
    const y = baseTemplate.positionTemplate[positionIndex + 1] + chunkY;
    const z = baseTemplate.positionTemplate[positionIndex + 2] + chunkZ;

    const shapeId = baseTemplate.shapeTemplate[shapeIndex];
    const shape = this.DVEB.shapeManager.getShape(shapeId);
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

   if (type !== "fluid") {
    this.DVEB.renderComm.sendMessage(
     (this as any).voxelTypeMap[type],
     [
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
  }
 }
}
