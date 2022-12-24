import type { VoxelData } from "out/Meta/index";

export const DreamLogVoxelData: VoxelData ={
    name: "Dream Log",
    shapeId: "Box",
    id: "dve_dream-log",
    substance: "solid",
    material : "stone",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };