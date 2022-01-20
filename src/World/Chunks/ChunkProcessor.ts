import { BitArray } from "Global/Util/ByteArray.js";
import {
 ChunkData,
 ChunkTemplate,
 FullChunkTemplate,
} from "Meta/Chunks/Chunk.types.js";
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
  this.bitArray = this.DVEW.UTIL.getBitArray([0]);
 }

 bitArray: BitArray;

 getBaseTemplate(): ChunkTemplate {
  return {
   positionTemplate: [],
   faceTemplate: [],
   uvTemplate: [],
   shapeTemplate: [],
   lightTemplate: [],
   aoTemplate: [],
  };
 }

 makeAllChunkTemplates(
  chunk: ChunkData,
  voxelPallet: VoxelPallet,
  chunkX: number,
  chunkY: number,
  chunkZ: number
 ): FullChunkTemplate {
  const template: FullChunkTemplate = {
   solid: this.getBaseTemplate(),
   transparent: this.getBaseTemplate(),
   flora: this.getBaseTemplate(),
   fluid: this.getBaseTemplate(),
   magma: this.getBaseTemplate(),
  };
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
     const voxelPalletData = voxelPallet[voxelId];
     if (!voxelPalletData) continue;

     this.bitArray.setDec(0, 0);

     //   const voxlel =
     const voxel = this.DVEW.voxelManager.getVoxel(voxelPalletData[0]);
     const voxelSubstance = voxel.data.substance;

     const baseTemplate = template[voxel.data.substance];

     let isExposed = false;
     let addTop = false;
     let addBottom = false;
     let addNorth = false;
     let addSouth = false;
     let addEast = false;
     let addWest = false;

     if (!voxels[x][z][y + 1]) {
      //add top
      addTop = true;
     } else {
      const voxelData: number = voxels[x][z][y + 1][0];
      const topVoxel = this.DVEW.voxelManager.getVoxel(
       voxelPallet[voxelData][0]
      );
      if (this.substanceRules[`${voxelSubstance}-${topVoxel.data.substance}`]) {
       addTop = true;
      }
     }

     if (!voxels[x][z][y - 1]) {
      //add bottom
      if (y > this.worldBottomY) {
       addBottom = true;
      }
     } else {
      const voxelData: number = voxels[x][z][y - 1][0];
      const bottomVoxel = this.DVEW.voxelManager.getVoxel(
       voxelPallet[voxelData][0]
      );
      if (
       this.substanceRules[`${voxelSubstance}-${bottomVoxel.data.substance}`]
      ) {
       addBottom = true;
      }
     }

     //chunk border west
     if (15 == x) {
      const westChunkData = this.DVEW.worldData.getChunk(chunkX + 16,chunkY, chunkZ);
      if (westChunkData && !westChunkData.isEmpty) {
       const westChunk = westChunkData.voxels;
       if (westChunk[0] && westChunk[0][z] && westChunk[0][z][y] == undefined) {
        addWest = true;
       } else {
        const voxelData: number = westChunk[0][z][y][0];
        const westVoxel = this.DVEW.voxelManager.getVoxel(
         voxelPallet[voxelData][0]
        );
        if (
         this.substanceRules[`${voxelSubstance}-${westVoxel.data.substance}`]
        ) {
         addWest = true;
        }
       }
      } else {
       addWest = true;
      }
     } else {
      if (!voxels[x + 1]) {
       addWest = true;
      } else if (voxels[x + 1][z]) {
       if (!voxels[x + 1][z][y]) {
        addWest = true;
       } else {
        const voxelData: number = voxels[x + 1][z][y][0];
        const westVoxel = this.DVEW.voxelManager.getVoxel(
         voxelPallet[voxelData][0]
        );
        if (
         this.substanceRules[`${voxelSubstance}-${westVoxel.data.substance}`]
        ) {
         addWest = true;
        }
       }
      }
     }

     //check border east
     if (0 == x) {
      const eastChunkData = this.DVEW.worldData.getChunk(chunkX - 16, chunkY,chunkZ);
      if (eastChunkData && !eastChunkData.isEmpty) {
       const eastChunk = eastChunkData.voxels;
       if (
        eastChunk[15] &&
        eastChunk[15][z] &&
        eastChunk[15][z][y] == undefined
       ) {
        addEast = true;
       } else {
        const voxelData: number = eastChunk[15][z][y][0];
        const eastVoxel = this.DVEW.voxelManager.getVoxel(
         voxelPallet[voxelData][0]
        );
        if (
         this.substanceRules[`${voxelSubstance}-${eastVoxel.data.substance}`]
        ) {
         addEast = true;
        }
       }
      } else {
       addEast = true;
      }
     } else {
      if (!voxels[x - 1]) {
       addEast = true;
      } else if (voxels[x - 1][z]) {
       if (!voxels[x - 1][z][y]) {
        addEast = true;
       } else {
        const voxelData: number = voxels[x - 1][z][y][0];
        const eastVoxel = this.DVEW.voxelManager.getVoxel(
         voxelPallet[voxelData][0]
        );
        if (
         this.substanceRules[`${voxelSubstance}-${eastVoxel.data.substance}`]
        ) {
         addEast = true;
        }
       }
      }
     }

     //chunk border north
     if (z == 0) {
      const northChunkData = this.DVEW.worldData.getChunk(chunkX,chunkY, chunkZ - 16);
      if (northChunkData && !northChunkData.isEmpty) {
       const northChunk = northChunkData.voxels;
       if (northChunk[x][15] && northChunk[x][15][y] == undefined) {
        addNorth = true;
       } else {
        const voxelData: number = northChunk[x][15][y][0];
        const northVoxel = this.DVEW.voxelManager.getVoxel(
         voxelPallet[voxelData][0]
        );
        if (
         this.substanceRules[`${voxelSubstance}-${northVoxel.data.substance}`]
        ) {
         addNorth = true;
        }
       }
      } else {
       addNorth = true;
      }
     } else {
      if (!voxels[x][z - 1]) {
       addNorth = true;
      } else if (!voxels[x][z - 1][y]) {
       addNorth = true;
      } else {
       const voxelData: number = voxels[x][z - 1][y][0];
       const northVoxel = this.DVEW.voxelManager.getVoxel(
        voxelPallet[voxelData][0]
       );
       if (
        this.substanceRules[`${voxelSubstance}-${northVoxel.data.substance}`]
       ) {
        addNorth = true;
       }
      }
     }

     //chunk border south
     if (15 == z) {
      const southChunkData = this.DVEW.worldData.getChunk(chunkX, chunkY,chunkZ + 16);
      if (southChunkData && !southChunkData.isEmpty) {
       const southChunk = southChunkData.voxels;
       if (southChunk[x][0] && southChunk[x][0][y] == undefined) {
        addSouth = true;
       } else {
        const voxelData: number = southChunk[x][0][y][0];

        const southVoxel = this.DVEW.voxelManager.getVoxel(
         voxelPallet[voxelData][0]
        );
        if (
         this.substanceRules[`${voxelSubstance}-${southVoxel.data.substance}`]
        ) {
         addSouth = true;
        }
       }
      } else {
       addSouth = true;
      }
     } else {
      if (!voxels[x][z + 1]) {
       addSouth = true;
      } else if (!voxels[x][z + 1][y]) {
       addSouth = true;
      } else {
       const voxelData: number = voxels[x][z + 1][y][0];
       const southVoxel = this.DVEW.voxelManager.getVoxel(
        voxelPallet[voxelData][0]
       );
       if (
        this.substanceRules[`${voxelSubstance}-${southVoxel.data.substance}`]
       ) {
        addSouth = true;
       }
      }
     }

     if (addTop) {
      this.bitArray.setBit(0, 1);
      isExposed = true;
      this.exposedFaces[0] = 1;
     } else {
      this.exposedFaces[0] = 0;
     }

     if (addBottom) {
      this.bitArray.setBit(1, 1);
      isExposed = true;
      this.exposedFaces[1] = 1;
     } else {
      this.exposedFaces[1] = 0;
     }

     if (addWest) {
      this.bitArray.setBit(2, 1);
      isExposed = true;
      this.exposedFaces[2] = 1;
     } else {
      this.exposedFaces[2] = 0;
     }
     if (addEast) {
      this.bitArray.setBit(3, 1);
      isExposed = true;
      this.exposedFaces[3] = 1;
     } else {
      this.exposedFaces[3] = 0;
     }

     if (addNorth) {
      this.bitArray.setBit(4, 1);
      isExposed = true;
      this.exposedFaces[4] = 1;
     } else {
      this.exposedFaces[4] = 0;
     }
     if (addSouth) {
      this.bitArray.setBit(5, 1);
      isExposed = true;
      this.exposedFaces[5] = 1;
     } else {
      this.exposedFaces[5] = 0;
     }

     //end of block loop
     if (!isExposed) continue;

     const faces = this.bitArray.getDec(0);
     voxel.getUVs(
      baseTemplate.uvTemplate,
      chunkX,
      chunkZ,
      faces,
      voxelPalletData
     );
     voxel.getAO({
      chunkVoxels: voxels,
      voxelPallete: voxelPallet,
      exposedFaces: this.exposedFaces,
      aoTemplate: baseTemplate.aoTemplate,
      chunkX: chunkX,
      chunkY: chunkY,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });

     // const lt1 = performance.now();
     voxel.getLight({
      voxelPallete: voxelPallet,
      voxelData: voxelData,
      exposedFaces: this.exposedFaces,
      lightTemplate: baseTemplate.lightTemplate,
      chunkX: chunkX,
      chunkY: chunkY,
      chunkZ: chunkZ,
      x: x,
      y: y,
      z: z,
     });

     //  const lt2 = performance.now();
     //  console.log(lt2 - lt1);

     baseTemplate.shapeTemplate.push(voxel.getShapeId(voxelPalletData));
     baseTemplate.positionTemplate.push(x, y, z);
     baseTemplate.faceTemplate.push(faces);
    }
   }
  }

  return template;
 }
}
