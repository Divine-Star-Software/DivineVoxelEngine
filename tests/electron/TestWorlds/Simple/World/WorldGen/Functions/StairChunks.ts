import { WorldGen } from "../WorldGen.js";
import { Directions, GenerateDiagonalLine } from "./GenerateLine.js";
export function GenerateStairChunk(
 this: typeof WorldGen,
 direction: Directions,
 chunkX: number,
 chunkZ: number
) {
 if (direction == "south") {
  for (let x = chunkX; x < chunkX + this.chunkWidth; x++) {
   let voxel = "dve_dreamstone-stair";
   if (x == chunkX) {
    voxel = "dve_dreamstonepillar";
   }
   if (x == chunkX + 15) {
    voxel = "dve_dreamstonepillar";
   }
   GenerateDiagonalLine(direction, voxel, 0, 30, x, chunkZ + 16, chunkZ - 1);
  }
 }

 if (direction == "north") {
  for (let x = chunkX; x < chunkX + this.chunkWidth; x++) {
   let voxel = "dve_dreamstone-stair";
   if (x == chunkX) {
    voxel = "dve_dreamstonepillar";
   }
   if (x == chunkX + 15) {
    voxel = "dve_dreamstonepillar";
   }
   GenerateDiagonalLine(direction, voxel, 2, 31, x, chunkZ, chunkZ + 16);
  }
 }

 if (direction == "east") {
  for (let z = chunkZ; z < chunkZ + this.chunkDepth; z++) {
   let voxel = "dve_dreamstone-stair";
   if (z == chunkZ) {
    voxel = "dve_dreamstonepillar";
   }
   if (z == chunkZ + 15) {
    voxel = "dve_dreamstonepillar";
   }
   GenerateDiagonalLine(direction, voxel, 3, 31, z, chunkX, chunkX + 16);
  }
 }

 if (direction == "west") {
  for (let z = chunkZ; z < chunkZ + this.chunkDepth; z++) {
   let voxel = "dve_dreamstone-stair";
   if (z == chunkZ) {
    voxel = "dve_dreamstonepillar";
   }
   if (z == chunkZ + 15) {
    voxel = "dve_dreamstonepillar";
   }
   GenerateDiagonalLine(direction, voxel, 1, 30, z, chunkX + 16, chunkX - 1);
  }
 }
}
