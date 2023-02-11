import type { VoxelData } from "out/Meta/index";

export const LightDebugBoxVoxelData: VoxelData = {
    name: "Light Debug Box",
    shapeId: "Box",
    id: "dve_lightdebug",
    substance: "#dve_solid",
    lightSource: false,
    material : "stone",
    hardnress : 1000,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };
