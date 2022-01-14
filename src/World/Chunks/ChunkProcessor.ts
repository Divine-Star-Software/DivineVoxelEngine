import { ChunkTemplate, FullChunkTemplate } from "Meta/Chunks/Chunk.types.js";
import { VoxelSubstanceType } from "Meta/World/Voxels/Voxel.types.js";
import { VoxelPallet } from "Meta/WorldData/World.types.js";
import type { DivineVoxelEngineWorld } from "World/DivineVoxelEngineWorld.js";

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

 constructor(private DVEW: DivineVoxelEngineWorld) {}

 getBaseTemplate(): ChunkTemplate {
  return {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   shapeTemplate: [],
   ligtTemplate: [],
   aoTemplate: [],
  };
 }

 makeAllChunkTemplates(
  chunkVoxels: any[][][],
  voxelPallet: VoxelPallet,
  chunkX: number,
  chunkZ: number
 ): FullChunkTemplate {
  const template: FullChunkTemplate = {
   solid: this.getBaseTemplate(),
   transparent: this.getBaseTemplate(),
   flora: this.getBaseTemplate(),
   fluid: this.getBaseTemplate(),
   magma: this.getBaseTemplate(),
  };

  const exposedFaces: number[] = [];

  for (const x of chunkVoxels.keys()) {
   if (!chunkVoxels[x]) {
    continue;
   }

   for (const z of chunkVoxels[x].keys()) {
    if (!chunkVoxels[x][z]) {
     continue;
    }
    for (const y of chunkVoxels[x][z].keys()) {
     const voxelData = chunkVoxels[x][z][y];
     if (!voxelData) continue;
     const voxelId = voxelData[0];
     const voxelPalletData = voxelPallet[voxelId];
     if (!voxelPalletData) continue;

     let isExposed = false;

     //   const voxlel =
     const voxel = this.DVEW.voxelManager.getVoxel(voxelPalletData[0]);
     const voxelSubstance = voxel.data.substance;

     const baseTemplate = template[voxel.data.substance];

     let addTop = false;
     let addNorth = false;
     let addSouth = false;
     let addEast = false;
     let addWest = false;

     const bitArray = this.DVEW.UTIL.getBitArray([0]);

     if (!chunkVoxels[x][z][y + 1]) {
      //add top
      addTop = true;
     } else {
      const voxelData: number = chunkVoxels[x][z][y + 1][0];
      const topVoxel = this.DVEW.voxelManager.getVoxel(
       voxelPallet[voxelData][0]
      );
      if (topVoxel.data.substance !== voxelSubstance) {
       addTop = true;
      }
     }

     if (addTop) {
      bitArray.setBit(0, 1);
      isExposed = true;
      exposedFaces[0] = 1;
     } else {
      exposedFaces[0] = 0;
     }

     if (!chunkVoxels[x][z][y - 1] && y != this.worldBottomY) {
      //add bottom
      bitArray.setBit(1, 1);
      isExposed = true;
      exposedFaces[1] = 1;
     } else {
      exposedFaces[1] = 0;
     }

     //chunk border west
     if (15 == x) {
      const westChunkData = this.DVEW.worldData.getChunk(chunkX + 16, chunkZ);
      if (westChunkData) {
       const westChunk = westChunkData.voxels;
       if (westChunk[0] && westChunk[0][z] && westChunk[0][z][y] == undefined) {
        addWest = true;
       }
      } else {
       addWest = true;
      }
     } else {
      if (!chunkVoxels[x + 1]) {
       addWest = true;
      } else if (chunkVoxels[x + 1][z]) {
       if (!chunkVoxels[x + 1][z][y]) {
        addWest = true;
       }
      }
     }

     //check border east
     if (0 == x) {
      const eastChunkData = this.DVEW.worldData.getChunk(chunkX - 16, chunkZ);
      if (eastChunkData) {
       const eastChunk = eastChunkData.voxels;
       if (
        eastChunk[15] &&
        eastChunk[15][z] &&
        eastChunk[15][z][y] == undefined
       ) {
        addEast = true;
       }
      } else {
       addEast = true;
      }
     } else {
      if (!chunkVoxels[x - 1]) {
       addEast = true;
      } else if (chunkVoxels[x - 1][z]) {
       if (!chunkVoxels[x - 1][z][y]) {
        addEast = true;
       }
      }
     }

     //chunk border north
     if (z == 0) {
      const northChunkData = this.DVEW.worldData.getChunk(chunkX, chunkZ - 16);
      if (northChunkData) {
       const northChunk = northChunkData.voxels;
       if (northChunk[x][15] && northChunk[x][15][y] == undefined) {
        addNorth = true;
       }
      } else {
       addNorth = true;
      }
     } else {
      if (!chunkVoxels[x][z - 1]) {
       addNorth = true;
      } else if (!chunkVoxels[x][z - 1][y]) {
       addNorth = true;
      }
     }

     //chunk border south
     if (15 == z) {
      const southChunkData = this.DVEW.worldData.getChunk(chunkX, chunkZ + 16);
      if (southChunkData) {
       const southChunk = southChunkData.voxels;
       if (southChunk[x][0] && southChunk[x][0][y] == undefined) {
        addSouth = true;
       }
      } else {
       addSouth = true;
      }
     } else {
      if (!chunkVoxels[x][z + 1]) {
       addSouth = true;
      } else if (!chunkVoxels[x][z + 1][y]) {
       addSouth = true;
      }
     }

     if (addWest) {
      bitArray.setBit(2, 1);
      isExposed = true;
      exposedFaces[2] = 1;
     } else {
      exposedFaces[2] = 0;
     }
     if (addEast) {
      bitArray.setBit(3, 1);
      isExposed = true;
      exposedFaces[3] = 1;
     } else {
      exposedFaces[3] = 0;
     }

     if (addNorth) {
      bitArray.setBit(4, 1);
      isExposed = true;
      exposedFaces[4] = 1;
     } else {
      exposedFaces[4] = 0;
     }
     if (addSouth) {
      bitArray.setBit(5, 1);
      isExposed = true;
      exposedFaces[5] = 1;
     } else {
      exposedFaces[5] = 0;
     }

     //end of block loop
     if (!isExposed) continue;

     const faces = bitArray.getDec(0);
     voxel.getUVs(
      baseTemplate.uvTemplate,
      chunkX,
      chunkZ,
      faces,
      voxelPalletData
     );
     voxel.getAO({
      exposedFaces: exposedFaces,
      aoTemplate: baseTemplate.aoTemplate,
      chunkVoxels: chunkVoxels,
      chunkX: chunkX,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });
     baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPalletData));
     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faces);
    }
   }
  }

  return template;
 }
}
