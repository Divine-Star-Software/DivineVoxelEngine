import type { VoxelData } from "out/Meta/index";

export const DreadStonePillarVoxelData: VoxelData = {
 name: "Dread Stone Pillar",
 shapeId: "Box",
 id: "dve_dreadstonepillar",
 substance: "solid",
 material : "stone",
 hardnress : 60_000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
