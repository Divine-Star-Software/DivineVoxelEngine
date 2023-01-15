import type { VoxelData } from "out/Meta/index";

export const DreamLampVoxelData: VoxelData = {
 name: "Dream Lamp",
 shapeId: "Box",
 id: "dve_dreamlamp",
 substance: "transparent",
 lightSource: true,
 lightValue: 0b0011_0011_0011_0000,
 material: "stone",
 hardnress: 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
