import type {
 ChunkData,
 ChunkTemplate,
 FullChunkTemplate,
} from "Meta/Chunks/Chunk.types.js";
import type { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types.js";
import type { VoxelPalette } from "Meta/WorldData/World.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";
import type { WorldData } from "World/WorldData/WorldData.js";

import {
 ChunkOcculsionCalcuation,
 BuildAmbientOcclusion,
} from "./Functions/ChunkAO.js";

/**# Chunk Processor
 * ---
 * Takes the given world data and generates templates
 * to build chunk meshes.
 */
export class ChunkProcessor {
 worldBottomY = 0;
 worldTopY = 256;
 chunkOcculsionCalcuation = ChunkOcculsionCalcuation;
 chunkTemplates: Record<number, Record<number, number[][]>> = {};

 /**## substance rules
  * ---
  * defines substance interactions for face culling/adding.
  * First is the voxel being tested. The second are its neighbors
  */
 substanceRules: Record<string, boolean> = {
  "solid-solid": false,
  "solid-flora": true,
  "solid-transparent": true,
  "solid-fluid": true,
  "solid-magma": true,

  "transparent-solid": true,
  "transparent-flora": true,
  "transparent-transparent": true,
  "transparent-fluid": true,
  "transparent-magma": true,

  "fluid-solid": false,
  "fluid-flora": true,
  "fluid-transparent": true,
  "fluid-fluid": false,
  "fluid-magma": true,

  "magma-solid": false,
  "magma-flora": true,
  "magma-transparent": true,
  "magma-fluid": true,
  "magma-magma": false,
 };
 exposedFaces: number[] = [];
 constructor(private DVEW: DivineVoxelEngineWorld) {
  this.worldData = DVEW.worldData;
 }
 worldData: WorldData;

 getBaseTemplateNew(): FullChunkTemplate {
  return {
   ...{
    solid: {
     positionTemplate: [],
     faceTemplate: [],
     uvTemplate: [],
     shapeTemplate: [],
     RGBLightTemplate: [],
     sunLightTemplate: [],
     aoTemplate: [],
    },
    transparent: {
     positionTemplate: [],
     faceTemplate: [],
     uvTemplate: [],
     shapeTemplate: [],
     RGBLightTemplate: [],
     sunLightTemplate: [],
     aoTemplate: [],
    },
    flora: {
     positionTemplate: [],
     faceTemplate: [],
     uvTemplate: [],
     shapeTemplate: [],
     RGBLightTemplate: [],
     sunLightTemplate: [],
     aoTemplate: [],
    },
    fluid: {
     positionTemplate: [],
     faceTemplate: [],
     uvTemplate: [],
     shapeTemplate: [],
     RGBLightTemplate: [],
     sunLightTemplate: [],
     aoTemplate: [],
    },
    magma: {
     positionTemplate: [],
     faceTemplate: [],
     uvTemplate: [],
     shapeTemplate: [],
     RGBLightTemplate: [],
     sunLightTemplate: [],
     aoTemplate: [],
    },
   },
  };
 }
 async makeAllChunkTemplatesAsync(
  chunk: ChunkData,
  voxelPalette: VoxelPalette,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): Promise<FullChunkTemplate> {
  const template: FullChunkTemplate = this.getBaseTemplateNew();
  const voxels = chunk.voxels;
  const min = chunk.maxMinHeight[0];
  const max = chunk.maxMinHeight[1];

  for (let x = 0; x < 16; x++) {
   if (!voxels[x]) {
    continue;
   }

   for (let z = 0; z < 16; z++) {
    if (!voxels[x][z]) {
     continue;
    }
    for (const y of voxels[x][z].keys()) {
     const voxelData = voxels[x][z][y];
     if (!voxelData) continue;
     const voxelId = voxelData[0];
     if (voxelId < 0) continue;
     const voxelPaletteData = voxelPalette[voxelId];
     if (!voxelPaletteData) continue;
     const voxel = this.DVEW.voxelManager.getVoxel(voxelPaletteData[0]);
     const baseTemplate = template[voxel.data.substance];

     let faceBit = 0;

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY + 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 0);
      this.exposedFaces[0] = 1;
     } else {
      this.exposedFaces[0] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY - 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 1);
      this.exposedFaces[1] = 1;
     } else {
      this.exposedFaces[1] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX + 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 2);
      this.exposedFaces[2] = 1;
     } else {
      this.exposedFaces[2] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX - 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 3);
      this.exposedFaces[3] = 1;
     } else {
      this.exposedFaces[3] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ - 1
      )
     ) {
      faceBit = faceBit | (1 << 4);
      this.exposedFaces[4] = 1;
     } else {
      this.exposedFaces[4] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ + 1
      )
     ) {
      faceBit = faceBit | (1 << 5);
      this.exposedFaces[5] = 1;
     } else {
      this.exposedFaces[5] = 0;
     }

     if (faceBit == 0) continue;

     voxel.process({
      voxelPalettee: voxelPalette,
      voxelData: voxelData,
      exposedFaces: this.exposedFaces,
      aoTemplate: baseTemplate.aoTemplate,
      RGBLightTemplate: baseTemplate.RGBLightTemplate,
      sunLightTemplate: baseTemplate.sunLightTemplate,
      shapeTemplate: baseTemplate.shapeTemplate,
      uvTemplate: baseTemplate.uvTemplate,
      chunkX: chunkX,
      chunkY: chunkY,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });

     // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faceBit);
    }
   }
  }
  this.DVEW.builderManager.requestFullChunkBeBuilt(
   chunkX,
   chunkY,
   chunkZ,
   template
  );
  return template;
 }
 makeAllChunkTemplates(
  chunk: ChunkData,
  voxelPalette: VoxelPalette,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): FullChunkTemplate {
  const template: FullChunkTemplate = this.getBaseTemplateNew();
  const voxels = chunk.voxels;
  const min = chunk.maxMinHeight[0];
  const max = chunk.maxMinHeight[1];

  for (let x = 0; x < 16; x++) {
   if (!voxels[x]) {
    continue;
   }

   for (let z = 0; z < 16; z++) {
    if (!voxels[x][z]) {
     continue;
    }
    for (const y of voxels[x][z].keys()) {
     const voxelData = voxels[x][z][y];
     if (!voxelData) continue;
     const voxelId = voxelData[0];
     if (voxelId < 0) continue;
     const voxelPaletteData = voxelPalette[voxelId];
     if (!voxelPaletteData) continue;
     const voxel = this.DVEW.voxelManager.getVoxel(voxelPaletteData[0]);
     const baseTemplate = template[voxel.data.substance];

     let faceBit = 0;

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY + 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 0);
      this.exposedFaces[0] = 1;
     } else {
      this.exposedFaces[0] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY - 1,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 1);
      this.exposedFaces[1] = 1;
     } else {
      this.exposedFaces[1] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX + 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 2);
      this.exposedFaces[2] = 1;
     } else {
      this.exposedFaces[2] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX - 1,
       y + chunkY,
       z + chunkZ
      )
     ) {
      faceBit = faceBit | (1 << 3);
      this.exposedFaces[3] = 1;
     } else {
      this.exposedFaces[3] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ - 1
      )
     ) {
      faceBit = faceBit | (1 << 4);
      this.exposedFaces[4] = 1;
     } else {
      this.exposedFaces[4] = 0;
     }

     if (
      this.worldData.voxelFaceCheck(
       voxel,
       voxelData,
       x + chunkX,
       y + chunkY,
       z + chunkZ + 1
      )
     ) {
      faceBit = faceBit | (1 << 5);
      this.exposedFaces[5] = 1;
     } else {
      this.exposedFaces[5] = 0;
     }

     if (faceBit == 0) continue;

     voxel.process({
      voxelPalettee: voxelPalette,
      voxelData: voxelData,
      exposedFaces: this.exposedFaces,
      aoTemplate: baseTemplate.aoTemplate,
      RGBLightTemplate: baseTemplate.RGBLightTemplate,
      sunLightTemplate: baseTemplate.sunLightTemplate,
      shapeTemplate: baseTemplate.shapeTemplate,
      uvTemplate: baseTemplate.uvTemplate,
      chunkX: chunkX,
      chunkY: chunkY,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });

     // baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPaletteData));
     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faceBit);
    }
   }
  }

  return template;
 }
}
