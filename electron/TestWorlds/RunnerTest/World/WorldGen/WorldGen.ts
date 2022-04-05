import { InfoByte } from "../../../../out/Global/Util/InfoByte";

import type { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";

export class WorldGen {
 lightSourceColor: number;
 seedLightSourceColor: number;
 constructor(public DVEW: DivineVoxelEngineWorld) {}

 chunkDepth = 16;
 chunkWidth = 16;
 chunkHeight = 256;

 renderDistance = 20;

 generateChunk(
  chunkX: number,
  chunkY: number,
  chunkZ: number,
  type: "track" | "wall" | "trench"
 ) {
  let dreamstonepillar = this.DVEW.worldGeneration.paintVoxel(
   this.DVEW.worldGeneration.voxelPalette.getVoxelPaletteIdFromGlobalPalette(
    "dve:dreamstonepillar",
    "default"
   )
  );

  let baseY = 10;
  let maxY = 61;

  let fill = false;
  let heightChange = false;
  let height = 0;
  for (let x = 0; x < +this.chunkWidth; x++) {
   for (let z = 0; z < this.chunkDepth; z++) {
    if (Math.random() < 0.3) {
     fill = true;
    } else {
     fill = false;
    }
    if (Math.random() < 0.5) {
     heightChange = true;
    } else {
     heightChange = false;
    }
    if (heightChange) {
     height = Math.random() * 3;
    } else {
     height = 0;
    }
    for (let y = 0; y < this.chunkHeight; y++) {
     if (type == "track") {
      if (!fill) {
       if (y <= baseY + height && x >= 6 && x <= 9) {
        this.DVEW.worldData.paintVoxel(
         "dve:dreamstonepillar",
         "default",
         x + chunkX,
         y + chunkY,
         z + chunkZ
        );
        if (y == baseY + height && Math.random() < 0.5) {
         this.DVEW.worldData.paintVoxel(
          "dve:dreamlamp",
          "default",
          x + chunkX,
          y + chunkY,
          z + chunkZ
         );
        }
       }

       if (y <= baseY - 5) {
        this.DVEW.worldData.paintVoxel(
         "dve:dreamstonepillar",
         "default",
         x + chunkX,
         y + chunkY,
         z + chunkZ
        );
       }
       if (y >= baseY - 5 && y <= baseY - 1 && (x < 6 || x > 9)) {
        this.DVEW.worldData.paintVoxel(
         "dve:liquiddreamether",
         "default",
         x + chunkX,
         y + chunkY,
         z + chunkZ
        );
       }
      } else {
       if (y <= baseY - 5) {
        this.DVEW.worldData.paintVoxel(
         "dve:dreamstonepillar",
         "default",
         x + chunkX,
         y + chunkY,
         z + chunkZ
        );
       }
       if (y >= baseY - 5 && y <= baseY - 1) {
        this.DVEW.worldData.paintVoxel(
         "dve:liquiddreamether",
         "default",
         x + chunkX,
         y + chunkY,
         z + chunkZ
        );
       }
      }
     }

     if (type == "trench") {
      if (y <= baseY - 5) {
       this.DVEW.worldData.paintVoxel(
        "dve:dreamstonepillar",
        "default",
        x + chunkX,
        y + chunkY,
        z + chunkZ
       );
      }

      if (y >= baseY - 5 && y <= baseY - 1) {
       this.DVEW.worldData.paintVoxel(
        "dve:liquiddreamether",
        "default",
        x + chunkX,
        y + chunkY,
        z + chunkZ
       );
      }
     }

     if (type == "wall") {
      if (y <= maxY) {
       this.DVEW.worldData.paintVoxel(
        "dve:dreamstone",
        "default",
        x + chunkX,
        y + chunkY,
        z + chunkZ
       );
      }
     }
    }
   }
  }
 }
}
