import type { VoxelData } from "out/Meta/index";

export const LiquidDreamEtherVoxelData: VoxelData = {
    name: "Liquid Dream Ether",
    shapeId: "LiquidSourceBlock",
    id: "dve:liquiddreamether",
    substance: "liquid",
    material : "water",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };
