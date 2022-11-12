import type { VoxelData } from "out/Meta/index";

export const LiquidDreadEtherVoxelData: VoxelData = {
 name: "Liquid Dread Ether",
 shapeId: "LiquidSourceBlock",
 id: "dve:liquiddreadether",
 substance: "liquid",
 material: "water",
 hardnress: 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
