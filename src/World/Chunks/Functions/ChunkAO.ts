import type { WorldData } from "World/WorldData/WorldData";
import { GetRealtiveChunkData } from "./GetRelativeChunkData.js";

export function ChunkOcculsionCalcuation(
 worldData: WorldData,
 chunk: number[][][],
 chunkX: number,
 chunkZ: number,
 blockX: number,
 blockY: number,
 blockZ: number,
 x: number,
 y: number,
 z: number
) {
 const check = GetRealtiveChunkData(
  worldData,
  chunk,
  chunkX,
  chunkZ,
  blockX,
  blockY,
  blockZ,
  x,
  y,
  z
 );
 if (!check) {
  return 1;
 }
 return 0.75;
}

export function BuildAmbientOcclusion(
 worldData: WorldData,
 chunk: number[][][],
 amientOcculusionTemplate: number[],
 chunkX: number,
 chunkZ: number,
 x: number,
 y: number,
 z: number,
 face: "top" | "bottom" | "north" | "east" | "west" | "south"
) {
 // +x
 if (face == "west") {
  amientOcculusionTemplate.push(

   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     -1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     1
    ),

   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     1
    ),
    ChunkOcculsionCalcuation(
      worldData,
      chunk,
      chunkX,
      chunkZ,
      x,
      y,
      z,
      1,
      0,
      -1
     ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       1,
       -1,
       0
      ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       1,
       -1,
       -1
      ),
  );
 }

 // -x
 if (face == "east") {
  amientOcculusionTemplate.push(


   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    -1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     1
    ),

   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    -1,
    0,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     -1
    ),

    ChunkOcculsionCalcuation(
      worldData,
      chunk,
      chunkX,
      chunkZ,
      x,
      y,
      z,
      -1,
      0,
      -1
     ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       -1,
       -1,
       0
      ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       -1,
       -1,
       -1
      ),
  
     ChunkOcculsionCalcuation(
      worldData,
      chunk,
      chunkX,
      chunkZ,
      x,
      y,
      z,
      -1,
      0,
      1
     ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       -1,
       -1,
       0
      ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       -1,
       -1,
       1
      ),
  );
 }
 // +y
 if (face == "top") {
  amientOcculusionTemplate.push(
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    1,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     -1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    1,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    1,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    1,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     -1
    )
  );
 }

 // -y
 if (face == "bottom") {
  amientOcculusionTemplate.push(
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    -1,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     -1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     -1,
     -1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    -1,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     -1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    -1,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    0,
    -1,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     -1,
     0
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     -1,
     1
    )
  );
 }

 // +z
 if (face == "south") {
  amientOcculusionTemplate.push(
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     1,
     1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    -1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     1,
     1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    -1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     -1,
     1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     -1,
     1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     -1,
     1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     1
    )
  );
 }

 // -z
 if (face == "north") {
  amientOcculusionTemplate.push(

   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    -1,
    0,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     1,
     -1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     -1,
     1,
     -1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     1,
     -1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     1,
     -1
    ),
   ChunkOcculsionCalcuation(
    worldData,
    chunk,
    chunkX,
    chunkZ,
    x,
    y,
    z,
    1,
    0,
    -1
   ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     0,
     -1,
     -1
    ) *
    ChunkOcculsionCalcuation(
     worldData,
     chunk,
     chunkX,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     -1
    ),
    ChunkOcculsionCalcuation(
      worldData,
      chunk,
      chunkX,
      chunkZ,
      x,
      y,
      z,
      -1,
      0,
      -1
     ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       0,
       -1,
       -1
      ) *
      ChunkOcculsionCalcuation(
       worldData,
       chunk,
       chunkX,
       chunkZ,
       x,
       y,
       z,
       -1,
       -1,
       -1
      ),
  );
 }
}
