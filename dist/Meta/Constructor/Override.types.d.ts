import { DirectionNames } from "Meta/Util.types";
import { ConstructorDataTool } from "./Constructor.types";
export declare type FaceDataOverride = {
    face: DirectionNames;
    default: boolean;
    currentVoxel: ConstructorDataTool;
    neighborVoxel: ConstructorDataTool;
};
export declare type OverrideTypes = "CullFace" | "AO" | "AOFlip";
