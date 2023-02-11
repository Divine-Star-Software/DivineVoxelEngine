import type { VoxelData } from "out/Meta/index";

export const LiquidDreamEtherVoxelData: VoxelData = {
    name: "Liquid Dream Ether",
    shapeId: "Liquid",
    id: "dve_liquiddreamether",
    substance: "#dve_liquid",
    material : "water",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };
