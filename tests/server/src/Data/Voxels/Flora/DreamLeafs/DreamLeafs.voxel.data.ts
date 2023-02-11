import type { VoxelData } from "out/Meta/index";

export const DreamLeafsVoxelData: VoxelData ={
    name: "Dream Leafs",
    shapeId: "Box",
    id: "dve_dream-leafs",
    substance: "#dve_flora",
    material : "leaves",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };