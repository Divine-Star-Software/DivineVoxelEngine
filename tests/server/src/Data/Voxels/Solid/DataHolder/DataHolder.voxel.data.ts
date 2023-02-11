import { VoxelData } from "out/Meta/index";

export const DataHolderVoxelData: VoxelData = {
 name: "Data Holder",
 shapeId: "Box",
 id: "dve_dataholder",
 substance: "#dve_solid",
 material : "stone",
 hardnress : 1000,
 isRich : true,
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
