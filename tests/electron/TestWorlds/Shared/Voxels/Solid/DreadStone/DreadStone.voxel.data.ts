import type { VoxelData } from "out/Meta/index";

export const DreadStoneVoxelData: VoxelData = {
 name: "Dread Stone",
 shapeId: "Box",
 id: "dve:dreadstone",
 substance: "solid",
 states: 1,
 material: "stone",
 hardnress: 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
