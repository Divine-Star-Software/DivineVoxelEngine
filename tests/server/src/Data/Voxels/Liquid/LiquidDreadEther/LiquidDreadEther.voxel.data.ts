import type { VoxelData } from "out/Meta/index";

export const LiquidDreadEtherVoxelData: VoxelData = {
 name: "Liquid Dread Ether",
 shapeId: "Liquid",
 id: "dve_liquiddreadether",
 substance: "#dve_liquid",
 material: "water",
 hardnress: 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
