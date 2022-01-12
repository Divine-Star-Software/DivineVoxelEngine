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

 makeChunkTemplate(
  chunkVoxels: any[][][],
  voxelPallet: VoxelPallet,
  chunkX: number,
  chunkZ: number
 ): number[][] {
  const positionTemplate: number[] = [];
  const faceTemplate: number[] = [];
  const uvTemplate: number[] = [];
  const shapeTemplate: number[] = [];
  const ligtTemplate: number[] = [];
  const aoTemplate: number[] = [];

  for (const x of chunkVoxels.keys()) {
   if (!chunkVoxels[x]) {
    continue;
   }

   for (const z of chunkVoxels[x].keys()) {
    if (!chunkVoxels[x][z]) {
     continue;
    }
    for (const y of chunkVoxels[x][z].keys()) {
     const voxelId = chunkVoxels[x][z][y];
     if (!voxelId) continue;
     const voxelData = voxelPallet[voxelId];
     if (!voxelData) continue;

     //   const voxlel =
     const voxel = this.DVEW.voxelManager.getVoxel(voxelData[0]);

     let addNorth = false;
     let addSouth = false;
     let addEast = false;
     let addWest = false;

     const bitArray = this.DVEW.UTIL.getBitArray([0]);

     if (!chunkVoxels[x][z][y + 1]) {
      //add top
      bitArray.setBit(0, 1);
      BuildAmbientOcclusion(
       this.DVEW.worldData,
       chunkVoxels,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "top"
      );
     }
     if (!chunkVoxels[x][z][y - 1] && y != this.worldBottomY) {
      //add bottom
      bitArray.setBit(1, 1);
      BuildAmbientOcclusion(
       this.DVEW.worldData,
       chunkVoxels,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "bottom"
      );
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
      BuildAmbientOcclusion(
       this.DVEW.worldData,
       chunkVoxels,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "west"
      );
     }
     if (addEast) {
      bitArray.setBit(3, 1);
      BuildAmbientOcclusion(
       this.DVEW.worldData,
       chunkVoxels,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "east"
      );
     }

     if (addNorth) {
      bitArray.setBit(4, 1);
      BuildAmbientOcclusion(
       this.DVEW.worldData,
       chunkVoxels,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "north"
      );
     }
     if (addSouth) {
      bitArray.setBit(5, 1);
      BuildAmbientOcclusion(
       this.DVEW.worldData,
       chunkVoxels,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "south"
      );
     }

     //end of block loop

     const faces = bitArray.getDec(0);
     voxel.getUVs(uvTemplate, faces, voxelData);
     shapeTemplate.push(voxel.getShapeId(voxelData));
     positionTemplate.push(x, y, z);
     faceTemplate.push(faces);
    }
   }
  }

  return [
   positionTemplate,
   faceTemplate,
   shapeTemplate,
   uvTemplate,
   ligtTemplate,
   aoTemplate,
  ];
 }
}
