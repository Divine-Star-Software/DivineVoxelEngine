import type { Util } from "Global/Util.helper.js";
import { VoxelManager } from "../Voxels/VoxelManager.js";
import type { WorldData } from "../WorldData/WorldData.js";
import type { PlayerWatcher } from "../WorldGen/PlayerWatcher.js";
import {
 ChunkOcculsionCalcuation,
 BuildAmbientOcclusion,
} from "./Functions/ChunkAO.js";

export class ChunkProcessor {
 worldBottomY = 0;
 worldTopY = 256;
 chunkOcculsionCalcuation = ChunkOcculsionCalcuation;
 chunkTemplates: Record<number, Record<number, number[][]>> = {};

 constructor(
  private worldData: WorldData,
  private voxelManager: VoxelManager,
  private playerWatcher: PlayerWatcher,
  private UTIL: Util
 ) {}

 makeChunkTemplate(
  chunk: any[][][],
  chunkX: number,
  chunkZ: number
 ): number[][] {
  const positionTemplate: number[] = [];
  const faceTemplate: number[] = [];
  const uvTemplate: number[] = [];
  const shapeTemplate: number[] = [];
  const ligtTemplate: number[] = [];
  const aoTemplate: number[] = [];

  for (const x of chunk.keys()) {
   if (!chunk[x]) {
    continue;
   }

   for (const z of chunk[x].keys()) {
    if (!chunk[x][z]) {
     continue;
    }
    for (const y of chunk[x][z].keys()) {
     const voxelData = chunk[x][z][y];
     if (!voxelData) continue;

     const voxelId = voxelData[0];

     const voxel = this.voxelManager.getVoxel(voxelId);


     let addNorth = false;
     let addSouth = false;
     let addWest = false;
     let addEast = false;

     const bitArray = this.UTIL.getBitArray([0]);

     if (!chunk[x][z][y + 1]) {
      //add top
      bitArray.setBit(0, 1);
      BuildAmbientOcclusion(
       this.worldData,
       chunk,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "top"
      );
     }
     if (!chunk[x][z][y - 1] && y != this.worldBottomY) {
      //add bottom
      bitArray.setBit(1, 1);
      BuildAmbientOcclusion(
       this.worldData,
       chunk,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "bottom"
      );
     }

     if (chunkX + 16 != this.playerWatcher.currentMaxChunkX + x + 1) {
      //chunk border east
      if (15 == x) {
       const westChunk = this.worldData.getChunk(chunkX + 16, chunkZ);

       if (westChunk) {
        if (westChunk[0]) {
         if (westChunk[0][z]) {
          if (westChunk[0][z][y]) {
          } else {
           addEast = true;
          }
         }
        }
       } else {
        addEast = true;
       }
      } else {
       if (!chunk[x + 1]) {
        addEast = true;
       } else if (chunk[x + 1][z]) {
        if (!chunk[x + 1][z][y]) {
         addEast = true;
        }
       }
      }
     }

     if (chunkX - x != this.playerWatcher.currentMinChunkX) {
      if (0 == x) {
       const westChunk = this.worldData.getChunk(chunkX - 16, chunkZ);
       if (westChunk) {
        if (westChunk[15]) {
         if (westChunk[15][z]) {
          if (westChunk[15][z][y]) {
          } else {
           addWest = true;
          }
         }
        }
       } else {
        addWest = true;
       }
      } else {
       if (!chunk[x - 1]) {
        addWest = true;
       } else if (chunk[x - 1][z]) {
        if (!chunk[x - 1][z][y]) {
         addWest = true;
        }
       }
      }
     }

     if (chunkZ - z != this.playerWatcher.currentMinChunkZ) {
      //chunk border north
      if (0 == z) {
       const northChunk = this.worldData.getChunk(chunkX, chunkZ - 16);

       if (northChunk) {
        if (northChunk[x][15]) {
         if (northChunk[x][15][y]) {
         } else {
          addNorth = true;
         }
        }
       } else {
        addNorth = true;
       }
      } else {
       if (!chunk[x][z - 1]) {
        addNorth = true;
       } else if (!chunk[x][z - 1][y]) {
        addNorth = true;
       }
      }
     }

     if (chunkZ + 16 != this.playerWatcher.currentMaxChunkZ + z + 1) {
      //chunk border south
      if (15 == z) {
       const southChunk = this.worldData.getChunk(chunkX, chunkZ + 16);
       if (southChunk) {
        if (southChunk[x][0]) {
         if (southChunk[x][0][y]) {
         } else {
          addSouth = true;
         }
        }
       } else {
        addSouth = true;
       }
      } else {
       if (!chunk[x][z + 1]) {
        addSouth = true;
       } else if (!chunk[x][z + 1][y]) {
        addSouth = true;
       }
      }
     }

     if (addEast) {
      bitArray.setBit(2, 1);
      BuildAmbientOcclusion(
       this.worldData,
       chunk,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "east"
      );
     }
     if (addWest) {
      bitArray.setBit(3, 1);
      BuildAmbientOcclusion(
       this.worldData,
       chunk,
       aoTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "west"
      );
     }

     if (addNorth) {
      bitArray.setBit(4, 1);
      BuildAmbientOcclusion(
       this.worldData,
       chunk,
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
       this.worldData,
       chunk,
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
     voxel.getUVs(uvTemplate,faces,voxelData);
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
