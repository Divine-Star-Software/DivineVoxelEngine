import { Flat3DArray } from "../../../../out/Global/Util/Flat3DArray";
import type { ChunkData } from "../../../../out/Meta/Chunks/Chunk.types";
import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";
export class WorldGen {
 constructor(public DVEW: DivineVoxelEngineWorld) {
  this._3dArray = this.DVEW.UTIL.getFlat3DArray();
 }

 _3dArray: Flat3DArray;
 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(
  chunkX: number,
  chunkZ: number,
  type: string = "default"
 ): ChunkData {
  let dreamstone =
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstone",
    "default"
   );
  //   this.chunkMap.addChunk(chunkX,chunkZ);
  let liquidDreamEther =
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:liquiddreamether",
    "default"
   );
  const liquidDreamEtherVoxel =
   this.DVEW.worldGeneration.paintVoxel(liquidDreamEther);
  const voxels: number[] = [];
  const dreamStoneVovxel = this.DVEW.worldGeneration.paintVoxel(dreamstone);

  let baseY = 0;
  let maxY = 31;

  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    for (let y = 0; y < this.chunkHeight; y++) {
     if (y > baseY && y <= maxY) {
      this._3dArray.setValue(x, y, z, voxels, liquidDreamEther);
     }
     if (y == baseY) {
      this._3dArray.setValue(x, y, z, voxels, dreamStoneVovxel);
     }
    }
   }
  }

  return {
   voxels: voxels,
   isEmpty: false,
   proto: false,
   maxMinHeight: [],
   heightMap: [],
  };
 }
}
