import type { VoxelData } from "out/Meta/index";

export const DreadStonePillarVoxelData: VoxelData = {
 name: "Dread Stone Pillar",
 shapeId: "Box",
 id: "dve:dreadstonepillar",
 substance: "solid",
 material : "stone",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
