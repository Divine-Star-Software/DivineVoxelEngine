import type { VoxelData } from "out/Meta/index";

export const DreamGrassBlockVoxelData: VoxelData = {
    name: "Dream Grass Block",
    shapeId: "Box",
    id: "dve_dreamgrassblock",
    substance: "#dve_flora",
    material : "stone",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };
