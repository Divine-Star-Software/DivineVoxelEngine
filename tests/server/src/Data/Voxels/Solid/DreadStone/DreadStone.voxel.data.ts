import type { VoxelData } from "out/Meta/index";

export const DreadStoneVoxelData: VoxelData = {
 name: "Dread Stone",
 shapeId: "Box",
 id: "dve_dreadstone",
 substance: "#dve_solid",
 states: 1,
 material: "grassy-stone",
 hardnress: 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
