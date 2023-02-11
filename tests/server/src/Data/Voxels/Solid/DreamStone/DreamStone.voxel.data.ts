import type { VoxelData } from "out/Meta/index";

export const DreamStoneVoxelData: VoxelData = {
 name: "Dream Stone",
 shapeId: "Box",
 id: "dve_dreamstone",
 substance: "#dve_solid",
 states: 1,
 material : "grassy stone",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
