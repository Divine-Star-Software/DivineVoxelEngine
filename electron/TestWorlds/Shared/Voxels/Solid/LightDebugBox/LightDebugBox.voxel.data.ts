import { VoxelData } from "../../../../../out/Meta/index";

export const LightDebugBoxVoxelData: VoxelData = {
    name: "Light Debug Box",
    shapeId: "Box",
    id: "dve:lightdebug",
    substance: "solid",
    lightSource: false,
    physics : {
        collider : "Box",
        checkCollisions : true
     }
   };
