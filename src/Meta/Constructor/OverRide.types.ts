import { DirectionNames } from "Meta/Util.types";
import { ConstructorDataTool } from "./Constructor.types";

export type FaceDataOverride = {
 face: DirectionNames;
 default: boolean;
 currentVoxel: ConstructorDataTool;
 neighborVoxel: ConstructorDataTool;
};



export type OverrideTypes = "CullFace" | "AO" | "AOFlip";
