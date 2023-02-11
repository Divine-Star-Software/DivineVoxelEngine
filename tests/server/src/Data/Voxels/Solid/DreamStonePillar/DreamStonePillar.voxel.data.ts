import type { VoxelData } from "out/Meta/index";

export const DreamStonePillarVoxelData: VoxelData = {
 name: "Dream Stone Pillar",
 shapeId: "Box",
 id: "dve_dreamstonepillar",
 substance: "#dve_solid",
 material : "stone",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
