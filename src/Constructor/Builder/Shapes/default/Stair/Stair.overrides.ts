import type { FaceDataOverride } from "Meta/Constructor/OverRide.types";
import { OverrideManager } from "../../../Rules/Overrides/OverridesManager.js";
import { StairStates } from "../../../../../Data/Shapes/StairStates.js";
import { FaceRecord } from "../../../../../Data/Constants/Util/Faces.js";
type SideReocrd = Record<number, boolean>;

type StairFaceTypes =
 | 0 //always visible
 | 1 //box face
 | 2 //culled but with overrides
 | 3; //culled but with overrides and treated as box face

/*
 "top",
 "bottom",
 "east",
 "west",
 "south",
 "north",
*/
const stairCulls: Record<
 number,
 {
  faces: StairFaceTypes[] | number[];
  stateCulls: number[][];
 }
> = {};
stairCulls[StairStates.normal.bottom.north] = {
 faces: [0, 1, 3, 0, 3, 1, 0, 1],
 stateCulls: [
  [StairStates.normal.bottom.north],
  [StairStates.normal.bottom.north],
 ],
};

const halfBoxCull = (Data: FaceDataOverride) => {
 return true;
};
const stairCull = (data: FaceDataOverride) => {
 const shapeState = data.currentVoxel.getShapeState();
 const stairData = stairCulls[shapeState];
 if (!stairData) return false;
 const neighborShapeState = data.neighborVoxel.getShapeState();

 let finalResult = false;
 const faces = stairData.faces;
 const type = faces[FaceRecord[data.face]];
 if (type == 2 || type == 3) {
  const i = faces[FaceRecord[data.face] + 1];
  const override = stairData.stateCulls[i];
  finalResult = !override.includes(neighborShapeState);
 }

 return finalResult;
};

const boxCull = (data: FaceDataOverride) => {
 const shapeState = data.currentVoxel.getShapeState();
 const stairData = stairCulls[shapeState];
 if (!stairData) return false;
 let finalResult = false;
 const faces = stairData.faces;

 const type = faces[FaceRecord[data.face]];

 if (type == 1 || type == 3) {
  finalResult = false;
 }
 return finalResult;
};

export const StairCullFace = (data: FaceDataOverride) => {
 const id = data.neighborVoxel.getVoxelShapeObj().id;

 if (id == "#dve_box") {
  return boxCull(data);
 }
 if (id == "#dve_half_box") {
  return halfBoxCull(data);
 }
 if (id == "#dve_stair") {
  return stairCull(data);
 }
 return true;
};

export function SetUpStairOverrides() {
 OverrideManager.registerOverride("CullFace", "#dve_stair", "Any", (data) => {
  return StairCullFace(data);
 });
 OverrideManager.registerOverride("AOFlip", "#dve_stair", "Any", (data) => {
  if (data.face == "top" || data.face == "bottom") return true;
  return false;
 });
}
