import type { VoxelData } from "out/Meta/index";

export const LiquidDreadEtherVoxelData: VoxelData = {
 name: "Liquid Dread Ether",
 shapeId: "FluidSourceBlock",
 id: "dve:liquiddreadether",
 substance: "fluid",
 material: "water",
 hardnress: 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
