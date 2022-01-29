import { VoxelInteface } from "Meta/World/Voxels/Voxel.types.js";
import { VoxelPalette } from "Meta/WorldData/World.types.js";
import { VoxelManager } from "World/Voxels/VoxelManager.js";
import type { WorldData } from "World/WorldData/WorldData";

export function ChunkOcculsionCalcuation(
 worldData: WorldData,
 voxel: VoxelInteface,
 chunkX: number,
 chunkY: number,
 chunkZ: number,
 voxelX: number,
 voxelY: number,
 voxelZ: number,
 x: number,
 y: number,
 z: number
) {

 const check = worldData.getVoxel(
  x + chunkX + voxelX,
  y + chunkY + voxelY,
  z + chunkZ + voxelZ
 );

 if (!check) {
  return 1;
 }
 if (check[0] < 0) return 1;
 const checkVoxel = check[0];

 if (checkVoxel.data.substance !== voxel.data.substance) {
  return 1;
 }
 return 0.75;
}

export function BuildAmbientOcclusion(
 worldData: WorldData,
 voxel: VoxelInteface,
 amientOcculusionTemplate: number[],
 chunkX: number,
 chunkY: number,
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
    voxel,
    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
     chunkZ,
     x,
     y,
     z,
     1,
     -1,
     -1
    )
  );
 }

 // -x
 if (face == "east") {
  amientOcculusionTemplate.push(
   ChunkOcculsionCalcuation(
    worldData,

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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
 // +y
 if (face == "top") {
  amientOcculusionTemplate.push(
   ChunkOcculsionCalcuation(
    worldData,

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

    voxel,

    chunkX,
    chunkY,
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

     voxel,

     chunkX,
     chunkY,
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

     voxel,

     chunkX,
     chunkY,
     chunkZ,
     x,
     y,
     z,
     -1,
     -1,
     -1
    )
  );
 }
}
