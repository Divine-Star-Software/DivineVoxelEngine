import type { VoxelData } from "out/Meta/index";

export const MarkerBoxVoxelData: VoxelData = {
 name: "Marker Box",
 shapeId: "Box",
 id: "dve_markerbox",
 substance: "#dve_solid",
 lightSource: false,
 material: "stone",
 hardnress: 1000,
 states : 15,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
