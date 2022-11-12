import type { VoxelData } from "out/Meta/index";

export const DreamStoneSlabVoxelData: VoxelData = {
 name: "Dream Stone Slab",
 shapeId: "HalfBox",
 id: "dve:dreamstoneslab",
 substance: "transparent",
 material : "stone",
 hardnress : 1000,
 physics : {
    collider : "Box",
    checkCollisions : true
 }
};
