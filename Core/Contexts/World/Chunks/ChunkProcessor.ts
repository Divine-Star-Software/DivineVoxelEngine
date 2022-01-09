import type { Util } from "Global/Util.helper.js";
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
  private playerWatcher: PlayerWatcher,
  private UTIL: Util
 ) {}

 makeChunkTemplate(
  chunk: number[][][],
  chunkX: number,
  chunkZ: number
 ): number[][] {
  const chunkTemplatePostions: number[] = [];
  const chunkTemplateFaces: number[] = [];
  const chunkTemplateBlocks: number[] = [];
  const amientOcculusionTemplate: number[] = [];

  for (const x of chunk.keys()) {
   if (!chunk[x]) {
    continue;
   }

   for (const z of chunk[x].keys()) {
    if (!chunk[x][z]) {
     continue;
    }
    for (const y of chunk[x][z].keys()) {
     const block = chunk[x][z][y];
     if (!block) continue;

     const bitArray = this.UTIL.getBitArray([0]);

     if (!chunk[x][z][y + 1]) {
      //add top
      bitArray.setBit(0, 1);
      BuildAmbientOcclusion(
       this.worldData,
       chunk,
       amientOcculusionTemplate,
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
       amientOcculusionTemplate,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       "bottom"
      );
     }

     if (chunkX + 16 != this.playerWatcher.currentMaxChunkX + x + 1) {
      //   console.log(chunkX,x);
      //chunk border east
      if (15 == x) {
       const westChunk = this.worldData.getChunk(chunkX + 16, chunkZ);

       if (westChunk) {
        if (westChunk[0]) {
         if (westChunk[0][z]) {
          if (westChunk[0][z][y]) {
          } else {
           //add east
           bitArray.setBit(2, 1);
           BuildAmbientOcclusion(
            this.worldData,
            chunk,
            amientOcculusionTemplate,
            chunkX,
            chunkZ,
            x,
            y,
            z,
            "east"
           );
          }
         }
        }
       } else {
        //add east
        bitArray.setBit(2, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "east"
        );
       }
      } else {
       if (!chunk[x + 1]) {
        //add east
        bitArray.setBit(2, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "east"
        );
       } else if (chunk[x + 1][z]) {
        if (!chunk[x + 1][z][y]) {
         //add east
         bitArray.setBit(2, 1);
         BuildAmbientOcclusion(
          this.worldData,
          chunk,
          amientOcculusionTemplate,
          chunkX,
          chunkZ,
          x,
          y,
          z,
          "east"
         );
        }
       }
      }
     } else {
      //     console.log("max x removed",chunkX,x);
     }

     if (chunkX - x != this.playerWatcher.currentMinChunkX) {
      if (0 == x) {
       const westChunk = this.worldData.getChunk(chunkX - 16, chunkZ);

       if (westChunk) {
        if (westChunk[15]) {
         if (westChunk[15][z]) {
          if (westChunk[15][z][y]) {
          } else {
           //add west
           bitArray.setBit(3, 1);
           BuildAmbientOcclusion(
            this.worldData,
            chunk,
            amientOcculusionTemplate,
            chunkX,
            chunkZ,
            x,
            y,
            z,
            "west"
           );
          }
         }
        }
       } else {
        //add west
        bitArray.setBit(3, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "west"
        );
       }
      } else {
       if (!chunk[x - 1]) {
        //add west
        bitArray.setBit(3, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "west"
        );
       } else if (chunk[x - 1][z]) {
        if (!chunk[x - 1][z][y]) {
         //add west
         bitArray.setBit(3, 1);
         BuildAmbientOcclusion(
          this.worldData,
          chunk,
          amientOcculusionTemplate,
          chunkX,
          chunkZ,
          x,
          y,
          z,
          "west"
         );
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
          //add north
          bitArray.setBit(4, 1);
          BuildAmbientOcclusion(
           this.worldData,
           chunk,
           amientOcculusionTemplate,
           chunkX,
           chunkZ,
           x,
           y,
           z,
           "north"
          );
         }
        }
       } else {
        //add north
        bitArray.setBit(4, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "north"
        );
       }
      } else {
       if (!chunk[x][z - 1]) {
        //add north
        bitArray.setBit(4, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "north"
        );
       } else if (!chunk[x][z - 1][y]) {
        //add north
        bitArray.setBit(4, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "north"
        );
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
          //add south
          bitArray.setBit(5, 1);
          BuildAmbientOcclusion(
           this.worldData,
           chunk,
           amientOcculusionTemplate,
           chunkX,
           chunkZ,
           x,
           y,
           z,
           "south"
          );
         }
        }
       } else {
        //add south
        bitArray.setBit(5, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "south"
        );
       }
      } else {
       if (!chunk[x][z + 1]) {
        //add south
        bitArray.setBit(5, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "south"
        );
       } else if (!chunk[x][z + 1][y]) {
        //add south
        bitArray.setBit(5, 1);
        BuildAmbientOcclusion(
         this.worldData,
         chunk,
         amientOcculusionTemplate,
         chunkX,
         chunkZ,
         x,
         y,
         z,
         "south"
        );
       }
      }
     }

     //end of block loop

     chunkTemplateBlocks.push(block);
     chunkTemplatePostions.push(x, y, z);
     chunkTemplateFaces.push(bitArray.getDec(0));
    }
   }
  }

  return [
   chunkTemplatePostions,
   chunkTemplateFaces,
   chunkTemplateBlocks,
   amientOcculusionTemplate,
  ];
 }
}
