import type { VoxelData } from "out/Meta/index";

export const DreadLampVoxelData: VoxelData = {
 name: "Dread Lamp",
 shapeId: "Box",
 id: "dve_dreadlamp",
 substance: "#dve_solid",
 lightSource: true,
 lightValue: 0b0000_0000_1111_0000,
 material : "stone",
 hardnress : 1000,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
