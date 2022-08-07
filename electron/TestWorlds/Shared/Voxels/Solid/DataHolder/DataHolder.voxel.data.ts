import { VoxelData } from "../../../../../out/Meta/index";

export const DataHolderVoxelData: VoxelData = {
 name: "Data Holder",
 shapeId: "Box",
 id: "dve:dataholder",
 substance: "solid",
 material : "stone",
 hardnress : 1000,
 rich: {
  initalData: {
   data: "THIS A PLACE HOLDER DATA",
  },
 },
 physics: {
  collider: "Box",
  checkCollisions: true,
 },
};
